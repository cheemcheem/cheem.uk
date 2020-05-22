import {NavPageProps, PageMapping} from "../common/types";
import {NavContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";
import NavLocation from "./NavLocation";

export default function NavPage(props: NavPageProps) {
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