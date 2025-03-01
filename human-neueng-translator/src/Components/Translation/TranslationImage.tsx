import { useState, DragEvent, ClipboardEvent, ChangeEvent } from 'react';
import styles from './TranslationImage.module.css';

const TranslationImage: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // 드래그 오버 시 이벤트 중단
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 드롭 시 파일 가져오기
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      readImageFile(file);
    }
  };

  // 클립보드 붙여넣기 시 파일 가져오기
  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          readImageFile(file);
        }
      }
    }
  };

  // input[type="file"]로부터 파일 선택
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        readImageFile(file);
      }
    }
  };

  // File을 base64로 읽어서 상태에 저장
  const readImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 이미지 제거
  const removeImage = () => {
    setImageSrc(null);
  };

  // 이미지 해독하기
  const decodeImage = () => {
    // 여기에 이미지 해독 로직 추가
    console.log('이미지 해독 시작');
  };

  return (
    <div className={styles.translationContainer}>
      <div className={styles.translationLayout}>
        {/* 왼쪽 이미지 업로드 박스 */}
        <div className={styles.uploadBox}>
          {!imageSrc ? (
            <div 
              className={styles.textInputArea}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onPaste={handlePaste}
            >
              <div className={styles.uploadContent}>
                <img 
                  src="/lookimage.webp" 
                  alt="캐릭터" 
                  className={styles.characterImage} 
                />
                <p className={styles.uploadText}>해독할 이미지를 드래그하여 넣어 보세요.</p>
                <label htmlFor="fileInput" className={styles.uploadButton}>
                  이미지 불러오기
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <div className={styles.textInputArea}>
              <img src={imageSrc} alt="Uploaded" className={styles.previewImage} />
              <div className={styles.buttonContainer}>
                <button className={styles.decodeButton} onClick={decodeImage}>
                  해독하기
                </button>
                <button className={styles.removeButton} onClick={removeImage}>
                  이미지 제거
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* 오른쪽 안내 박스 */}
        <div className={styles.infoBox}>
          <div className={styles.languageSelector}>
            <span className={styles.language}>이미지(Beta)</span>
          </div>
          
          <div className={styles.textInputArea}>
            <h4 className={styles.cautionTitle}>필기체 해독 유의사항</h4>
            <ol className={styles.cautionList}>
              <li>
                100% 정확한 번역을 기대하지 마세요.
                <p className={styles.cautionSubText}>- 숙련된 피엔나가 아닌 AI를 활용합니다</p>
              </li>
              <li>
                사투리, 밈은 어색할 수 있어요.
                <p className={styles.cautionSubText}>- 본가 다녀왔을 때를 주의하세요</p>
              </li>
              <li>
                개짜칠 수 있어요.
                <p className={styles.cautionSubText}>- 어쩌라구요. 그냥 주거ㅓㅓㅓ</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationImage;