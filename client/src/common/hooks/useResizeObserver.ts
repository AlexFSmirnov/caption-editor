import { useRef, useEffect, RefObject } from 'react';

const useResizeObserver = (callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void, targetRef: RefObject<HTMLElement>) => {
    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new ResizeObserver(callback);
        observe();
    }, [targetRef, callback]);

    const observe = () => {
        if (!targetRef || !observerRef) {
            return;
        }

        const { current: target } = targetRef;
        const { current: observer } = observerRef;
        if (target && observer) {
            observer.observe(target);
        }
    };
};

export default useResizeObserver;
