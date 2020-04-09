import React from "react";

type PageProps = {
    targetLocation: string,
    location: string
    setLocation: (location: string) => void,
    children: any
}

function Page(props: PageProps) {
    if (props.targetLocation === props.location) {
        return <>
            <div className={"row mb-3"}>
                <div className={"col"}>
                    {props.children}
                </div>
            </div>
            <div className={"row mb-3"}>
                <div className={"col"}>

                </div>
            </div>
        </>
    }

    return <>

    </>
}

export default Page;