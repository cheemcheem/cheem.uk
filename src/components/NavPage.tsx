import {NavPageProps, PageMapping} from "../common/types";
import {NavContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";
import NavLocation from "./NavLocation";

export default function NavPage(props: NavPageProps) {
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
                                    <ul>
                                        {PageMapping.get(props.targetPage)!.map(location =>
                                            <NavLocation key={location} targetPage={props.targetPage}
                                                         targetLocation={location}/>
                                        )}
                                    </ul>
                            }
                        </>
                    }
                </NavContext.Consumer>
            }
        </PageContext.Consumer>
    </>
}