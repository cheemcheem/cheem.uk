import React from "react";
import {NewTabLinkProps} from "../../common/types";

export default function NewTabLink(props: NewTabLinkProps) {
    return <>
        <a className={`no-a${props.mono ? ' mono' : ''}`} target="_blank" rel="noopener noreferrer" href={props.link}>
            {props.children}
        </a>
    </>;
}