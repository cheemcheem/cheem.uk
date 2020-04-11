export type Page = "Home" | "Projects" | "About Me"
export type Project = "Rubik's Cube Solver" | "Energy Usage Tracker" | "VCS Visualiser"
export type NavigationProps<T> = {
    targetLocation: T,
    location: T,
    setLocation: (location: T) => void
}
export type PageProps = NavigationProps<Page> & HasChildren;
export type NavigationDropDownProps = { visible: boolean; } & HasChildren;
export type HasChildren = { children: any };
export type RepoLinkProps = { link: string }