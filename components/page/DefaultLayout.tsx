import styles from '@components/page/DefaultLayout.module.scss';

import * as React from 'react';
import Footer from '../custom/Footer';

interface DefaultLayoutProps {
  previewPixelSRC: string;
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ previewPixelSRC, children }) => {
  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <img className={styles.pixel} src={previewPixelSRC} alt="" />
      {children}
    </div>
    <Footer />
    </div>
  );
};

export default DefaultLayout;