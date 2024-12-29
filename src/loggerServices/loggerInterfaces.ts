export interface ILogObject {
    level: ELogLevel,
    message: string,
    metaData: ILogMetaData
}

export interface ILogMetaData {
    service: string,
    module: string,
    category: string,
    moreinfo?: string,
    stackdump?: string  
}


export enum ELogLevel {
    Error = 1,
    Info = 2,
    Debug = 3,
    Warn = 4,
    prompt,
    Help,
    Data,
    Http,
    Verbose,
    Input,
    Silly,

    // for syslog levels only
    Emerg,
    Alert,
    Crit,
    Warning,
    Notice
}