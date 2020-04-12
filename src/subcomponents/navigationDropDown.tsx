import {NavigationDropDownProps} from "../common/types";
import React from "react";

export default function NavigationDropDown(props: NavigationDropDownProps) {
    if (props.visible) {
        return <>
            <ul>
                {props.children}
            </ul>
        </>
    }

    return <>
    </>
}
