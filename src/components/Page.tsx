import React, {Suspense} from "react";
import {PageProps} from "../common/types";


export default function Page(props: PageProps) {
    if (props.targetLocation === props.location) {
        return <>
            <div className={"parent"}>
                <div ref={props.parentRef} className={"card-deck-horizontal"}>
                    <div ref={props.variableDivRef} id={"variableDiv"}/>
                    <Suspense fallback={<></>}>
                        {props.children}
                    </Suspense>
                </div>
            </div>
        </>;
    }

    return <></>
}

