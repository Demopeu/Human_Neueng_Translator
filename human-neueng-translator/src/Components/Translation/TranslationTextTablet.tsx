import { useRef, useEffect, ChangeEvent, useCallback } from 'react';
import styles from './TranslationTextTablet.module.css';
import { SharedTranslationState } from './TranslationText';

interface TranslationTextTabletProps {
  sharedState: SharedTranslationState;
}

const TranslationTextTablet = ({ sharedState }: TranslationTextTabletProps) => {
  const { 
    inputText, 
    setInputText, 
    characterCount, 
    setCharacterCount, 
    fontSize, 
    setFontSize 
  } = sharedState;
  
  const maxCharacters = 1000;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textInputAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setCharacterCount(text.length);
    
    // 텍스트 길이에 따라 폰트 크기 조절 및 높이 조절
    adjustFontSize(text);
  };

  // Add clearText function
  const clearText = () => {
    setInputText('');
    setCharacterCount(0);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    // Reset font size to original
    setFontSize(24);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const minHeight = 100;
      textareaRef.current.style.height = `${minHeight}px`;
    }
    
    // Reset input area height
    if (textInputAreaRef.current) {
      textInputAreaRef.current.style.height = '150px';
    }
  };

  const adjustFontSize = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Basic font size settings
    let newFontSize = 20;
    if (text.length > 27) newFontSize = 18;
    if (text.length > 60) newFontSize = 16;
    setFontSize(newFontSize);
    
    // Minimum height setting
    const minHeight = 120;
    
    // Immediate height adjustment
    textarea.style.height = `${minHeight}px`;
    
    // Use setTimeout to ensure the scrollHeight calculation happens after rendering
    setTimeout(() => {
      textarea.style.height = 'auto';
      const scrollHeight = Math.max(minHeight, textarea.scrollHeight);
      textarea.style.height = `${scrollHeight}px`;
      
      // If there's a parent container that needs height adjustment
      if (textInputAreaRef.current) {
        const textInputArea = textInputAreaRef.current;
        textInputArea.style.height = `${scrollHeight + 40}px`; // Add padding
      }
    }, 10);
  }, [setFontSize]); // Include dependencies for this function

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize = `${fontSize}px`;
      
      // If there's already text, adjust the height immediately
      if (inputText.length > 0) {
        adjustFontSize(inputText);
      } else {
        textareaRef.current.style.height = '120px'; // Initial height
      }
    }
  }, [fontSize, inputText, adjustFontSize]); // Include all dependencies here

  // 버튼에 대한 클래스 계산
  const getSpeakButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  const getCopyButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  return (
    <div className={styles.translationContainer}>
      <div className={styles.translationLayout}>
        {/* 상단 입력 박스 */}
        <div className={styles.translationBox}>
          <div className={styles.languageSelector}>
            <span className={styles.language}>휴먼느엥체</span>
            <div className={styles.swapButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="12" x2="20" y2="12"></line>
                <polyline points="14 6 20 12 14 18"></polyline>
              </svg>
            </div>
            <span className={styles.language}>한국어</span>
          </div>
          
          <div className={styles.textInputArea} ref={textInputAreaRef}>
            <div className={styles.textareaWrapper}>
              <textarea
                ref={textareaRef}
                placeholder="번역할 내용을 입력하세요"
                value={inputText}
                onChange={handleInputChange}
                maxLength={maxCharacters}
                className={styles.textarea}
                style={{ fontSize: `${fontSize}px` }}
              />
              {inputText.length > 0 && (
                <button 
                  className={styles.clearButton} 
                  onClick={clearText}
                  aria-label="입력 내용 지우기"
                >
                  ×
                </button>
              )}
            </div>
            <div className={styles.characterCount}>
              {characterCount} / {maxCharacters}
            </div>
          </div>
          
          <div className={styles.toolsContainer}>
            <div className={styles.toolsBox}>
              <button className={getSpeakButtonClass()}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>발음듣기</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
                </svg>
              </button>
              <button className={getCopyButtonClass()}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>복사하기</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            
            <button className={styles.translateButton}>
              번역하기
            </button>
          </div>
        </div>

        {/* 하단 출력 박스 */}
        <div className={styles.translationBox}>
          <div className={styles.translationOutput}>
            {/* 번역 결과가 여기에 표시됩니다 */}
          </div>
          
          <div className={styles.toolsContainer}>
            <div className={styles.toolsBox}>
              <button className={styles.toolButton}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>발음듣기</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
                </svg>
              </button>
              <button className={styles.toolButton}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>복사하기</div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationTextTablet;