import { useState } from "react";

interface ISessionStorage {
  storedValue: string;
}

export function useSessionStorage(keyName: string, defaultValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error(err);

      return defaultValue;
    }
  });

  function setValue(newValue: any) {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  }

  return [storedValue, setValue];
}
