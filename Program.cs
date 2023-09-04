using Hangfire;

using Portal.Api;
using Portal.Api.Jobs;
using Portal.Api.Middleware;
using Portal.ApplicationServices;
using Portal.Proms.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder
    .AddLogging()
    .AddAuthentication()
    .AddHangfire();

builder
    .Services
        .AddControllers()
        .AddNewtonsoftJson();

builder
    .Services
        .AddHostedService<JobManagerService>();

builder
    .Services
        .AddPromsContextServices()
        .AddApplicationServices()
        .AddEventHandlers();

var app = builder.Build();

// ------------------------------------------------------------------------ //
// Configure the HTTP request pipeline.
// ------------------------------------------------------------------------ //

if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days.
    // You may want to change this for production scenarios,
    // see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app
    .UseHttpsRedirection()
    .UseStaticFiles()
    .UseRouting()
    .UseMiddleware<CorrelationParameters>()
    .UseAuthentication()
    .UseAuthorization()
    .UseMiddleware<EnableRequestBodyBuffering>()
    .UseMiddleware<AuthenticatedUserRequestAudit>(() =>
        builder.Configuration.GetBoolOrDefault("Portal:Audit:UserEnabled", false))
    .UseMiddleware<EhrReverseProxy>()
    .UseHangfireDashboard();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
