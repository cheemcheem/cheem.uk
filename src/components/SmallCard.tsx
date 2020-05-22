import React from "react";
import {SmallCardProps} from "../common/types";


export default function SmallCard(props: SmallCardProps) {
    return <div id={props.id ? String(props.id) : String(props.headerTitle)} className={"card-deck"}>
        <div className={"card mb-3"}>
            <div className={"card-header"}>
                <h1 className={"card-title"}>{props.headerTitle}</h1>
                {props.children}
            </div>
        </div>
    </div>
}