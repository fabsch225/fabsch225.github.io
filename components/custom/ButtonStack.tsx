import styles from '@components/custom/ButtonStack.module.scss';

export default function ButtonStack({ children }: { children: React.ReactNode[] }) {
    return (
      <div className={styles.buttonStack}>
        {children}
      </div>
    );
  }