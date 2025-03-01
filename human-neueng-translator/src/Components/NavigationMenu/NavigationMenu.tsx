import { useEffect, useState } from 'react';
import styles from './NavigationMenu.module.css';

interface NavigationMenuProps {
  activeTab: 'text' | 'image';
  setActiveTab: (tab: 'text' | 'image') => void;
}

const NavigationMenu = ({ activeTab, setActiveTab }: NavigationMenuProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount and when window resizes
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenWidth();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenWidth);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <div className={styles.navigationMenu}>
      <div className={styles.menuButtons}>
        <button 
          className={`${styles.menuButton} ${activeTab === 'text' ? styles.active : ''}`}
          onClick={() => setActiveTab('text')}
        >
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 10h8M4 14h12M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          {!isMobile && <span className={styles.label}>텍스트</span>}
        </button>
        <button 
          className={`${styles.menuButton} ${activeTab === 'image' ? styles.active : ''}`}
          onClick={() => setActiveTab('image')}
        >
          <span className={styles.icon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15L16 10L9 17H21V15Z" fill="currentColor"/>
              <path d="M7 17L12 12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          {!isMobile && <span className={styles.label}>이미지(Beta)</span>}
        </button>
      </div>
    </div>
  );
};

export default NavigationMenu;