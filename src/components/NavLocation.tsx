import {PageType} from "../common/types";
import {NavContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";

export default function NavLocation<T extends string>(props: { targetPage: PageType, targetLocation: T }) {
    return <>
        <PageContext.Consumer>
            {page =>
                <NavContext.Consumer>
                    {navContext => {
                        const onClick = () => {
                            const waitForPageLoad = () => {
                                window.requestAnimationFrame(() => {
                                    const found = document.getElementById(props.targetLocation);
                                    if (!found) {
                                        return waitForPageLoad();
                                    }

                                    let target = found!.offsetTop;

                                    if (navContext.isMobile) {
                                        const nav = document.getElementById("nav")!;
                                        target -= nav.getBoundingClientRect().height + 2;
                                    }

                                    window.scrollTo({top: target, behavior: "smooth"});
                                });
                            };

                            page.setPage(props.targetPage);
                            waitForPageLoad();
                        };
                        return <>
                            <NavListItem<T> active={props.targetLocation === navContext.location} onClick={onClick}>
                                {props.targetLocation}
                            </NavListItem>
                        </>
                    }}
                </NavContext.Consumer>
            }
        </PageContext.Consumer>
    </>
}