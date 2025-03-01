import { useState } from 'react';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import TranslationText from '../Translation/TranslationText';
import TranslationImage from '../Translation/TranslationImage';
import Banner from '../Banner/Banner';
import styles from './Section.module.css';

const Section = () => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  
  return (
    <div className={styles.sectionContainer}>
      <NavigationMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'text' ? (
        <TranslationText />
      ) : (
        <TranslationImage />
      )}
    <Banner />
    </div>
  );
};

export default Section;