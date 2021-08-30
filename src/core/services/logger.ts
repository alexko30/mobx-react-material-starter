import { ILoggerService, LoggerLevel, LoggerEntity, LoggerData, LOGGER_LEVEL_LABEL, LOGGER_LEVEL_RANK } from '@shared/types/logger';
import { generateId } from '@shared/utils/id';
 
export class LoggerService implements ILoggerService {
  private level: LoggerLevel = LoggerLevel.info;
 
  setLevel: ILoggerService['setLevel'] = (level) => {
    this.level = level;
  }
 
  private getLogEntity = (message: string, data?: LoggerData): LoggerEntity => {
    return {
      data,
      date: new Date().toISOString(),
      id: generateId(),
      message,
    };
  }
 
  private get logSourceMapping(): { [K in LoggerLevel]: (entity: LoggerEntity) => void } {
    return {
      [LoggerLevel.error]: console.error,
      [LoggerLevel.warn]: console.warn,
      [LoggerLevel.info]: console.log,
      [LoggerLevel.debug]: console.debug,
    };
  }
 
  log: ILoggerService['log'] = async (level, message, data) => {
    const shouldIgnore = LOGGER_LEVEL_RANK[level] > LOGGER_LEVEL_RANK[this.level] || !IS_PRODUCTION;
 
    if (shouldIgnore) {
      return;
    }
 
    try {
      const entity = this.getLogEntity(message, data);
      const log = this.logSourceMapping[level];
 
      await log(entity);
    } catch (err) {
      this.error(`Failed to log ${LOGGER_LEVEL_LABEL[level]}`, err);
    }
  }
 
  error: ILoggerService['error'] = (...args) => {
    return this.log(LoggerLevel.error, ...args);
  }
 
  warn: ILoggerService['warn'] = (...args) => {
    return this.log(LoggerLevel.warn, ...args);
  }
  
  info: ILoggerService['info'] = (...args) => {
    return this.log(LoggerLevel.info, ...args);
  }
 
  debug: ILoggerService['debug'] = (...args) => {
    return this.log(LoggerLevel.debug, ...args);
  }
 
  clearLogs = async () => {
    try {
      await Promise.resolve(console.clear());
    } catch (err) {
      this.error('Failed to clear logs', err);
    }
  }
}
