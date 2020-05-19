import {PageType} from "../common/types";
import {NavContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";

export default function NavPage(props: { targetPage: PageType, children?: any }) {
    return <>
        <PageContext.Consumer>
            {page =>
                <NavContext.Consumer>
                    {navContext =>
                        <>
                            {
                                navContext.isMobile && !navContext.isNavBarLarge
                                    ? <></>
                                    : <NavListItem active={props.targetPage === page.page}
                                                   onClick={() => page.setPage(props.targetPage)}>
                                        {props.targetPage}
                                    </NavListItem>
                            }
                            {
                                navContext.isMobile && props.targetPage !== page.page
                                    ? <></> :
                                    <ul>{props.children}</ul>
                            }
                        </>
                    }
                </NavContext.Consumer>
            }
        </PageContext.Consumer>
    </>
}