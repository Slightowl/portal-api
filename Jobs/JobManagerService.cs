namespace Portal.Api.Jobs
{
    using Hangfire;

    using Portal.ApplicationServices.LoginRequests.Jobs;
    using Portal.ApplicationServices.Outbox.Jobs;

    public class JobManagerService : BackgroundService
    {
        public JobManagerService(IConfiguration config, IRecurringJobManager recurringJob)
        {
            Config = config
                ?? throw new ArgumentNullException(nameof(config));

            RecurringJob = recurringJob
                ?? throw new ArgumentNullException(nameof(recurringJob));
        }

        private IConfiguration Config { get; }

        private IRecurringJobManager RecurringJob { get; }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            RecurringJob.AddOrUpdate<ILoginCacheCleanupJob>(
                "login-cache-cleanup",
                job => job.RunAsync(),
                Config.GetOrDefault("Portal:Jobs:LoginCacheCleanupCron", "*/30 * * * *"));

            RecurringJob.AddOrUpdate<IPortalOutboxCleanupJob>(
                "outbox-cleanup",
                job => job.RunAsync(),
                Config.GetOrDefault("Portal:Jobs:OutboxCleanupCron", "*/30 * * * *"));

            RecurringJob.AddOrUpdate<IPortalOutboxProcesorJob>(
                "outbox-processor",
                job => job.RunAsync(),
                Config.GetOrDefault("Portal:Jobs:OutboxProcessorCron", "* * * * *"));

            return Task.CompletedTask;
        }
    }
}
