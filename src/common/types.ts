export type PageType = "Home" | "Projects" | "Links"
export type CardProps<T extends string> = { headerTitle: T, headerSubtitle: any, footer: any }
export type SmallCardProps<T> = { headerTitle: T, children: any }
export type ProjectType = "rubik's cube solver" | "energy usage tracker" | "vcs visualiser" | "cheem.uk"
export type LinkType = "web development links" | "general development links"
export type NavigationProps<T> = { location: T, setLocation: (location: T) => void, targetLocation: T }
export type NavigationDropDownProps = { visible: boolean; } & HasChildren;
export type HasChildren = { children: any };
export type RepoLinkProps = { link: string }
export type NewTabLinkProps = RepoLinkProps & HasChildren;
export type PageProps = NavigationProps<PageType> & HasChildren;
