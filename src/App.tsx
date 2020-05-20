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
            if (tick) return;

            const onscroll = (currentScroll: number, lastScroll: number) => () => {
                let shouldRun = true;
                if (currentScroll <= 0 || currentScroll + window.innerHeight >= document.body.getBoundingClientRect().height) {
                    shouldRun = false;
                }
                if (lastScroll <= 0 || lastScroll + window.innerHeight >= document.body.getBoundingClientRect().height) {
                    shouldRun = false;
                }
                if (shouldRun) {
                    setIsNavBarLarge(currentScroll < lastScroll);
                }
                tick = false;
            }
            const currentScroll = window.scrollY;
            const scrollDiff = Math.abs(currentScroll - lastScroll);
            if (scrollDiff > 15) {
                tick = true;
                window.requestAnimationFrame(onscroll(currentScroll, lastScroll));
                setLastScroll(currentScroll);
            }
        }

        window.addEventListener("scroll", check);
        return () => window.removeEventListener("scroll", check);
    });

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
         * The ticking of this method is handled through the ticking of the other useEffect.
         */
        const ids: (HomeType | ProjectType | LinkType)[] = [
            "About Me",
            "rubik's cube solver",
            "energy usage tracker",
            "vcs visualiser",
            "cheem.uk",
            "web development links",
            "general development links",
            "useful links",
        ]
        const setLocationBasedOnScroll = () => {
            const orderedLocations = ids.map(id => document.getElementById(id)) // map to elements
                .filter(el => el) // find elements that are on screen (remove nulls)
                .map(el => el as HTMLElement) // let the type system know that all elements are not null
                .sort((el1, el2) => el1.offsetTop > el2.offsetTop ? 1 : -1) // sort by distance from top

            // find closest to top that is on the screen
            const match = orderedLocations.find(element => {
                const rect = element.getBoundingClientRect();
                const topOfMatch = element.offsetTop;
                const bottomOfMatch = topOfMatch + rect.bottom;
                const topOfWindow = window.scrollY;
                const bottomOfWindow = topOfWindow + window.innerHeight;
                return (topOfMatch >= topOfWindow && topOfMatch <= bottomOfWindow)
                    || (bottomOfMatch >= topOfWindow && bottomOfMatch <= bottomOfWindow)
            });
            if (!match) {
                // the current page isn't rendered on the dom
                return window.requestAnimationFrame(setLocationBasedOnScroll);
            }
            setLocation(match.id);
        }
        window.requestAnimationFrame(setLocationBasedOnScroll);
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


