import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import Navigation from "./subcomponents/navigation";
import Page from "./subcomponents/page";
import {PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./subcomponents/navigationDropDown";

const Projects = React.lazy(() => import("./pages/projects"));

export default function App() {
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [project, setProject] = useState("Rubik's Cube Solver" as ProjectType);

    const projects: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const sideNav: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const ticking: React.MutableRefObject<boolean> = useRef(false);

    const navOffset = 30;
    const getNavHeight = () => (window.innerWidth <= 750 ? sideNav.current!.getBoundingClientRect().height : 0);

    const lastScrollTop = useRef(0);
    const lastNavHeight = useRef(0);
    const deltaForNavScroll = 5;
    const setNavModeOnScroll = useCallback(() => {
        const variableDiv = document.getElementById("variableDiv") as HTMLDivElement;

        // pre nav change values
        const currentNavHeight = getNavHeight();
        const fromTop = window.scrollY;

        // conditions to check before making nav changes
        const sideNavCreated = sideNav.current;
        const navHeightNotJustChanged = currentNavHeight === lastNavHeight.current;
        const windowScrolledEnough = Math.abs(lastScrollTop.current - fromTop) >= deltaForNavScroll;
        const isSmallScreenMode = window.innerWidth <= 750;

        const shouldRun = sideNavCreated && navHeightNotJustChanged && windowScrolledEnough && isSmallScreenMode;

        if (shouldRun) {
            const sideNavUL = sideNav.current!.children.item(0)!;
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
                    variableDiv.style.height = `${diffNavHeight}px`;
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
                        variableDiv.style.height = '0';
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
            lastNavHeight.current = 0;
            lastScrollTop.current = 0;
            variableDiv.style.height = '0';
        }

    }, []);

    const setActiveProject = useCallback(() => {
        if (!projects.current || ticking.current) return;

        ticking.current = true;

        window.requestAnimationFrame(() => {
            const fromTop = window.scrollY;

            let newProject = project;
            for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
                const child = projects.current!.children.item(childIndex)! as HTMLElement;
                const offsetTop = child.offsetTop - (getNavHeight() + navOffset);
                const offsetHeight = child.offsetHeight;
                if (offsetTop <= fromTop && offsetTop + offsetHeight >= fromTop) {
                    newProject = child.id as ProjectType;
                    break;
                }
            }
            setProject(newProject);
            ticking.current = false;
        });

    }, [project]);

    const handleScroll = useCallback(() => {
        setNavModeOnScroll();
        setActiveProject();
    }, [setActiveProject, setNavModeOnScroll]);

    useEffect(() => {
        localStorage.setItem(pageKey, page);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll, true);
        }
    }, [handleScroll, page]);

    const setProjectViaNav = (targetProject: ProjectType) => {
        if (!projects.current) return;

        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)!;
            if (child.id === targetProject) {
                const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
                window.scrollTo({behavior: "smooth", top: (childChild).offsetTop - (getNavHeight() + navOffset)});
                break;
            }
        }
    };

    const setPageViaNav = (page: PageType) => {
        if (page === "Projects") {
            ticking.current = false;
            setProject("Rubik's Cube Solver");
        }
        setPage(page);
    };

    return (
        <div className={"card-deck flex container"}>
            <nav ref={sideNav} className={"side-nav"}>
                <ul>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Home"}/>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Projects"}/>
                    <NavigationDropDown visible={page === "Projects"}>
                        <Navigation<ProjectType> location={project} setLocation={setProjectViaNav}
                                                 targetLocation={"Rubik's Cube Solver"}/>
                        <Navigation<ProjectType> location={project} setLocation={setProjectViaNav}
                                                 targetLocation={"Energy Usage Tracker"}/>
                        <Navigation<ProjectType> location={project} setLocation={setProjectViaNav}
                                                 targetLocation={"VCS Visualiser"}/>
                    </NavigationDropDown>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"About Me"}/>
                </ul>
            </nav>
            <main>
                <Page location={page} setLocation={setPage} targetLocation={"Projects"}>
                    <Suspense fallback={<></>}><Projects projectsRef={projects}/></Suspense>
                </Page>
            </main>
        </div>
    );
}
