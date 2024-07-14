import { useEffect, useState } from 'react';

export const useLocaleStorage = (key: string, initialValue: string) => {
  const [storageValue, setStorageValue] = useState(
    localStorage.getItem(key) || initialValue
  );
  useEffect(() => {
    localStorage.setItem(key, storageValue);
  }, [key, storageValue]);

  return [storageValue, setStorageValue] as const;
};

export default useLocaleStorage;
