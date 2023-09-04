namespace Portal.Api;

using System.Reflection;

using Hangfire;
using Hangfire.SqlServer;

using MediatR;

using Microsoft.AspNetCore.Authorization;

using Portal.Api.Logging;
using Portal.Api.Schemes;
using Portal.Kernel.Events;
using Portal.Kernel.Events.Registry;

using Serilog;
using Serilog.Events;

internal static class ProgramExtensions
{
    public static WebApplicationBuilder AddLogging(this WebApplicationBuilder builder)
    {
        var loggingConfig =
            new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console();

        if (builder.Configuration.GetBoolOrDefault("SEQ:Enabled", false))
        {
            var server = builder.Configuration.GetOrThrow("SEQ:ServerAddress");
            var apiKey = builder.Configuration.GetOrThrow("SEQ:ApiKey");
            var bufferFilePath = builder.Configuration.GetOrThrow("SEQ:BufferFilePath");

            if (!Enum.TryParse<LogEventLevel>(builder.Configuration["SEQ:MinLogLevel"], out var minLevel))
            {
                minLevel = LogEventLevel.Information;
            }

            loggingConfig
                .WriteTo.Seq(
                    serverUrl: server,
                    apiKey: apiKey,
                    restrictedToMinimumLevel: minLevel,
                    bufferBaseFilename: bufferFilePath,
                    batchPostingLimit: 30);
        }

        Log.Logger = loggingConfig.CreateLogger();

        builder.Logging.AddSerilog();

        builder.Services.AddSingleton<Portal.Kernel.Logging.ILogger>(new SerilogLogger(Log.Logger));

        return builder;
    }

    public static WebApplicationBuilder AddAuthentication(this WebApplicationBuilder builder)
    {
        var audience = builder.Configuration.GetOrThrow("JWT:Audience");
        var authority = builder.Configuration.GetOrThrow("JWT:Authority");
        var metadata = builder.Configuration.GetBoolOrThrow("JWT:RequiresHttpsMetadata");

        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "Bearer";
                options.DefaultChallengeScheme = "Bearer";
            })
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = authority;
                options.Audience = audience;
                options.RequireHttpsMetadata = metadata;
                options.TokenValidationParameters.ValidTypes = new[] { "at+jwt", "jwt" };
            })
            .AddScheme<GovNotifySchemeOptions, GovNotifySchemeHandler>("GovNotify", options =>
            {
                options.AddAllowedToken(builder.Configuration["GovNotify:AuthTokens:Primary"]);
                options.AddAllowedToken(builder.Configuration["GovNotify:AuthTokens:Secondary"]);
                options.AddAllowedToken(builder.Configuration["GovNotify:AuthTokens:ChristieOnly"]);
            });

        builder.Services
            .AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes("Bearer")
                    .Build();
            })
            .AddAuthorization(options =>
            {
                options.AddPolicy(
                    "GovNotify_callback",
                    new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .AddAuthenticationSchemes("GovNotify")
                        .Build());
            });

        return builder;
    }

    public static WebApplicationBuilder AddHangfire(this WebApplicationBuilder builder)
    {
        builder
            .Services
            .AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSqlServerStorage(
                builder.Configuration.GetConnectionString("PortalDb"),
                new SqlServerStorageOptions
                {
                    CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                    SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                    QueuePollInterval = TimeSpan.Zero,
                    UseRecommendedIsolationLevel = true,
                    DisableGlobalLocks = true
                })
            );

        builder
            .Services
            .AddTransient<IRecurringJobManager, RecurringJobManager>()
            .AddHangfireServer();

        return builder;
    }

    public static IServiceCollection AddEventHandlers(this IServiceCollection services)
    {
        var mediatrAssemblies = new Assembly[]
        {
            typeof(Portal.ApplicationServices.ServiceRegistration).Assembly,
            typeof(Portal.Proms.Domain.Completed.Events.PromCompleted).Assembly
        };

        var events = mediatrAssemblies.GetEventTypes();

        services
            .AddSingleton<IEventRegistry>(new EventRegistry(events))
            .AddTransient<IEventBroker, MediatrEventBroker>();

        services.AddMediatR(mediatrAssemblies);

        return services;
    }
}

