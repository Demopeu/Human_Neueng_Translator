import styles from './Banner.module.css';

const Banner = () => {
  const youtubeUrl = "https://www.youtube.com/@akanelize";
  
  return (
    <div className={styles.bannerWrapper}>
      <a href={youtubeUrl} className={styles.bannerContainer} target="_blank" rel="noopener noreferrer">
        <div className={styles.banner}>
          <div className={styles.avatarContainer}>
            <img 
              src="/profile.webp" 
              alt="Akane avatar" 
              className={styles.avatar}
            />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.mainText}>휴먼 느엥체를 배우고 싶다면</p>
            <p className={styles.subText}>아카네 리제 AKANE LIZE YouTube</p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.subscribeButton}>지금 구독하기</button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Banner;