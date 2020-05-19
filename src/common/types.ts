export type PageType = "Home" | "Projects" | "Links"
export type CardProps<T extends string> = { headerTitle: T, headerSubtitle: any, footer: any }
export type SmallCardProps<T> = { headerTitle: T, children: any }
export type ProjectType = "rubik's cube solver" | "energy usage tracker" | "vcs visualiser" | "cheem.uk"
export type LinkType = "web development links" | "general development links"
export type HomeType = "About Me"
export type NavListItemProps<T extends string> = { active: boolean, onClick: () => void } & HasChildren;
export type HasChildren = { children: any };
export type RepoLinkProps = { link: string }
export type NewTabLinkProps = RepoLinkProps & HasChildren;
export type PageProps = { targetPage: PageType } & HasChildren;
