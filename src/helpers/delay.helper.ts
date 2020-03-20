/**
 * Delay execution
 * @param milliseconds
 * @param next
 */
export const delay = <T = any>(milliseconds: number, next: T) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(next), milliseconds);
  });
};
