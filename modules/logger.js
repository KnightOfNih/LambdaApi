"use strict";

class Logger {
	static _print (level, msg) {
		if (level <= Logger.LOG_LEVEL) {
			Logger.PRINT_FN(msg);
			return true;
		}

		return false;
	}

	static error (msg) {
		return Logger._print(Logger.ERROR_LEVEL, msg);
	}

	static log (msg) {
		return Logger._print(Logger.DEFAULT_LEVEL, msg);
	}

	static debug (msg) {
		return Logger._print(Logger.DEBUG_LEVEL, msg);
	}

	static trace (msg) {
		return Logger._print(Logger.TRACE_LEVEL, msg);
	}
}

Logger.PRINT_FN = console.log; // eslint-disable-line
Logger.LOG_LEVEL = process.env.LOG_LEVEL || -1;
Logger.NO_LOGGING = -1;
Logger.ERROR_LEVEL = 0;
Logger.DEFAULT_LEVEL = 1;
Logger.DEBUG_LEVEL = 2;
Logger.TRACE_LEVEL = 3;

module.exports = Logger;
