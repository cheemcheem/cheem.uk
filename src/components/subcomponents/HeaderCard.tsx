import React from "react";
import {HeaderCardProps} from "../../common/types";

export default function HeaderCard(props: HeaderCardProps) {
    return <div className={"card normal-background mt-3"}>
        <h1 tabIndex={0}>{props.header}</h1>
        <span tabIndex={0}>{props.children}</span>
    </div>;
}