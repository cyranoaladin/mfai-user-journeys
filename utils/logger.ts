const isProd = process.env.NODE_ENV === 'production';

export const logger = {
  log: (...args: unknown[]): void => {
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  },
};

export default logger;
