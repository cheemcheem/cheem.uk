import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import Navigation from "./subcomponents/navigation";
import Page from "./subcomponents/page";
import {LinkType, PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./subcomponents/navigationDropDown";

const Projects = React.lazy(() => import("./pages/projects"));
const Links = React.lazy(() => import("./pages/links"));

export default function App() {
    // page = top level nav, location = lower level nav
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [location, setLocation] = useState();

    // parent div = top level div in page, variable div = expandable div
    const pageParentDiv: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const pageVariableDiv: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

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
        const variableDivCreated = pageVariableDiv.current;
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
                    pageVariableDiv.current!.style.height = `${diffNavHeight}px`;
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
                        pageVariableDiv.current!.style.height = '0';
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
                pageVariableDiv.current!.style.height = '0';
            }
        }

    }, []);
    const setNavActiveOnScroll = useCallback(() => {
        // conditions to check before performing calculation (without ticking condition it will render incorrectly)
        if (navAnimationFrameTicking.current) return;

        navAnimationFrameTicking.current = true;

        window.requestAnimationFrame(() => {
            if (!pageParentDiv.current) {
                navAnimationFrameTicking.current = false;
                return;
            }
            // find the location that is on screen (or use the current location) and set the location
            const fromTop = window.scrollY;

            let newLocation = location;
            for (let childIndex = 0; childIndex < pageParentDiv.current!.children.length; childIndex++) {
                const child = pageParentDiv.current!.children.item(childIndex)! as HTMLElement;
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
        window.scroll({top: 0});
        setPage(targetPage);
        setNavActiveOnScroll();
    };
    const setLocationViaNav = (targetLocation: string) => {
        if (!pageParentDiv.current || !pageVariableDiv.current) return;

        navScrolling.current = true;

        for (let childIndex = 0; childIndex < pageParentDiv.current!.children.length; childIndex++) {
            const child = pageParentDiv.current!.children.item(childIndex)!;
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

    //@formatter:off
    return <>
        <div className={"card-deck space-between container"}>
            <nav ref={nav} className={"side-nav"}>
                <ul>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Home"}/>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Projects"}/>
                    <NavigationDropDown visible={page === "Projects"}>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Rubik's Cube Solver"}/>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Energy Usage Tracker"}/>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"VCS Visualiser"}/>
                    </NavigationDropDown>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Links"}/>
                    <NavigationDropDown visible={page === "Links"}>
                        <Navigation<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"web development links"}/>
                        <Navigation<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"general development links"}/>
                    </NavigationDropDown>
                </ul>
            </nav>
            <main>
                <Page location={page} setLocation={setPage} targetLocation={"Projects"}>
                    <Suspense fallback={<></>}>
                        <Projects projectsRef={pageParentDiv} variableDivRef={pageVariableDiv}/>
                    </Suspense>
                </Page>
                <Page location={page} setLocation={setPage} targetLocation={"Links"}>
                    <Suspense fallback={<></>}>
                        <Links linksRef={pageParentDiv} variableDivRef={pageVariableDiv}/>
                    </Suspense>
                </Page>
            </main>
        </div>
    </>;
    //@formatter:on

}


