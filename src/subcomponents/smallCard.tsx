import React from "react";
import {SmallCardProps} from "../common/types";


export default function SmallCard<T extends string>(props: SmallCardProps<T>) {
    return <div id={props.headerTitle} className={"card-deck"}>
        <div className={"card mb-3"}>
            <div className={"card-header"}>
                <h1 className={"card-title"}>{props.headerTitle}</h1>
                {props.children}
            </div>
        </div>
    </div>
}