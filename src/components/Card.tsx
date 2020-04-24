import React from "react";
import {CardProps} from "../common/types";

export default function Card<T extends string>(props: CardProps<T>) {
    return <div id={props.headerTitle} className={"card-deck"}>
        <div className={"card mb-3"}>
            <div className={"card-header mb-1"}>
                <h2 className={"card-title"}>{props.headerTitle}</h2>
                <h4 className={"card-subtitle"}>{props.headerSubtitle}</h4>
            </div>
            <div className={"card-footer"}>
                <span className={"text-muted"}>
                    {props.footer}
                </span>
            </div>
        </div>
    </div>
}