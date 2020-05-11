import React, {useCallback, useEffect, useRef, useState} from "react";
import {PageType} from "./types";

export default function NavigationController() {
    // page = top level nav, location = lower level nav
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [location, setLocation] = useState();

    // parent div = top level div in page, variable div = expandable div
    const parentDiv: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const variableDiv: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    // nav = container of navs, ticking = latch to wait on to request an animation frame, scrolling = if the page is scrolling
    const nav: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const navAnimationFrameTicking: React.MutableRefObject<boolean> = useRef(false);
    const navScrolling: React.MutableRefObject<boolean> = useRef(false);

    // offset = padding above the target to scroll to when nav is clicked
    const navOffset = 30;
    const getNavHeight = () => (window.innerWidth <= 750 ? nav.current!.getBoundingClientRect().height : 0);

    // values from last scroll
    const lastScrollTop = useRef(0);
    const lastNavHeight = useRef(0);
    const deltaForNavScroll = 5;

    // adjustments to be made when page is scrolled
    const setNavModeOnScroll = useCallback(() => {
        // pre nav change values
        const currentNavHeight = getNavHeight();
        const fromTop = window.scrollY;

        // conditions to check before making nav changes
        const sideNavCreated = nav.current;
        const variableDivCreated = variableDiv.current;
        const navHeightNotJustChanged = currentNavHeight === lastNavHeight.current;
        const windowScrolledEnough = Math.abs(lastScrollTop.current - fromTop) >= deltaForNavScroll;
        const isSmallScreenMode = window.innerWidth <= 750;

        const shouldRun = sideNavCreated
            && variableDivCreated
            && navHeightNotJustChanged
            && windowScrolledEnough
            && isSmallScreenMode
            && !navScrolling.current;

        if (shouldRun) {
            const sideNavUL = nav.current!.children.item(0)!;
            const navItems = sideNavUL.children;
            const scrolledDownwards = fromTop > lastScrollTop.current && fromTop > currentNavHeight;

            if (scrolledDownwards) {
                // hide non-essential nav items to make room on screen
                sideNavUL.classList.add("contains-non-active");
                for (let i = 0; i < navItems.length; i++) {
                    navItems.item(i)!.classList.add("non-active");
                }

                // calculate height of adjusting div to stop scroll jumping
                const diffNavHeight = currentNavHeight - getNavHeight();
                if (diffNavHeight > 0) {
                    variableDiv.current!.style.height = `${diffNavHeight}px`;
                }
            } else {
                // ensure not at the top of the page
                const canScrollUp = fromTop + window.innerHeight < document.body.clientHeight;
                if (canScrollUp) {
                    // show all nav items
                    sideNavUL.classList.remove("contains-non-active");
                    for (let i = 0; i < navItems.length; i++) {
                        navItems.item(i)!.classList.remove("non-active");
                    }

                    // calculate height of adjusting div to stop scroll jumping
                    const diffNavHeight = currentNavHeight - getNavHeight();
                    if (diffNavHeight < 0) {
                        variableDiv.current!.style.height = '0';
                    }
                }
            }
        }

        const shouldRecordLastValues = sideNavCreated && isSmallScreenMode;
        if (shouldRecordLastValues) {
            // set values for use next time
            lastNavHeight.current = currentNavHeight;
            lastScrollTop.current = fromTop;
        } else {
            // reset values to defaults (prevents issues when resizing screen)
            lastNavHeight.current = 0;
            lastScrollTop.current = 0;
            if (variableDivCreated) {
                variableDiv.current!.style.height = '0';
            }
        }

    }, []);
    const setNavActiveOnScroll = useCallback(() => {
        // conditions to check before performing calculation (without ticking condition it will render incorrectly)
        if (navAnimationFrameTicking.current) return;

        navAnimationFrameTicking.current = true;

        window.requestAnimationFrame(() => {
            if (!parentDiv.current) {
                navAnimationFrameTicking.current = false;
                return;
            }
            // find the location that is on screen (or use the current location) and set the location
            const fromTop = window.scrollY;

            let newLocation = location;
            for (let childIndex = 0; childIndex < parentDiv.current!.children.length; childIndex++) {
                const child = parentDiv.current!.children.item(childIndex)! as HTMLElement;

                if (child.id === "variableDiv") {
                    continue;
                }

                const offsetTop = child.offsetTop - (getNavHeight() + navOffset);
                const offsetHeight = child.offsetHeight;
                if (offsetTop <= fromTop && offsetTop + offsetHeight >= fromTop) {
                    newLocation = child.id;
                    break;
                }
            }
            setLocation(newLocation);
            navAnimationFrameTicking.current = false;
        });

    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setNavModeOnScroll();
            setNavActiveOnScroll();
        };
        setNavActiveOnScroll();
        localStorage.setItem(pageKey, page);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll, true);
        }
    }, [page, setNavActiveOnScroll, setNavModeOnScroll]);

    // set the active page or location via the nav
    const setPageViaNav = (targetPage: PageType) => {
        navScrolling.current = false;
        navAnimationFrameTicking.current = false;
        setPage(targetPage);
        window.scroll({top: 0});
        window.requestAnimationFrame(setNavActiveOnScroll);
    };
    const setLocationViaNav = (targetLocation: string) => {
        if (!parentDiv.current || !variableDiv.current) return;

        navScrolling.current = true;

        for (let childIndex = 0; childIndex < parentDiv.current!.children.length; childIndex++) {
            const child = parentDiv.current!.children.item(childIndex)!;
            if (child.id === targetLocation) {
                const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
                window.scrollTo({behavior: "auto", top: (childChild).offsetTop - (getNavHeight() + navOffset)});

                // nav scrolling as false prevents the nav from changing size when buttons are clicked
                // only works if scroll behaviour is not smooth otherwise it will take too long to scroll
                window.requestAnimationFrame(() => navScrolling.current = false);
                break;
            }
        }
    };
    return {page, setPage, location, parentDiv, variableDiv, nav, setPageViaNav, setLocationViaNav};
}