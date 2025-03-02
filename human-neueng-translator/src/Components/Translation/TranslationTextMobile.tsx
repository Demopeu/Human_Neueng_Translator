import { useState, useRef, useEffect, ChangeEvent,useCallback, useLayoutEffect  } from 'react';
import styles from './TranslationTextMobile.module.css';
import { SharedTranslationState } from './TranslationText';

interface TranslationTextMobileProps {
  sharedState: SharedTranslationState;
}

const TranslationTextMobile = ({ sharedState }: TranslationTextMobileProps) => {
  const { 
    inputText, 
    setInputText, 
    setCharacterCount, 
    fontSize, 
    setFontSize 
  } = sharedState;
  
  const [isFocused, setIsFocused] = useState(false);
  const maxCharacters = 1000;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textInputAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;
    if (text.length > maxCharacters) {
      text = text.slice(0, maxCharacters);
    }
    setInputText(text);
    setCharacterCount(text.length);
    adjustFontSize(text);
  };

  const clearText = () => {
    setInputText('');
    setCharacterCount(0);
    
    // 폰트 크기 초기화
    setFontSize(20);
    
    // 높이 초기화 - 더 명확하게
    if (textareaRef.current) {
      textareaRef.current.style.height = '120px';
    }
    
    // 부모 컨테이너 높이도 초기화
    if (textInputAreaRef.current) {
      textInputAreaRef.current.style.height = '160px'; // 120px + 40px (도구바)
    }
    
    // 포커스 설정
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // 완전히 수정된 adjustFontSize 함수
  // In your component:
  // adjustFontSize 함수 수정
  // adjustFontSize 함수 개선 - throttle/debounce 적용
  const adjustFontSize = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // 기본 폰트 크기 설정
    let newFontSize = 20;
    if (text.length > 27) newFontSize = 18;
    if (text.length > 60) newFontSize = 16;
    setFontSize(newFontSize);
    
    // 최소 높이 설정
    const minHeight = 120;
    
    // 정확한 높이 계산을 위한 초기화
    textarea.style.height = 'auto';
    
    // scrollHeight를 통해 콘텐츠에 맞는 높이 계산
    const scrollHeight = Math.max(minHeight, textarea.scrollHeight);
    textarea.style.height = `${scrollHeight}px`;
    
    // 부모 컨테이너 높이 조정
    if (textInputAreaRef.current) {
      const toolbarHeight = 40; // 도구바 높이
      textInputAreaRef.current.style.height = `${scrollHeight + toolbarHeight}px`; 
    }
  }, [setFontSize]);
  
  // 최초 렌더링과 inputText/fontSize 변경 시 실행되는 useLayoutEffect 추가
  // useLayoutEffect는 DOM 변경 직후, 브라우저가 화면을 그리기 전에 실행됨
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize = `${fontSize}px`;
      
      if (inputText.length > 0) {
        // 레이아웃 변경 전에 높이 조정
        adjustFontSize(inputText);
      } else {
        // 텍스트가 없을 때 초기 높이
        textareaRef.current.style.height = '120px';
        if (textInputAreaRef.current) {
          textInputAreaRef.current.style.height = '160px'; // 120px + 40px
        }
      }
    }
  }, [fontSize, inputText, adjustFontSize]);

  const handleResize = useCallback(() => {
    if (inputText.length > 0 && textareaRef.current) {
      // 가로 크기가 변경되었을 때 높이 재계산
      adjustFontSize(inputText);
    }
  }, [inputText, adjustFontSize]);

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    // 브라우저 창 크기 변경 감지
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트가 마운트된 요소의 크기 변경 감지를 위한 ResizeObserver
    if (textInputAreaRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(textInputAreaRef.current);
      
      // 클린업 함수
      return () => {
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
      };
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

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
        <div className={styles.textareaWrapper}>
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