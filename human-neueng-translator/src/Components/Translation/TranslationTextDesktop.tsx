import { useRef, useEffect, ChangeEvent, useCallback, useLayoutEffect } from 'react';
import styles from './TranslationTextDesktop.module.css';
import { SharedTranslationState } from './TranslationText';

interface TranslationTextDesktopProps {
  sharedState: SharedTranslationState;
}

const TranslationTextDesktop = ({ sharedState }: TranslationTextDesktopProps) => {
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
  const leftBoxRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setCharacterCount(text.length);
    
    // 텍스트 길이에 따라 폰트 크기 조절 및 높이 조절
    adjustFontSize(text);
  };

  const clearText = () => {
    setInputText('');
    setCharacterCount(0);
    
    // 폰트 크기 원래대로 복원
    setFontSize(30);
    
    // 높이 초기화 - 명확하게 설정
    if (textareaRef.current) {
      textareaRef.current.style.height = '160px';
    }
    
    // 부모 컨테이너 높이 초기화
    if (textInputAreaRef.current) {
      textInputAreaRef.current.style.height = '200px';
    }
    
    // 왼쪽 박스 전체 높이 초기화
    if (leftBoxRef.current) {
      // 언어 선택기 높이(56px) + 기본 텍스트영역 높이(200px) + 툴 컨테이너 높이(64px)
      leftBoxRef.current.style.height = '320px'; // 56 + 200 + 64
    }
    
    // 포커스 설정
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // adjustFontSize 함수 개선 - setTimeout 제거
  const adjustFontSize = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // 기본 폰트 크기 설정
    let newFontSize = 30;
    if (text.length > 27) newFontSize = 24;
    if (text.length > 60) newFontSize = 20;
    setFontSize(newFontSize);
    
    // 최소 높이 설정
    const minHeight = 160;
    
    // 정확한 높이 계산을 위한 초기화
    textarea.style.height = 'auto';
    
    // scrollHeight를 통해 콘텐츠에 맞는 높이 계산
    const scrollHeight = Math.max(minHeight, textarea.scrollHeight);
    textarea.style.height = `${scrollHeight}px`;
    
    // 부모 컨테이너 높이 조정
    if (textInputAreaRef.current) {
      textInputAreaRef.current.style.height = `${scrollHeight + 40}px`; // 여백 추가
    }
    
    // 왼쪽 박스 전체 높이 조정 (필요한 경우)
    if (leftBoxRef.current) {
      // 언어 선택기 높이(56px) + 텍스트영역 높이 + 툴 컨테이너 높이(64px)
      const totalHeight = 56 + (scrollHeight + 40) + 64;
      leftBoxRef.current.style.height = `${totalHeight}px`;
    }
  }, [setFontSize]);

  // 리사이즈 처리 함수 추가
  const handleResize = useCallback(() => {
    if (inputText.length > 0) {
      adjustFontSize(inputText);
    } else {
      // 텍스트가 없을 때 높이 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = '160px';
      }
      if (textInputAreaRef.current) {
        textInputAreaRef.current.style.height = '200px';
      }
      if (leftBoxRef.current) {
        leftBoxRef.current.style.height = '320px'; // 56 + 200 + 64
      }
    }
  }, [inputText, adjustFontSize]);

  // 컴포넌트 마운트 및 텍스트/폰트 변경 시 실행하는 useLayoutEffect
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontSize = `${fontSize}px`;
      
      if (inputText.length > 0) {
        // 레이아웃 변경 전에 높이 조정
        adjustFontSize(inputText);
      } else {
        // 텍스트가 없을 때 초기 높이
        textareaRef.current.style.height = '160px';
        if (textInputAreaRef.current) {
          textInputAreaRef.current.style.height = '200px';
        }
        if (leftBoxRef.current) {
          leftBoxRef.current.style.height = '320px'; // 56 + 200 + 64
        }
      }
    }
  }, [fontSize, inputText, adjustFontSize]);

  // ResizeObserver 및 window resize 이벤트 설정
  useEffect(() => {
    // 브라우저 창 크기 변경 감지
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트가 마운트된 요소의 크기 변경 감지를 위한 ResizeObserver
    if (textInputAreaRef.current && leftBoxRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      
      resizeObserver.observe(textInputAreaRef.current);
      resizeObserver.observe(leftBoxRef.current);
      
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

  // 기존 버튼 클래스 계산 함수 유지
  const getSpeakButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  const getCopyButtonClass = () => {
    return `${styles.toolButton} ${inputText.length > 0 ? styles.hasText : ''}`;
  };

  // 나머지 코드는 기존과 동일하게 유지
  return (
    <div className={styles.translationContainer}>
      <div className={styles.translationLayout}>
        {/* 왼쪽 입력 박스 */}
        <div className={styles.translationBox} ref={leftBoxRef}>
          <div className={styles.languageSelector}>
            <span className={styles.language}>휴먼느엥체</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="12" x2="20" y2="12"></line>
              <polyline points="14 6 20 12 14 18"></polyline>
            </svg>
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
                </svg>
              </button>
              <button className={getCopyButtonClass()}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>복사하기</div>
                </div>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
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

        {/* 오른쪽 출력 박스 */}
        <div className={styles.translationBox}>
          <div className={styles.languageSelector}>
            <span className={styles.language}>한국어</span>
          </div>
          
          <div className={styles.translationOutput}>
            {/* 번역 결과가 여기에 표시됩니다 */}
          </div>
          
          <div className={styles.toolsContainer}>
            <div className={styles.toolsBox}>
              <button className={styles.toolButton}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>발음듣기</div>
                </div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a9 9 0 0 1 0 14.14"></path>
                </svg>
              </button>
              <button className={styles.toolButton}>
                <div className={styles.tooltipContainer}>
                  <div className={styles.tooltip}>복사하기</div>
                </div>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
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

export default TranslationTextDesktop;