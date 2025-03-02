import { useState, useEffect } from 'react';
import TranslationTextDesktop from './TranslationTextDesktop';
import TranslationTextTablet from './TranslationTextTablet';
import TranslationTextMobile from './TranslationTextMobile';

// 공유할 상태 타입 정의
export interface SharedTranslationState {
  inputText: string;
  setInputText: (text: string) => void;
  characterCount: number;
  setCharacterCount: (count: number) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const TranslationText = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  // 공유할 상태들
  const [inputText, setInputText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [fontSize, setFontSize] = useState(20);

  // 공유 상태 객체
  const sharedState: SharedTranslationState = {
    inputText, setInputText,
    characterCount, setCharacterCount,
    fontSize, setFontSize
  };

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
    return <TranslationTextMobile sharedState={sharedState} />;
  } else if (windowWidth <= 1024) {
    return <TranslationTextTablet sharedState={sharedState} />;
  } else {
    return <TranslationTextDesktop sharedState={sharedState} />;
  }
};

export default TranslationText;