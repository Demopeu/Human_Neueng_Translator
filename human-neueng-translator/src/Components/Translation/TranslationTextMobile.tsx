import { useState, ChangeEvent, useRef, useEffect } from 'react';
import styles from './TranslationTextMobile.module.css';

const TranslationTextMobile = () => {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const maxCharacters = 1000;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textInputAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;
    if (text.length > maxCharacters) {
      text = text.slice(0, maxCharacters);
    }
    setInputText(text);
    adjustFontSize(text);
  };

  // 완전히 수정된 adjustFontSize 함수
  const adjustFontSize = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // 기본 폰트 크기 설정
    let newFontSize = 20;
    if (text.length > 27) newFontSize = 18;
    if (text.length > 60) newFontSize = 16;
    setFontSize(newFontSize);
    
    // 최소 높이 설정
    const minHeight = 120;
    
    // 즉시 높이 조정
    textarea.style.height = `${minHeight}px`;
    
    // 실제 스크롤 높이 기반으로 높이 조정
    setTimeout(() => {
      textarea.style.height = 'auto';
      const scrollHeight = Math.max(minHeight, textarea.scrollHeight);
      textarea.style.height = `${scrollHeight}px`;
    }, 0);
  };

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize = `${fontSize}px`;
      textareaRef.current.style.height = '120px'; // 초기 높이 설정
    }
  }, [fontSize]);

  // 버튼에 대한 툴팁 및 클래스 계산
  const getSpeakButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  const getCopyButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  // 번역 버튼 클래스 계산 - 텍스트가 있으면 텍스트 숨김
  const getTranslateButtonClass = () => {
    return `${styles.translateButton} ${inputText.length > 0 && isFocused ? styles.hideText : ''}`;
  };

  return (
    <div className={styles.translationContainer}>
      {/* 언어 선택 */}
      <div className={styles.languageSelectionBar}>
        <div className={styles.languageSelector}>휴먼느엥체</div>
        <div className={styles.swapButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="12" x2="20" y2="12"></line>
            <polyline points="14 6 20 12 14 18"></polyline>
          </svg>
        </div>
        <div className={styles.languageSelector}>한국어</div>
      </div>

      {/* 입력 영역 */}
      <div className={styles.textInputContainer} ref={textInputAreaRef}>
        <textarea
          ref={textareaRef}
          placeholder="번역할 내용을 입력하세요"
          value={inputText}
          onChange={handleInputChange}
          maxLength={maxCharacters}
          className={styles.textarea}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ fontSize: `${fontSize}px` }}
        />
        <div className={styles.inputToolbar}>
          <div className={styles.toolButtons}>
            <button className={getSpeakButtonClass()}>
              <div className={styles.tooltipContainer}>
                <div className={styles.tooltip}>발음듣기</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
              </svg>
            </button>
            <button className={getCopyButtonClass()}>
              <div className={styles.tooltipContainer}>
                <div className={styles.tooltip}>복사하기</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <button className={getTranslateButtonClass()}>
            <span className={styles.translateButtonText}>번역</span> <span className={styles.arrowIcon}>→</span>
          </button>
        </div>
      </div>

      {/* 번역 결과 영역 */}
      <div className={styles.resultContainer}>
        <div className={styles.resultText}>
          {/* 번역 결과가 여기에 표시됩니다 */}
        </div>
        <div className={styles.resultToolbar}>
          <div className={styles.toolButtons}>
            <button className={getSpeakButtonClass()}>
              <div className={styles.tooltipContainer}>
                <div className={styles.tooltip}>발음듣기</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
              </svg>
            </button>
            <button className={getCopyButtonClass()}>
              <div className={styles.tooltipContainer}>
                <div className={styles.tooltip}>복사하기</div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationTextMobile;