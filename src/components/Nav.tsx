import {HomeType, LinkType, ProjectType} from "../common/types";
import React from "react";
import NavPage from "./NavPage";
import NavLocation from "./NavLocation";

export default function Nav() {
    return <>
        <nav className={"side-nav"}>
            <ul>
                <NavPage targetPage={"Home"}>
                    <NavLocation<HomeType> targetPage={"Home"} targetLocation={"About Me"}/>
                </NavPage>
                <NavPage targetPage={"Projects"}>
                    <NavLocation<ProjectType> targetPage={"Projects"} targetLocation={"rubik's cube solver"}/>
                    <NavLocation<ProjectType> targetPage={"Projects"} targetLocation={"energy usage tracker"}/>
                    <NavLocation<ProjectType> targetPage={"Projects"} targetLocation={"vcs visualiser"}/>
                    <NavLocation<ProjectType> targetPage={"Projects"} targetLocation={"cheem.uk"}/>
                </NavPage>
                <NavPage targetPage={"Links"}>
                    <NavLocation<LinkType> targetPage={"Links"} targetLocation={"web development links"}/>
                    <NavLocation<LinkType> targetPage={"Links"} targetLocation={"general development links"}/>
                    <NavLocation<LinkType> targetPage={"Links"} targetLocation={"useful links"}/>
                </NavPage>
            </ul>
        </nav>
    </>
}