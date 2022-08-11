import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const windowWidth = window.innerWidth + window.scrollX;
    const windowHeight = window.innerHeight + window.scrollY;

    const windowScrollX = window.scrollX;
    const windowScrollY = window.scrollY;

    return {
        width: windowWidth,
        height: windowHeight,
        scrollX: windowScrollX,
        scrollY: windowScrollY
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        function handleScroll() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    return windowDimensions;
}

export default useWindowDimensions;
