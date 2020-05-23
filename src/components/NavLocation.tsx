import {NavLocationProps} from "../common/types";
import {LocationContext, PageContext} from "../common/contexts";
import NavListItem from "./NavListItem";
import React from "react";

export default function NavLocation(props: NavLocationProps) {
    return <>
        <PageContext.Consumer>
            {page =>
                <LocationContext.Consumer>
                    {locationContext => {
                        const active = props.targetLocation === locationContext.location;
                        const onClick = () => {
                            locationContext.setTargetLocation(props.targetLocation);
                            page.setPage(props.targetPage);
                        };
                        return <>
                            <NavListItem active={active} onClick={onClick}>
                                {props.targetLocation}
                            </NavListItem>
                        </>
                    }}
                </LocationContext.Consumer>
            }
        </PageContext.Consumer>
    </>
}