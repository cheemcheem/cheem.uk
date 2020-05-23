import React from "react";
import {NavListItemProps} from "../common/types";

export default function NavListItem(props: NavListItemProps) {
    return <>
        <li tabIndex={0} className={`nav-item ${props.active ? "active" : ""}`} style={{cursor: "pointer"}}
            onKeyUp={event => {
                if (event.keyCode === 13) props.onClick();
            }} onClick={props.onClick}>
            <span className={`nav-link site`}>{props.children}</span>
        </li>
    </>
}
