import React from "react";
import {NavigationProps} from "../common/types";

function Navigation<T>(props: NavigationProps<T>) {
    const setLocationOnClick = () => props.setLocation(props.targetLocation);

    return <>
        <li className={"nav-item"} style={{cursor: "pointer"}} onClick={setLocationOnClick}>
            <span className={`nav-link site ${props.location === props.targetLocation ? "active" : ""}`}>
                {props.targetLocation}
            </span>
        </li>
    </>
}

export default Navigation;