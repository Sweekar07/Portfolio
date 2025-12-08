import { useState, useEffect } from 'react';

export const useCarousel = (items, autoPlayDelay = 5000, isActive = true) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % items.length);
        }, autoPlayDelay);

        return () => clearInterval(interval);
    }, [isActive, items.length, autoPlayDelay]);

    return [currentIndex, setCurrentIndex];
};
