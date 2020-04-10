import React from "react";
import {NavigationProps, Page as PageType} from "./types";

type PageProps = NavigationProps<PageType> & { children: any }

function Page(props: PageProps) {
    if (props.targetLocation === props.location) {
        return props.children;
    }

    return <></>
}

export default Page;