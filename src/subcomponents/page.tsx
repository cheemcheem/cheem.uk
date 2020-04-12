import React from "react";
import {PageProps} from "../common/types";


function Page(props: PageProps) {
    if (props.targetLocation === props.location) {
        return props.children;
    }

    return <></>
}

export default Page;