import {MutableRefObject} from "react";

export type PageType = "Home" | "Projects" | "About Me"
export type ProjectType = "Rubik's Cube Solver" | "Energy Usage Tracker" | "VCS Visualiser"
export type NavigationProps<T> = { targetLocation: T, location: T, setLocation: (location: T) => void }
export type PageProps = NavigationProps<PageType> & HasChildren;
export type NavigationDropDownProps = { visible: boolean; } & HasChildren;
export type HasChildren = { children: any };
export type RepoLinkProps = { link: string }
export type ProjectsProps = { projectsRef: MutableRefObject<null | HTMLDivElement>, variableDivRef: MutableRefObject<null | HTMLDivElement> };