import {NavigationDropDownProps} from "../common/types";
import React from "react";

function NavigationDropDown(props: NavigationDropDownProps) {
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

export default NavigationDropDown;