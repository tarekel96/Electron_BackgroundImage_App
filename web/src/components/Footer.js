import React from "react";
import styles from './footer.module.css';

export const Footer = () => (
    <div className={styles['footer']}>
    <p>ScreenSaver</p>
    </div>
);

export const Copyright = () =>(
    <div className={styles['copyright']}>
    <p>© ScreenSaver Inc, 2021.</p>
    </div>
);