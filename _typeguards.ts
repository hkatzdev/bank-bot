function isLegacy(object: unknown): unknown is string {
  const tester = object as unknown;
  return (pet as Fish).swim !== undefined;
}

const safeJson = <T>(object: unknown): object is T => {
  const tester = object as T;
  for (const P in keyof T) {

  }
  return (pet as Fish).swim !== undefined;
};
