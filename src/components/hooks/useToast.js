import { useCallback } from 'react';

let showToastFunction = null;

export const setShowToastFunction = (fn) => {
  showToastFunction = fn;
};

export const useToast = () => {
  const showToast = useCallback((title, message) => {
    if (showToastFunction) {
      showToastFunction(title, message);
    }
  }, []);

  return { showToast };
};

export default useToast; 