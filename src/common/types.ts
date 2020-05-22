import React from "react";

export type PageType = "Home" | "Projects" | "Links";
export type ProjectType = "rubik's cube solver" | "energy usage tracker" | "vcs visualiser" | "cheem.uk";
export type LinkType = "web development links" | "general development links" | "useful links";
export type HomeType = "about me";
export type LocationType = (HomeType | ProjectType | LinkType);
export type AnyChildren = { children: any };
export type ReactChildren = { children: React.ReactElement | React.ReactElement[] };

export type RepoLinkProps = { link: string };
export type NavPageProps = { targetPage: PageType };
export type NavLocationProps = { targetPage: PageType, targetLocation: LocationType };
export type NavListItemProps = { active: boolean, onClick: () => void } & AnyChildren;
export type NewTabLinkProps = RepoLinkProps & AnyChildren;
export type PageProps = { targetPage: PageType } & ReactChildren;
export type SmallCardProps =
    ({ headerTitle: LocationType, id?: LocationType } | { headerTitle: string, id?: LocationType })
    & ReactChildren;
export type CardProps = { headerTitle: LocationType, headerSubtitle: any, footer: any }

export const PageMapping = new Map<PageType, LocationType[]>([
    ["Home", ["about me"]],
    ["Projects", ["rubik's cube solver", "energy usage tracker", "vcs visualiser", "cheem.uk"]],
    ["Links", ["web development links", "general development links", "useful links"]]
]);
