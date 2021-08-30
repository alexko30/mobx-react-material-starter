export enum LoggerLevel {
  debug = 'debug',
  error = 'error',
  info = 'info',
  warn = 'warn',
}
 
export type LoggerData = string | Json;
 
type LoggerTypeFunction = (message: string, data?: LoggerData) => Promise<void>;
 
export interface ILoggerService {
  clearLogs: () => Promise<void>;
  debug: LoggerTypeFunction
  error: LoggerTypeFunction
  info: LoggerTypeFunction
  log: (level: LoggerLevel, message: string, data?: LoggerData) => Promise<void>;
  setLevel: (level: LoggerLevel) => void;
  warn: LoggerTypeFunction
}
 
export interface LoggerEntity {
  message: string;
  data?: LoggerData;
  date: string;
  id: string;
}
 
export const LOGGER_LEVEL_LABEL: { [K in LoggerLevel]: string } = {
  [LoggerLevel.error]: 'ERROR',
  [LoggerLevel.warn]: 'WARNING',
  [LoggerLevel.info]: 'INFO',
  [LoggerLevel.debug]: 'DEBUG',
};
 
export const LOGGER_LEVEL_RANK = {
  [LoggerLevel.error]: 1,
  [LoggerLevel.warn]: 2,
  [LoggerLevel.info]: 3,
  [LoggerLevel.debug]: 4,
};
