import React from "react";

type DarkCardProps = {
    headerTitle: string,
    headerSubtitle: string,
    footer: any,
    link: string
}

export default function DarkCard(props: DarkCardProps) {
    return <div>
        <div className={"card onclick"} onClick={() => window.location.href = props.link}>
            <div className={"card-deck space-between"}>
                <div className={"card-deck-horizontal"}>
                    <h1 className={"card-title"}>{props.headerTitle}</h1>
                    <h2 className={"card-subtitle"}>{props.headerSubtitle}</h2>
                </div>
                <div>
                    <h3 className={"card-subtitle"}>{props.footer}</h3>
                </div>
            </div>
        </div>
    </div>
}