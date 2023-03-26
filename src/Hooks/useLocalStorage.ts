import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return JSON.parse(item);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
