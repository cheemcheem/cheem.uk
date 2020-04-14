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

    const getNavHeight = () => 30 + (window.innerWidth <= 750 ? sideNav.current!.getBoundingClientRect().height : 0);

    const lastScrollTop = useRef(0);
    const lastNavHeight = useRef(0);
    const deltaForNavScroll = 5;
    const setNavMode = useCallback(() => {

        const currentNavHeight = getNavHeight();
        const fromTop = window.scrollY;

        const sideNavCreated = sideNav.current;
        const navTypeNotChanged = currentNavHeight === lastNavHeight.current;
        const scrolledEnough = Math.abs(lastScrollTop.current - fromTop) >= deltaForNavScroll;

        const shouldRun = sideNavCreated && navTypeNotChanged && scrolledEnough;

        if (shouldRun) {
            const sideNavUL = sideNav.current!.children.item(0)!;
            const navItems = sideNavUL.children;
            const scrolledDownwards = fromTop > lastScrollTop.current && fromTop > currentNavHeight;

            if (scrolledDownwards) {
                sideNavUL.classList.add("contains-non-active");
                for (let i = 0; i < navItems.length; i++) {
                    navItems.item(i)!.classList.add("non-active");
                }
            } else {
                const canScrollUp = fromTop + window.innerHeight < document.body.clientHeight;
                if (canScrollUp) {
                    sideNavUL.classList.remove("contains-non-active");
                    for (let i = 0; i < navItems.length; i++) {
                        navItems.item(i)!.classList.remove("non-active");
                    }
                }
            }
        }
        lastNavHeight.current = currentNavHeight;
        lastScrollTop.current = fromTop;

    }, []);
    const setActiveProject = useCallback(() => {
        if (!projects.current || ticking.current) return;

        ticking.current = true;

        window.requestAnimationFrame(() => {
            const fromTop = window.scrollY;

            let newProject = project;
            for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
                const child = projects.current!.children.item(childIndex)! as HTMLElement;
                const offsetTop = child.offsetTop - getNavHeight();
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
        setNavMode();
        setActiveProject();
    }, [setActiveProject, setNavMode]);

    useEffect(() => {
        localStorage.setItem(pageKey, page);
        window.addEventListener("scroll", () => handleScroll(), true);
        return () => {
            window.removeEventListener("scroll", () => handleScroll(), true);
        }
    }, [handleScroll, page]);

    const setProjectViaNav = (project: ProjectType) => {
        if (!projects.current) return;

        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)!;
            if (child.id === project) {
                const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
                window.scrollTo({behavior: "smooth", top: (childChild).offsetTop - getNavHeight()});
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
