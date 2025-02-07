'use client';

import { useState, forwardRef, useImperativeHandle, ReactNode } from 'react';
import styles from '@components/custom/Carousel.module.scss';
import ActionButton from '../ActionButton';

export interface CarouselHandle {
    goto: (key: string) => void;
}

interface CarouselProps {
    children: ReactNode[];
}

interface CarouselChildProps {
    CarouselKey: string;
    children: ReactNode;
}

const Carousel = forwardRef<CarouselHandle, CarouselProps>(({ children }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);

    const goto = (key: string) => {
        const index = children.findIndex((child) => (child as React.ReactElement<CarouselChildProps>).props.CarouselKey === key);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    useImperativeHandle(ref, () => ({
        goto
    }));

    const next = () => {
        setCurrentIndex(current =>
            current === children.length - 1 ? 0 : current + 1
        );
    };

    const prev = () => {
        setCurrentIndex(current =>
            current === 0 ? children.length - 1 : current - 1
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {children.map((child, index) => (
                    <div key={(child as React.ReactElement<CarouselChildProps>).props.CarouselKey} className={styles.slide}>
                        {child}
                    </div>
                ))}
            </div>
        
            <ActionButton hotkey="<-" onClick={prev}>Prev</ActionButton>
            <ActionButton hotkey="->" onClick={next}>Next</ActionButton>

            <div className={styles.dots}>
                {children.map((child, index) => (
                    <button
                        key={(child as React.ReactElement<CarouselChildProps>).props.CarouselKey}
                        className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
});

Carousel.displayName = 'Carousel';
export default Carousel;