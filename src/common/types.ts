import {MutableRefObject} from "react";

export type PageType = "Home" | "Projects" | "Links"
export type CardProps = { headerTitle: string, headerSubtitle: any, footer: any }
export type SmallCardProps = { headerTitle: string, children: any }
export type ProjectType = "Rubik's Cube Solver" | "Energy Usage Tracker" | "VCS Visualiser"
export type NavigationProps<T> = { location: T, setLocation: (location: T) => void, targetLocation: T }
export type PageProps = NavigationProps<PageType> & HasChildren;
export type NavigationDropDownProps = { visible: boolean; } & HasChildren;
export type HasChildren = { children: any };
export type RepoLinkProps = { link: string }
export type ProjectsProps = { projectsRef: MutableRefObject<null | HTMLDivElement>, variableDivRef: MutableRefObject<null | HTMLDivElement> };