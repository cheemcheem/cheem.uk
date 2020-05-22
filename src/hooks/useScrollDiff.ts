import {useEffect, useState} from "react";

export default function useScrollDiff() {
    const [lastScroll, setLastScroll] = useState(0);
    const [scrollDiff, setScrollDiff] = useState(0);
    useEffect(() => {
        /**
         * Change nav bar size and also update the last scroll when scrolled enough.
         */
        let tick = false;
        const check = () => {
            if (tick) return;

            const currentScroll = window.scrollY;
            const newScrollDiff = currentScroll - lastScroll;

            if (Math.abs(newScrollDiff) > 15) {
                tick = true;
                window.requestAnimationFrame(() => {
                    let shouldRun = true;
                    if (currentScroll <= 0 || currentScroll + window.innerHeight >= document.body.getBoundingClientRect().height) {
                        shouldRun = false;
                    }
                    if (lastScroll <= 0 || lastScroll + window.innerHeight >= document.body.getBoundingClientRect().height) {
                        shouldRun = false;
                    }

                    if (shouldRun) {
                        setScrollDiff(newScrollDiff);
                    }

                    tick = false;
                });
                setLastScroll(currentScroll);
            }
        }

        window.addEventListener("scroll", check);
        return () => window.removeEventListener("scroll", check);
    }, [lastScroll]);

    return scrollDiff;
}