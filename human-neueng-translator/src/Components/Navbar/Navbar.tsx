import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import Sidemenu from '../Sidemenu/Sidemenu';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showPrecautionsModal, setShowPrecautionsModal] = useState(false);
  const [showPapagoTooltip, setShowPapagoTooltip] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const papagoButtonRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const togglePrecautionsModal = () => {
    setShowPrecautionsModal(prev => !prev);
  };

  // 화면 크기 감지 및 상태 업데이트
  useEffect(() => {
    function handleResize() {
      const mediaQuery = window.matchMedia('(max-width: 960px)');
      setIsSmallScreen(mediaQuery.matches);
    }

    // 초기 로드 시 화면 크기 확인
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    
    // cleanup 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 외부 클릭 감지를 위한 이벤트 리스너 (작은 화면에서만 적용)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSmallScreen &&
        mobileMenuOpen && 
        navbarRef.current && 
        !navbarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(`.${styles.sideMenu}`)
      ) {
        setMobileMenuOpen(false);
      }
    }

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    
    // cleanup 함수
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, isSmallScreen]);

  // 모달창 외부 클릭 감지
  useEffect(() => {
    function handleModalOutsideClick(event: MouseEvent) {
      if (
        showPrecautionsModal &&
        !(event.target as Element).closest(`.${styles.precautionsModal}`) &&
        !(event.target as Element).closest(`.${styles.precautionsButton}`)
      ) {
        setShowPrecautionsModal(false);
      }
    }

    document.addEventListener('mousedown', handleModalOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleModalOutsideClick);
    };
  }, [showPrecautionsModal]);

  useEffect(() => {
    if (isSmallScreen && mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen, isSmallScreen]);

  const showMenu = isSmallScreen && mobileMenuOpen;

  return (
    <div ref={navbarRef}>
      <nav className={styles.navbar}>
        {/* 왼쪽 영역 - 로고와 pipago 텍스트는 메인 페이지로, 사전은 다른 페이지로 */}
        <div className={styles.navLeft}>
          {/* 로고와 pipago 텍스트는 메인 페이지로 연결 */}
          <a href="/">
            <img 
              src="/pipago.webp" 
              alt="pipago logo" 
              className={styles.logo} 
            />
          </a>
          <div className={styles.disappear_box}>
            <a href="/">
              <div className={styles.title}>
                <span>p</span>
                <span className={styles.iLetter}>i</span>
                <span>pago</span>
              </div>
            </a>
            <span className={styles.divider}>|</span>
            {/* 사전은 사전 페이지로 연결 */}
            <a href="/dictionary">
              <span className={styles.subtitle}>사전</span>
            </a>
          </div>
        </div>

        {/* 오른쪽 영역 - 데스크톱 전용 */}
        {!isSmallScreen && (
          <div className={styles.desktopNavRight}>

            {/* pipago 버튼 */}
            <div 
              className={styles.papagoButton} 
              onMouseEnter={() => setShowPapagoTooltip(true)}
              onMouseLeave={() => setShowPapagoTooltip(false)}
              ref={papagoButtonRef}
            >
              <span className={styles.papagoPlus}>pipago+</span>
              {showPapagoTooltip && (
                <div className={styles.papagoTooltip}>
                  갓 빨개진 피엔나 입덕용 번역 서비스
                </div>
              )}
            </div>
            <span className={styles.divider}>|</span>
            {/* 공지 버튼 - 알람벨 아이콘 */}
            <a href="/notice" className={styles.iconOnlyButton}>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* 유의사항 버튼 - 느낌표 아이콘 */}
            <div className={styles.iconOnlyButton} onClick={togglePrecautionsModal}>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.divider}>|</span>
            
            {/* 소셜 미디어 아이콘 */}
            <a
              href="https://chzzk.naver.com/4325b1d5bbc321fad3042306646e2e50"
              className={styles.iconButton}
            >
              <img src="/icon/chzzk.webp" alt="Chzzk icon" />
            </a>
            <a 
              href="https://x.com/AkaneLize"
              className={styles.iconButton}
            >
              <img src="/icon/x.webp" alt="X icon" />
            </a>
            <a
              href="https://www.youtube.com/@akanelize"
              className={`${styles.iconButton} ${styles.youtube}`}
            >
              <img src="/icon/youtube.webp" alt="YouTube icon" />
            </a>
          </div>
        )}

        {/* 모바일용 버거 버튼 */}
        {isSmallScreen && (
          <div className={styles.burger} onClick={toggleMenu}>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
        )}
      </nav>

      {/* 유의사항 모달창 */}
      {showPrecautionsModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.precautionsModal}>
            <div className={styles.modalHeader}>
              <h3>리쪽이 번역기 유의사항</h3>
              <button className={styles.closeModalButton} onClick={togglePrecautionsModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalContent}>
              <ul>
                <li>번역 결과는 정확하지 않을 수 있습니다.</li>
                <li>AIHUB 데이터를 기반으로 개발되었으며, AIHUB의 정책을 준수합니다.</li>
                <li>제공된 데이터 및 모델은 연구 및 개인 용도로만 사용 가능하며, 상업적 이용을 제한합니다.</li>
                <li>과도한 사용은 서비스 제한의 원인이 될 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 배경 오버레이 - 작은 화면에서만 표시 */}
      {showMenu && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}

      {/* 사이드 메뉴 컨테이너 */}
      <div className={`${styles.sideMenuContainer} ${showMenu ? styles.open : ''}`}>
        <Sidemenu toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default Navbar;