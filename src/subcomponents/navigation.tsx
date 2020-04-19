import React from "react";
import {NavigationProps} from "../common/types";

export default function Navigation<T>(props: NavigationProps<T>) {
    const setLocationOnClick = () => props.setLocation(props.targetLocation);

    return <>
        <li className={`nav-item ${props.location === props.targetLocation ? "active" : ""}`}
            style={{cursor: "pointer"}} onClick={setLocationOnClick}>
            <span className={`nav-link site`}>{props.targetLocation}</span>
        </li>
    </>
}
