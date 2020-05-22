import React, {Suspense} from "react";
import {PageProps} from "../common/types";
import {PageContext} from "../common/contexts";


export default function Page(props: PageProps) {
    return <>
        <PageContext.Consumer>
            {page =>
                (page.page !== props.targetPage)
                    ? <></>
                    : <div className={"parent"}>
                        <div className={"card-deck-horizontal"}>
                            <div id={"variableDiv"}/>
                            <Suspense fallback={<></>}>
                                {props.children}
                            </Suspense>
                        </div>
                    </div>
            }
        </PageContext.Consumer>
    </>;
}

