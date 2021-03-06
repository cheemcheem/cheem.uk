import React from "react";
import {CardProps} from "../../common/types";

export default function Card(props: CardProps) {
    return <>
        <div id={props.headerTitle} className={"card-deck"}>
            <div className={"card mb-3"}>
                <div className={"card-header mb-1"}>
                    <h1 className={"card-title"}>{props.headerTitle}</h1>
                    <h4 className={"card-title"}>{props.headerSubtitle}</h4>
                </div>
                <div className={"card-footer"}>
                <span className={"text-muted"}>
                    {props.footer}
                </span>
                </div>
            </div>
        </div>
    </>;
}