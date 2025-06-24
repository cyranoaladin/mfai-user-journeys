import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface MockedFunction<T extends (...args: any[]) => any> {
      (...args: Parameters<T>): ReturnType<T>;
    }
  }
}

export {};
