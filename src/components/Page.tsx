import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {PageProps} from "../common/types";


function VariableDiv(props: { height: number }) {
    return <div id={"variableDiv"} style={{height: `${props.height}px`}}/>
}

export default function Page(props: PageProps & {
    subLocation: string,
    setSubLocation: (location: string) => void,
    navScrolling: boolean,
    navAnimationFrameTicking: boolean,
    sideNavContainsNonActive: boolean,
    setSideNavContainsNonActive: (sideNavContainsNonActive: boolean) => void,
    getNavHeight: () => number;
}) {

    const [variableDivHeight, setVariableDivHeight] = useState(0);

    // nav = container of navs, ticking = latch to wait on to request an animation frame, scrolling = if the page is scrolling

    // offset = padding above the target to scroll to when nav is clicked
    const navOffset = 30;
    // const getNavHeight = () => (window.innerWidth <= 750 ? nav.current!.getBoundingClientRect().height : 0);

    // values from last scroll
    const lastScrollTop = useRef(0);
    const lastNavHeight = useRef(0);
    const deltaForNavScroll = 5;

    // adjustments to be made when page is scrolled
    const setNavModeOnScroll = useCallback(() => {
        // pre nav change values
        const currentNavHeight = props.getNavHeight();
        const fromTop = window.scrollY;

        // conditions to check before making nav changes
        const navHeightNotJustChanged = currentNavHeight === lastNavHeight.current;
        const windowScrolledEnough = Math.abs(lastScrollTop.current - fromTop) >= deltaForNavScroll;
        const isSmallScreenMode = window.innerWidth <= 750;

        const shouldRun = navHeightNotJustChanged
            && windowScrolledEnough
            && isSmallScreenMode
            && !props.navScrolling;

        if (shouldRun) {
            const scrolledDownwards = fromTop > lastScrollTop.current && fromTop > currentNavHeight;

            if (scrolledDownwards) {
                // hide non-essential nav items to make room on screen
                props.setSideNavContainsNonActive(true);
                // sideNavUL.classList.add("contains-non-active");
                // for (let i = 0; i < navItems.length; i++) {
                //     navItems.item(i)!.classList.add("non-active");
                // }

                // calculate height of adjusting div to stop scroll jumping
                const diffNavHeight = currentNavHeight - props.getNavHeight();
                if (diffNavHeight > 0) {
                    setVariableDivHeight(diffNavHeight);
                }
            } else {
                // ensure not at the top of the page
                const canScrollUp = fromTop + window.innerHeight < document.body.clientHeight;
                if (canScrollUp) {
                    // show all nav items
                    props.setSideNavContainsNonActive(false);
                    // sideNavUL.classList.remove("contains-non-active");
                    // for (let i = 0; i < navItems.length; i++) {
                    //     navItems.item(i)!.classList.remove("non-active");
                    // }

                    // calculate height of adjusting div to stop scroll jumping
                    const diffNavHeight = currentNavHeight - props.getNavHeight();
                    if (diffNavHeight < 0) {
                        setVariableDivHeight(0);
                    }
                }
            }
        }

        if (isSmallScreenMode) {
            // set values for use next time
            lastNavHeight.current = currentNavHeight;
            lastScrollTop.current = fromTop;
        } else {
            // reset values to defaults (prevents issues when resizing screen)
            lastNavHeight.current = 0;
            lastScrollTop.current = 0;
            setVariableDivHeight(0);

        }

    }, []);
    const setNavActiveOnScrollNoWait = useCallback(() => {
        // find the location that is on screen (or use the current location) and set the location
        const fromTop = window.scrollY;

        let newLocation = props.subLocation;
        for (let childIndex = 0; childIndex < props.children.length; childIndex++) {
            const child = props.children.item(childIndex)! as HTMLElement;
            console.log({child, childIndex, maxIndex: props.children.length});
            if (child.id === "variableDiv") {
                continue;
            }

            const offsetTop = child.offsetTop - (props.getNavHeight() + navOffset);
            const offsetHeight = child.offsetHeight;
            if (offsetTop <= fromTop && offsetTop + offsetHeight >= fromTop) {
                newLocation = child.id;
                break;
            }
        }
        props.setSubLocation(newLocation);
        console.log({nowait: location, newLocation});
    }, [location]);
    const setNavActiveOnScroll = useCallback(() => {
        // conditions to check before performing calculation (without ticking condition it will render incorrectly)
        if (props.navAnimationFrameTicking) return;

        props.navAnimationFrameTicking = true;

        window.requestAnimationFrame(() => {
            console.log("Performing after wait.")
            setNavActiveOnScrollNoWait();
            props.navAnimationFrameTicking = false;
        });

    }, [setNavActiveOnScrollNoWait]);

    useEffect(() => {
        const handleScroll = () => {
            setNavModeOnScroll();
            setNavActiveOnScroll();
        };
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll, true);
        }
    });

    useLayoutEffect(setNavActiveOnScrollNoWait)

    if (props.targetLocation === props.location) {
        return <>
            <div className={"parent"}>
                <div className={"card-deck-horizontal"}>
                    <VariableDiv height={variableDivHeight}/>
                    {props.children}
                </div>
            </div>
        </>;
    }

    return <></>
}

