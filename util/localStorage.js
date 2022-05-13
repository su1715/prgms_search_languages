export const getItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
