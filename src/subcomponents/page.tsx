import React from "react";
import {PageProps} from "../common/types";


export default function Page(props: PageProps) {
    if (props.targetLocation === props.location) {
        return props.children;
    }

    return <></>
}

