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
    return () => {
      // 모달이 닫힐 때 스크롤 허용
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // '. ' (점+스페이스)를 기준으로 문장을 분리한 후, 각 문장의 끝에 점을 추가(필요시)
  const sentences = content
    .split('. ')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0)
    .map((sentence, index, arr) => {
      // 마지막 문장이 아니라면 끝에 점(.) 추가 (이미 있다면 그대로 유지)
      if (index !== arr.length - 1 && sentence[sentence.length - 1] !== '.') {
        return sentence + '.';
      }
      return sentence;
    });

  // 제목이 '유의사항'이면 번호 목록(ol), 아니면 기본 bullet 목록(ul)으로 렌더링
  const ListTag = title === '유의사항' ? 'ol' : 'ul';

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
          <ListTag>
            {sentences.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ListTag>
        </div>
      </div>
    </div>
  );
};

export default Modal;
