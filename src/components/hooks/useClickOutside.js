import { useEffect } from 'react';

export const useClickOutside = (refs, callbacks) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      refs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callbacks[index]();
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callbacks]);
};