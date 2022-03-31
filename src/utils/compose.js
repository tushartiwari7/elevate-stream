export const compose = (state, ...functions) => {
  return (filters) => {
    return functions.reduce((acc, fn) => {
      return fn(acc, filters);
    }, state);
  };
};
