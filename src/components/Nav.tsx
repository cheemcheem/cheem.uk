import {LocationType, PageMapping, PageType} from "../common/types";
import React, {PropsWithChildren} from "react";
import {LocationContext, NavContext, PageContext} from "../common/contexts";

function NavListItem(props: { active: boolean, onClick: () => void } & PropsWithChildren<any>) {
    return <>
        <li tabIndex={0} className={`nav-item ${props.active ? "active" : ""}`} style={{cursor: "pointer"}}
            onKeyUp={event => event.keyCode === 13 ? props.onClick() : undefined} onClick={props.onClick}>
            <span className={`nav-link site`}>{props.children}</span>
        </li>
    </>;
}

function NavLocation(props: { targetPage: PageType, targetLocation: LocationType }) {
    return <>
        <PageContext.Consumer>
            {page =>
                <LocationContext.Consumer>
                    {locationContext =>
                        <NavListItem active={props.targetLocation === locationContext.location}
                                     onClick={() => {
                                         locationContext.setTargetLocation(props.targetLocation);
                                         page.setPage(props.targetPage);
                                     }}>
                            {props.targetLocation}
                        </NavListItem>
                    }
                </LocationContext.Consumer>
            }
        </PageContext.Consumer>
    </>;
}

function NavPage(props: { targetPage: PageType }) {
    return <>
        <PageContext.Consumer>
            {pageContext =>
                <NavContext.Consumer>
                    {navContext =>
                        <>
                            {
                                navContext.isMobile && !navContext.isNavBarLarge
                                    ? <></>
                                    : <NavListItem active={props.targetPage === pageContext.page}
                                                   onClick={() => pageContext.setPage(props.targetPage)}>
                                        {props.targetPage}
                                    </NavListItem>
                            }
                            {
                                navContext.isMobile && props.targetPage !== pageContext.page
                                    ? <></> :
                                    <li className={"sub-nav"}>
                                        <ul>
                                            {PageMapping.get(props.targetPage)!.locations.map(location =>
                                                <NavLocation key={location} targetPage={props.targetPage}
                                                             targetLocation={location}/>
                                            )}
                                        </ul>
                                    </li>
                            }
                        </>
                    }
                </NavContext.Consumer>
            }
        </PageContext.Consumer>
    </>;
}

export default function Nav() {
    const pages: PageType[] = [];
    PageMapping.forEach((_, key) => pages.push(key));
    return <>
        <nav id="nav" className={"side-nav"}>
            <ul>
                {pages.map(page => <NavPage key={page} targetPage={page}/>)}
            </ul>
        </nav>
    </>;
}