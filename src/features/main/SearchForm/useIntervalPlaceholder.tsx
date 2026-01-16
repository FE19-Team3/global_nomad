import { useEffect, useState } from 'react';

const useIntervalPlaceholder = () => {
  const PLACEHOLDERS = ['내가 원하는 체험은?', '두쫀쿠', '전시'];

  const [placeholderText, setPlaceholderText] = useState('');
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const current = PLACEHOLDERS[index];

    const interval = setInterval(() => {
      charIndex++;
      setPlaceholderText(current.slice(0, charIndex));

      if (charIndex === current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderText('');
          setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index]);

  return placeholderText + (cursorVisible ? ' |' : '');
};

export default useIntervalPlaceholder;
