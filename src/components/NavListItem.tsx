import React from "react";
import {NavListItemProps} from "../common/types";

export default function NavListItem<T extends string>(props: NavListItemProps<T>) {
    return <>
        <li className={`nav-item ${props.active ? "active" : ""}`} style={{cursor: "pointer"}} onClick={props.onClick}>
            <span className={`nav-link site`}>{props.children}</span>
        </li>
    </>
}
