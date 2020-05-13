import {useEffect, useState} from "react";
import {PageType} from "./types";

export default function NavigationController() {
    // page = top level nav, location = lower level nav
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    const [subLocation, setSubLocation] = useState();
    const [navScrolling, setNavScrolling] = useState(false);
    const [navAnimationFrameTicking, setNavAnimationFrameTicking] = useState(false);
    const [sideNavContainsNonActive, setSideNavContainsNonActive] = useState(true);

    useEffect(() => {
        localStorage.setItem(pageKey, page);
    });


    // set the active page or location via the nav
    const setPageViaNav = (targetPage: PageType) => {
        setNavScrolling(false);
        setNavAnimationFrameTicking(false);
        window.scroll({top: 0});
        setPage(targetPage);
    };
    const setLocationViaNav = (targetLocation: string) => {
        // if (!parentDiv.current || !variableDiv.current) return;
        //
        // navScrolling.current = true;
        //
        // for (let childIndex = 0; childIndex < parentDiv.current!.children.length; childIndex++) {
        //     const child = parentDiv.current!.children.item(childIndex)!;
        //     if (child.id === targetLocation) {
        //         const childChild = child.children.item(0)!.children.item(0)! as HTMLElement;
        //         window.scrollTo({behavior: "auto", top: (childChild).offsetTop - (getNavHeight() + navOffset)});
        //
        //         // nav scrolling as false prevents the nav from changing size when buttons are clicked
        //         // only works if scroll behaviour is not smooth otherwise it will take too long to scroll
        //         window.requestAnimationFrame(() => navScrolling.current = false);
        //         break;
        //     }
        // }
    };
    return {
        page,
        setPage,
        subLocation,
        setSubLocation,
        setPageViaNav,
        setLocationViaNav,
        navScrolling,
        setNavScrolling,
        navAnimationFrameTicking,
        setNavAnimationFrameTicking,
        sideNavContainsNonActive,
        setSideNavContainsNonActive
    };
}