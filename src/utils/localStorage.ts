//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

// Get item from localstorage
export const getItemFromLocal = (key: string) => {
  try {
    if (isBrowser()) {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return undefined;
      }
    }
  } catch {
    return undefined;
  }
};

// Set item from localstorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setItemInLocal = (key: string, data: any) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

// Remove item from localstorage
export const removeItemFromLocal = (key: string) => {
  window.localStorage.removeItem(key);
};

// Delete all from local
export const deleteAllFromLocal = () => {
  window.localStorage.clear();
};
