import React from "react";
import {NavListItemProps} from "../common/types";

export default function NavListItem(props: NavListItemProps) {
    return <>
        <li className={`nav-item ${props.active ? "active" : ""}`} style={{cursor: "pointer"}} onClick={props.onClick}>
            <span className={`nav-link site`}>{props.children}</span>
        </li>
    </>
}
