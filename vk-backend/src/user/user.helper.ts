export function exclude<T, Key extends keyof T>(
  T: T,
  keys: Key[],
): Omit<T, Key> {
  for (const key of keys) {
    delete T[key];
  }
  return T;
}
