"use strict";
exports.__esModule = true;
exports.createLogger = void 0;
var winston = require("winston");
// write log messages in JSON format for Cloudwatch log
// @params: loggerName - name of logger
// https://www.npmjs.com/package/winston
function createLogger(loggerName) {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {
            // message name for Cloudwatch log
            name: loggerName
        },
        transports: [
            // instantiate new Winston logger instance with Console transport
            // Transport: refer to the storage/output mechanisms used for the logs
            new winston.transports.Console()
        ]
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map