import {PageMapping, PageType} from "../common/types";
import React from "react";
import NavPage from "./NavPage";

export default function Nav() {
    const pages: PageType[] = [];
    PageMapping.forEach((_, key) => pages.push(key));
    return <>
        <nav className={"side-nav"}>
            <ul>
                {pages.map(page => <NavPage targetPage={page}/>)}
            </ul>
        </nav>
    </>
}