import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, description, children }) => {
  return (
    <section id={id} className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </section>
  );
};

export default Section;
