import React from "react";
import {HeaderCardProps} from "../../common/types";

export default function HeaderCard(props: HeaderCardProps) {
    return <div className={"card normal-background mt-3"}>
        <h1>{props.header}</h1>
        <span>{props.children}</span>
    </div>;
}