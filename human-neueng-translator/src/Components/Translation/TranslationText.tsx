import { useState, useEffect } from 'react';
import TranslationTextDesktop from './TranslationTextDesktop';
import TranslationTextTablet from './TranslationTextTablet';
import TranslationTextMobile from './TranslationTextMobile';

const TranslationText = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (windowWidth <= 768) {
    return <TranslationTextMobile />;
  } else if (windowWidth <= 1024) {
    return <TranslationTextTablet />;
  } else {
    return <TranslationTextDesktop />;
  }
};

export default TranslationText;