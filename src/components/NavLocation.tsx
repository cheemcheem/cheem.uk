import {PageType} from "../common/types";
import {LocationContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";

export default function NavLocation<T extends string>(props: { targetPage: PageType, targetLocation: T }) {
    return <>
        <PageContext.Consumer>
            {page => {
                const onClick = () => {
                    const waitForPageLoad = () => {
                        window.requestAnimationFrame(() => {
                            const found = document.getElementById(props.targetLocation);
                            if (!found) {
                                return waitForPageLoad();
                            }
                            window.scrollTo({top: found!.offsetTop, behavior: "smooth"});
                        });
                    };

                    page.setPage(props.targetPage);
                    waitForPageLoad();
                };
                return <>
                    <LocationContext.Consumer>
                        {location => <>
                            <NavListItem<T> active={props.targetLocation === location} onClick={onClick}>
                                {props.targetLocation}
                            </NavListItem>
                        </>}
                    </LocationContext.Consumer>
                </>
            }}
        </PageContext.Consumer>
    </>
}