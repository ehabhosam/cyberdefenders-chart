// A higher-order function to simulate API calls with a random delay and error handling
export function mockApiWrapper<T>(fn: () => T): Promise<T> {
  const delay = Math.floor(Math.random() * 100) + 200; // 200-300ms
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
