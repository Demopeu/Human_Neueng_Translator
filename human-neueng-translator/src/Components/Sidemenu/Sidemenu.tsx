import { useState } from 'react';
import styles from './Sidemenu.module.css';

interface SidemenuProps {
  toggleMenu: () => void;
}

function Sidemenu({ toggleMenu }: SidemenuProps) {
  const [showPrecautions, setShowPrecautions] = useState(false);
  
  const handlePrecautionsClick = () => {
    setShowPrecautions(!showPrecautions);
    
    // 유의사항이 표시되면 해당 위치로 스크롤합니다
    if (!showPrecautions) {
      setTimeout(() => {
        const el = document.getElementById('precautions');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 요소가 렌더링되도록 약간의 지연 시간을 둡니다
    }
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.sideMenuHeader}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <img src="/red_stone.webp" alt="Red-stone" />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>Akane Lize Fansite</div>
            <div className={styles.userId}>Unofficial fan-made-site</div>
          </div>
        </div>
        <button className={styles.closeButton} onClick={toggleMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.menuItems}>
        <a href="">
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <img 
                  src="/pipago.webp" 
                  alt="Chzzk icon" 
                  width="24" 
                  height="24" 
                  style={{ display: 'block' }}
                />
            </div>
            <span>Home</span>
          </div>
        </a>

        <a href="https://chzzk.naver.com/4325b1d5bbc321fad3042306646e2e50">
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <img 
                src="/icon/chzzk.webp" 
                alt="Chzzk icon" 
                width="24" 
                height="24" 
                style={{ display: 'block' }}
              />
            </div>
            <span>Chzzk</span>
          </div>
        </a>

        <a href="https://x.com/AkaneLize">
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <img 
                  src="/icon/x.webp" 
                  alt="X icon" 
                  width="24" 
                  height="24" 
                  style={{ display: 'block' }}
                />
            </div>
            <span>X(Twitter)</span>
          </div>
        </a>
        <a href="https://www.youtube.com/@akanelize">
          <div className={styles.menuItem}>
            <div className={styles.menuIcon}>
              <img 
                  src="/icon/youtube.webp" 
                  alt="YouTube icon" 
                  width="30" 
                  height="24" 
                  style={{ display: 'block' }}
                />
            </div>
            <span>YouTube</span>
          </div>
        </a>
      </div>
      
      <div className={styles.premiumSection}>
        <div className={styles.papagoPlusBox}>
          <span className={styles.papagoPlus}>pipago</span>
          <span className={styles.premiumDesc}>갓 빨개진 피엔나 입덕용 번역 서비스</span>
        </div>
      </div>
      
      <div className={styles.bottomLinks}>
        <div className={styles.menuItem}>
          <span>공지</span>
        </div>
      </div>

      <div className={styles.footerSection}>
        <div className={styles.PrecautionsSelector} onClick={handlePrecautionsClick}>
          <span>리쪽이 번역기 유의사항</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: showPrecautions ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {showPrecautions && (
          <div id="precautions" className={styles.precautionsBox}>
            <ul>
              <li>번역 결과는 정확하지 않을 수 있습니다.</li>
              <li>AIHUB 데이터를 기반으로 개발되었으며, AIHUB의 정책을 준수합니다.</li>
              <li>제공된 데이터 및 모델은 연구 및 개인 용도로만 사용 가능하며, 상업적 이용을 제한합니다.</li>
              <li>과도한 사용은 서비스 제한의 원인이 될 수 있습니다.</li>
            </ul>
          </div>
        )}
        
        <div className={styles.copyright}>
          <span>ⓟ Coding_Pienna</span>
          <div className={styles.socialLinks}>
            <a href="https://stellive.me/" className={styles.socialIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 6C17 6 15 4 12 4C9 4 7 6 7 8C7 10 9 12 12 12C15 12 17 14 17 16C17 18 15 20 12 20C9 20 7 18 7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://cafe.naver.com/tteokbokk1" className={styles.socialIcon}>
              <span>cafe</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;