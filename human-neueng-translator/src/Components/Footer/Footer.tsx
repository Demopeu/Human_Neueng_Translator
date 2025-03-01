import { useState } from 'react';
import styles from './Footer.module.css';
import Modal from '../Modal/Modal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <div className={styles.logoWrapper}>
              <img src="/pipago.webp" alt="pipago 로고" className={styles.logo} />
              <span className={styles.logoText}>pipago</span>
            </div>
            <div className={styles.copyright}>ⓟ Coding_Pienna</div>
          </div>
          <div className={styles.mobileLogoSection}>
            <span className={styles.papagoText}>pipago</span>
          </div>
          <div className={styles.links}>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openModal('책임의 한계와 법적고지', ' 본 서비스는 기계 번역 기술을 활용하여 제공됩니다. 번역 결과의 정확성, 신뢰성, 적시성에 대해 보증하지 않으며, 번역 결과물의 사용으로 인한 어떠한 손해에 대해서도 책임을 지지 않습니다.');
              }}
            >
              책임의 한계와 법적고지
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openModal('의견제안', '피파고 서비스에 대한 의견이나 제안사항이 있으시면 dnanf12345@gmail.com으로 메일 부탁드립니다. 오징어 여러분의 소중한 의견이 서비스 개선에 큰 도움이 됩니다.');
              }}
            >
              의견제안
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openModal('유의사항', '본 서비스는 AI 자동 번역 및 객체 탐지 기능을 제공합니다. 본 서비스는 트래픽이 급격히 증가할 경우 일시적으로 접속이 어려울 수 있습니다. 제공된 데이터 및 모델은 연구 및 개인 용도로만 사용 가능하며, 상업적 이용을 제한합니다. AIHUB 데이터를 기반으로 개발되었으며, AIHUB의 정책을 준수합니다. 피파고 서비스 이용시 다음과 같은 사항을 준수해야 합니다: 불법 콘텐츠 번역 금지, 대량 자동화 번역 제한, 서비스 남용 금지 등');
              }}
            >
              유의사항
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                openModal('품질 개선 동의', '피파고 서비스의 품질 향상을 위해 사용자가 입력한 텍스트와 번역 결과가 시스템 개선에 활용될 수 있습니다. 개인정보가 포함된 내용은 입력하지 않는 것을 권장합니다.');
              }}
            >
              품질 개선 동의
            </a>
            <a href="https://www.youtube.com/@akanelize" >API 문서</a>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal title={modalContent.title} content={modalContent.content} onClose={closeModal} />
      )}
    </footer>
  );
};

export default Footer;