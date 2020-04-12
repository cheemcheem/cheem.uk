import React from "react";

type CardProps = {
    headerTitle: string,
    headerSubtitle: any,
    footer: any
}

export default function Card(props: CardProps) {
    return <div id={props.headerTitle} className={"card-deck"}>
        <div className={"card mb-3"}>
            <div className={"card-header mb-1"}>
                <h1 className={"card-title"}>{props.headerTitle}</h1>
                <h2 className={"card-subtitle"}>{props.headerSubtitle}</h2>
            </div>
            <div className={"card-footer"}>
                <small className={"text-muted"}>
                    {props.footer}
                </small>
            </div>
        </div>
    </div>
}