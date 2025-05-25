'use client';

import styles from '@components/Accordion.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Row from '@components/Row';

interface AccordionProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
  tabbed?: boolean;
}

export const AccordionContext = React.createContext<{ registerAccordion: (isOpen: boolean) => void } | null>(null);

const Accordion: React.FC<AccordionProps> = ({ defaultValue = false, title, children, tabbed = false }) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);
  const accordionRef = React.useRef<HTMLDivElement | null>(null);
  const context = React.useContext(AccordionContext);

  React.useEffect(() => {
    if (context) {
      context.registerAccordion(show);
    }
    
  }, [show, context]);

  const toggleShow = (): void => {
    context?.registerAccordion(!show);
    setShow((prevShow) => !prevShow);
  };

  return (
    <>
      <Row ref={accordionRef} tabIndex={0} role="button" onClick={toggleShow} aria-expanded={show}>
        <div style={{ paddingLeft: tabbed ? '4ch' : '0ch'}} className={Utilities.classNames(styles.flex, show ? styles.active : undefined)}>
          <span className={styles.icon}>{show ? '▾' : '▸'}</span>
          <span className={styles.title}>{title}</span>
        </div>
      </Row>
      {show && <Row  style={{ paddingLeft: '1ch' }}>{children}</Row>}
    </>
  );
};


export default Accordion;
