import React from "react";

const Home = React.lazy(() => import("../components/Home"));
const Projects = React.lazy(() => import("../components/Projects"));
const Links = React.lazy(() => import("../components/Links"));

export type PageType = "Home" | "Projects" | "Links";
export type ProjectType = "rubik's cube solver" | "energy usage tracker" | "vcs visualiser" | "cheem.uk";
export type LinkType = "web development links" | "general development links" | "useful links";
export type HomeType = "about me";
export type LocationType = (HomeType | ProjectType | LinkType);
export type AnyChildren = { children: any };
export type ReactChildren = { children?: React.ReactElement | React.ReactElement[] };

export type RepoLinkProps = { link: string };
export type NewTabLinkProps = RepoLinkProps & AnyChildren;
export type PageProps = { targetPage: PageType } & ReactChildren;
export type CardProps = { headerTitle: LocationType, headerSubtitle: any, footer: any };
export type SmallCardProps =
    ({ headerTitle: LocationType, id?: LocationType } | { headerTitle: string, id?: LocationType })
    & ReactChildren;

export const PageMapping = new Map<PageType, { locations: LocationType[], component: React.ReactElement }>([
    ["Home", {
        locations: ["about me"],
        component: <Home/>
    }],
    ["Projects", {
        locations: ["rubik's cube solver", "energy usage tracker", "vcs visualiser", "cheem.uk"],
        component: <Projects/>
    }],
    ["Links", {
        locations: ["web development links", "general development links", "useful links"],
        component: <Links/>
    }]
]);
