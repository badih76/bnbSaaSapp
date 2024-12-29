import { createLogger, format, transports,  } from 'winston';
import 'winston-daily-rotate-file';
import { ELogLevel, ILogObject } from './loggerInterfaces';

const getLogger = (fileName = 'application') => {
    // const fileLogTransport = new transports.DailyRotateFile({
    //     filename: `logs/${fileName}-%DATE%.log`,
    //     datePattern: 'YYYY-MM-DD',
    //     zippedArchive: true,
    //     maxSize: '20m',
    //     maxFiles: '30d'
    // });

    const consoleLogTransport = new transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: false,
        // json: false,
        // colorize: true,
        format: format.printf((i) => `${i.message}`)

    });

    // const options: transports.HttpTransportOptions;

    const dbLogTransport = new transports.Http({
        host: '192.168.1.200',
        port: 3000,
        path: '/api/loggerService',

    })

    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.printf(
                ({
                    level, message, label = process.env.NODE_ENV, timestamp
                }) => `${timestamp} [${label}] ${level}: ${message}`
                )
            ),
            defaultMeta: { service: 'my-app' },
            transports: [ consoleLogTransport ]
        });

        logger.add(dbLogTransport);
        // logger.add(fileLogTransport);

        // if(process.env.NODE_ENV === 'development') {
            
        //     logger.add(fileLogTransport);
        // } 

        return logger;
}

export default getLogger;

export class Logger {
    public static logger = getLogger();

    public static log(logObject: ILogObject) {
        const logLevel = parseInt(process.env.LOG_LEVEL as string);
        
        // Log Level: 1 => error, 2 => info & error, 3 => info, error & debug 
        if(logObject.level > logLevel) {
            // ignore logging for levels higher that the set logging level
            return;
        }
        
        Logger.logger.defaultMeta = logObject.metaData;

        switch(logObject.level) {
            case ELogLevel.Info:
                Logger.logger.info(logObject.message);
                break;

            case ELogLevel.Error:
                Logger.logger.error(logObject.message);
                break;

            case ELogLevel.Debug:
                Logger.logger.debug(logObject.message);
                break;

            case ELogLevel.Warn:
                Logger.logger.warn(logObject.message);
                break;

        }

    }
}