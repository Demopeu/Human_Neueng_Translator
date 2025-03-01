import { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 모달이 닫힐 때 스크롤 허용
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.precautionsModal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeModalButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalContent}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;