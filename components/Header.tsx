import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>BlackRoad OS</h2>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#blackroad">OS</a></li>
            <li><a href="#lucidia">Lucidia</a></li>
            <li><a href="#quantum">Quantum</a></li>
            <li><a href="#prism">Prism</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
