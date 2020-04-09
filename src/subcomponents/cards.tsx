import React from "react";

type CardProps = {
    headerTitle: string,
    headerSubtitle: string,
    footer: any
}

function Card(props: CardProps) {
    return <div className={"card-deck"}>
        <div className={"card mb-3"}
             style={{background: "var(--main-bg-color)", outline: "4px solid var(--dark-color)"}}>
            <div className={"card-header"}>
                <h2 className={"card-title"}>{props.headerTitle}</h2>
                <h3 className={"card-subtitle"}>{props.headerSubtitle}</h3>
            </div>
            <div className={"card-footer text-right"} style={{borderColor: "var(--dark-color)"}}>
                <small className={"text-muted"} style={{color: "var(--text-color)!important"}}>
                    {props.footer}
                </small>
            </div>
        </div>
    </div>
}

export default Card;