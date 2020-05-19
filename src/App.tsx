import React, {useEffect, useState} from 'react';
import './App.css';
import Page from "./components/Page";
import {HomeType, LinkType, ProjectType} from "./common/types";
import Nav from "./components/Nav";
import {
    DarkModeContext,
    defaultIsDarkMode,
    defaultIsMobile,
    defaultIsNavBarLarge,
    defaultLocation,
    defaultPage,
    LocationContext,
    NavContext,
    PageContext
} from "./common/contexts";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Links = React.lazy(() => import("./pages/Links"));


export default function App() {

    const [isDarkMode, setIsDarkMode] = useState(defaultIsDarkMode);
    useEffect(() => {
        /**
         * Update isDarkMode when detects CSS prefers color scheme media queries changed.
         */
        const switchColourScheme = () => setIsDarkMode(!isDarkMode);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

        setIsDarkMode(!mediaQuery.matches);

        // use deprecated api if current api is not supported
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", switchColourScheme);
        } else {
            mediaQuery.addListener(switchColourScheme);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", switchColourScheme);
            } else {
                mediaQuery.removeListener(switchColourScheme);
            }
        }
    }, [isDarkMode])

    const [isMobile, setIsMobile] = useState(defaultIsMobile);
    useEffect(() => {
        /*
         * Update isMobile when detects CSS mobile only media queries are active.
         */
        const switchIsMobile = () => setIsMobile(!isMobile);
        const mediaQuery = window.matchMedia("(max-width: 750px)");

        setIsMobile(mediaQuery.matches);

        // use deprecated api if current api is not supported
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", switchIsMobile);
        } else {
            mediaQuery.addListener(switchIsMobile);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", switchIsMobile);
            } else {
                mediaQuery.removeListener(switchIsMobile);
            }
        }
    }, [isMobile])

    const [isNavBarLarge, setIsNavBarLarge] = useState(defaultIsNavBarLarge);
    const [lastScroll, setLastScroll] = useState(0);
    useEffect(() => {
        /**
         * Change nav bar size and also update the last scroll when scrolled enough.
         */
        let tick = false;
        const check = () => {
            if (tick) {
                return;
            }
            const onscroll = (currentScroll: number, lastScroll: number) => () => {
                let shouldRun = true;
                if (currentScroll < 0 || currentScroll > window.innerHeight) {
                    shouldRun = false;
                }
                if (lastScroll < 0 || lastScroll > window.innerHeight) {
                    shouldRun = false;
                }
                if (shouldRun) {
                    setIsNavBarLarge(currentScroll - lastScroll < 0);
                }
                tick = false;
            }
            const currentScroll = window.scrollY;
            const scrollDiff = Math.abs(currentScroll - lastScroll);
            if (scrollDiff > 5) {
                tick = true;
                window.requestAnimationFrame(onscroll(currentScroll, lastScroll));
                setLastScroll(currentScroll);
            }
        }

        window.addEventListener("scroll", check);
        return () => window.removeEventListener("scroll", check);
    }, [lastScroll]);

    const [page, setPage] = useState(defaultPage);
    const [location, setLocation] = useState(defaultLocation);
    useEffect(() => {
        /**
         * Sets the location when the body is scrolled or the page is changed.
         *
         * Only runs when lastScroll is changed enough (on animation frame from above) or when page is changed.
         * This solves issues with page switching not updating the location.
         * There is also the dependency on location so that it can default back to the previous location when scrolling
         * above or below bounds.
         */
        const ids: (HomeType | ProjectType | LinkType)[] = [
            "web development links",
            "vcs visualiser",
            "rubik's cube solver",
            "general development links",
            "energy usage tracker",
            "cheem.uk",
            "About Me"
        ]
        let tick = false;

        if (tick) {
            return;
        }
        const setLocationBasedOnScroll = () => {
            const orderedLocations = ids.map(id => document.getElementById(id)) // map to elements
                .filter(el => el).map(el => el as HTMLElement) // find elements that are on screen
                .sort((el1, el2) => el1.offsetTop > el2.offsetTop ? 1 : -1) // sort by distance from top
            const match = orderedLocations.find(element => {
                const rect = element.getBoundingClientRect();
                return (element.offsetTop >= window.scrollY && element.offsetTop <= window.scrollY + window.innerHeight) ||
                    (rect.bottom >= window.scrollY && rect.bottom <= window.scrollY + window.innerHeight)
            }); // find closest to top that is on the screen
            if (!match) {
                return window.requestAnimationFrame(setLocationBasedOnScroll);
            }
            setLocation(match.id);
            tick = false;
        }
        window.requestAnimationFrame(setLocationBasedOnScroll);
        tick = true;
    }, [lastScroll, page]);

    return <>
        <PageContext.Provider value={{page, setPage}}>
            <div className={"card-deck space-between container"}>
                <NavContext.Provider value={{isMobile, isNavBarLarge}}>
                    <LocationContext.Provider value={location}>
                        <Nav/>
                    </LocationContext.Provider>
                </NavContext.Provider>
                <DarkModeContext.Provider value={isDarkMode}>
                    <main>
                        <Page targetPage={"Home"}><Home/></Page>
                        <Page targetPage={"Projects"}><Projects/></Page>
                        <Page targetPage={"Links"}><Links/></Page>
                    </main>
                </DarkModeContext.Provider>

            </div>
        </PageContext.Provider>
    </>;

}


