namespace Portal.Api.Logging;

using Portal.Kernel.Logging;

internal class SerilogLogger : ILogger
{
    public SerilogLogger(Serilog.ILogger logger)
    {
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    private Serilog.ILogger Logger { get; }

    ///<inheritdoc/>
    public void Log(LogLevel level, string message, params object[] args)
    {
        switch (level)
        {
            case LogLevel.Trace:
                Logger.Verbose(message, args);
                break;
            case LogLevel.Debug:
                Logger.Debug(message, args);
                break;
            case LogLevel.Info:
                Logger.Information(message, args);
                break;
            case LogLevel.Warn:
                Logger.Warning(message, args);
                break;
            case LogLevel.Fatal:
                Logger.Fatal(message, args);
                break;
            default:
                Logger.Debug(message, args);
                break;
        }
    }

    ///<inheritdoc/>
    public void Log(LogLevel level, Exception exception, string message, params object[] args)
    {
        switch (level)
        {
            case LogLevel.Trace:
                Logger.Verbose(exception, message, args);
                break;
            case LogLevel.Debug:
                Logger.Debug(exception, message, args);
                break;
            case LogLevel.Info:
                Logger.Information(exception, message, args);
                break;
            case LogLevel.Warn:
                Logger.Warning(exception, message, args);
                break;
            case LogLevel.Fatal:
                Logger.Fatal(exception, message, args);
                break;
            default:
                Logger.Debug(exception, message, args);
                break;
        }
    }

    ///<inheritdoc/>
    public IDisposable SetContextProperty(string key, string value)
    {
        return Serilog.Context.LogContext.PushProperty(key, value);
    }
}
