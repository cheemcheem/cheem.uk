import React, {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import Navigation from "./common/navigation";
import Page from "./common/page";
import {Page as PageType, Project} from "./common/types";
import Card from "./subcomponents/card";
import NavigationDropDown from "./common/navigationDropDown";

function App() {
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [project, setProject] = useState("Rubik's Cube Solver" as Project);

    const projects: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
    const sideNav: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const onscrollCallback = useCallback(() => () => {
        if (!projects.current || !sideNav.current) return;

        const fromTop = window.scrollY;
        const height = window.innerWidth <= 750 ? sideNav.current!.getBoundingClientRect().height : 0;

        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)! as HTMLElement;
            const offsetTop = child.offsetTop - height - 20;
            const offsetHeight = child.offsetHeight;
            if (offsetTop <= fromTop && offsetTop + offsetHeight >= fromTop) {
                setProject(child.id as Project);
                return;
            }
        }
        setProject(project);
    }, [projects, setProject, project]);

    useEffect(() => {
        localStorage.setItem(pageKey, page);
        window.addEventListener("scroll", onscrollCallback(), true);
        return () => window.removeEventListener("scroll", onscrollCallback(), true);
    }, [page, onscrollCallback]);

    const setProjectViaNav = (project: Project) => {
        if (!projects.current || !sideNav.current) return;

        const height = window.innerWidth <= 750 ? sideNav.current!.getBoundingClientRect().height : 0;
        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)!;
            if (child.id === project) {
                const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
                window.scrollTo({
                    behavior: "smooth",
                    top: (childChild).offsetTop - height - 20
                })
                break;
            }
        }

    };
    const setPageViaNav = (page: PageType) => {
        if (page === "Projects") {
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
                        <Navigation<Project> location={project} setLocation={setProjectViaNav}
                                             targetLocation={"Rubik's Cube Solver"}/>
                        <Navigation<Project> location={project} setLocation={setProjectViaNav}
                                             targetLocation={"Energy Usage Tracker"}/>
                        <Navigation<Project> location={project} setLocation={setProjectViaNav}
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
                                  headerSubtitle={<a href={"https://github.com/cheemcheem/rubiks-cube-solver"}>GitHub
                                      repo</a>}
                                  footer={<iframe title={"cube"} src={"https://cube.cheem.uk"} width={"100%"}
                                                  height={500}
                                                  frameBorder={0}/>}/>
                            <Card headerTitle={"Energy Usage Tracker"}
                                  headerSubtitle={<a href={"https://github.com/cheemcheem/energy-usage"}>GitHub
                                      repo</a>}
                                  footer={<div style={{height: 700}}>example</div>}/>
                            <Card headerTitle={"VCS Visualiser"}
                                  headerSubtitle={<a href={"https://github.com/cheemcheem/vcs-history"}>GitHub
                                      repo</a>}
                                  footer={<div style={{height: 1000}}>example</div>}/>
                        </div>
                    </div>
                </Page>
            </main>
        </div>
    );
}

export default App;
