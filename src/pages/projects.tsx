import Card from "../subcomponents/card";
import React, {useEffect, useRef, useState} from "react";
import Navigation from "../common/navigation";
import {Project} from "../common/types";

function Projects() {
    const [project, setProject] = useState("Rubik's Cube Solver" as Project);

    const projects: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const onscroll = () => {
        const fromTop = window.scrollY;
        if (!projects.current) return;

        for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
            const child = projects.current!.children.item(childIndex)! as HTMLElement;
            const offsetTop = child.offsetTop - 90;
            const offsetHeight = child.offsetHeight;
            if (offsetTop <= fromTop && offsetTop + offsetHeight >= fromTop) {
                setProject(child.id as Project);
                return;
            }
        }
        setProject(project);
    };

    const setLocationNav = (project: Project) => {
        if (projects.current) {
            for (let childIndex = 0; childIndex < projects.current!.children.length; childIndex++) {
                const child = projects.current!.children.item(childIndex)!;
                if (child.id === project) {
                    window.scrollTo({top: (child.children.item(0)!.children.item(0)! as HTMLElement).offsetTop - 90})
                    // child.children.item(0)!.children.item(0)!.scrollIntoView({behavior: "smooth"});
                    break;
                }
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", onscroll, true);

        return () => window.removeEventListener("scroll", onscroll, true);
    });

    return <>
        <div className={"card-deck flex"} style={{width: "100%"}}>
            <nav className={"side-nav"}>
                <ul>
                    <Navigation<Project> location={project} setLocation={setLocationNav}
                                         targetLocation={"Rubik's Cube Solver"}/>
                    <Navigation<Project> location={project} setLocation={setLocationNav}
                                         targetLocation={"Energy Usage Tracker"}/>
                    <Navigation<Project> location={project} setLocation={setLocationNav}
                                         targetLocation={"VCS Visualiser"}/>
                </ul>
            </nav>
            <div style={{width: "60%", display: "flex", flexDirection: "column", alignContent: "center"}}>
                <div ref={projects} className={"card-deck-horizontal"}>
                    <Card headerTitle={"Rubik's Cube Solver"}
                          headerSubtitle={<a href={"https://github.com/cheemcheem/rubiks-cube-solver"}>GitHub repo</a>}
                          footer={<iframe title={"cube"} src={"https://cube.cheem.uk"} width={"100%"} height={500}
                                          frameBorder={0}/>}/>
                    <Card headerTitle={"Energy Usage Tracker"}
                          headerSubtitle={<a href={"https://github.com/cheemcheem/energy-usage"}>GitHub repo</a>}
                          footer={<div style={{height: 700}}>example</div>}/>
                    <Card headerTitle={"VCS Visualiser"}
                          headerSubtitle={<a href={"https://github.com/cheemcheem/vcs-history"}>GitHub repo</a>}
                          footer={<div style={{height: 1000}}>example</div>}/>
                </div>
            </div>
            <div style={{width: "20%"}}/>
        </div>
    </>

}

export default Projects;