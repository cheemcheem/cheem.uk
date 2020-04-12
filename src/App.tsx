import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import Navigation from "./subcomponents/navigation";
import Page from "./subcomponents/page";
import {PageType, ProjectType} from "./common/types";
import Card from "./subcomponents/card";
import NavigationDropDown from "./subcomponents/navigationDropDown";
import RepoLink from "./subcomponents/repoLink";

export default function App() {
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [project, setProject] = useState("Rubik's Cube Solver" as ProjectType);

    const projects: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const sideNav: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const height = () => (window.innerWidth <= 750 ? sideNav.current!.getBoundingClientRect().height : 0);

    let ticking = useRef(false);
    const checkActive = useCallback(() => {
        if (!projects.current || ticking.current) return;

        ticking.current = true;

        window.requestAnimationFrame(() => {
            const fromTop = window.scrollY;

            let newProject = project;
            for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
                const child = projects.current!.children.item(childIndex)! as HTMLElement;
                const offsetTop = child.offsetTop - height();
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

    useEffect(() => {
        localStorage.setItem(pageKey, page);
        window.addEventListener("scroll", () => checkActive(), true);
        return () => window.removeEventListener("scroll", () => checkActive(), true);
    }, [checkActive, page]);

    const setProjectViaNav = (project: ProjectType) => {
        if (!projects.current) return;

        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)!;
            if (child.id === project) {
                const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
                window.scrollTo({behavior: "smooth", top: (childChild).offsetTop - height()});
                break;
            }
        }
    };

    const setPageViaNav = (page: PageType) => {
        if (page === "Projects") {
            checkActive();
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
                    <div className={"projects"}>
                        <div ref={projects} className={"card-deck-horizontal"}>
                            <Card headerTitle={"Rubik's Cube Solver"}
                                  headerSubtitle={<div className={"card-deck flex"}><RepoLink
                                      link={"https://github.com/cheemcheem/rubiks-cube-solver"}/><a
                                      href={"https://cube.cheem.uk"}>Live</a></div>}
                                  footer={<iframe title={"cube"} src={"https://cube.cheem.uk"} width={"100%"}
                                                  height={500}
                                                  frameBorder={0}/>}/>
                            <Card headerTitle={"Energy Usage Tracker"}
                                  headerSubtitle={<RepoLink link={"https://github.com/cheemcheem/energy-usage"}/>}
                                  footer={<div style={{height: 700}}>example</div>}/>
                            <Card headerTitle={"VCS Visualiser"}
                                  headerSubtitle={<RepoLink link={"https://github.com/cheemcheem/vcs-history"}/>}
                                  footer={<div style={{height: 1000}}>example</div>}/>
                        </div>
                    </div>
                </Page>
            </main>
        </div>
    );
}
