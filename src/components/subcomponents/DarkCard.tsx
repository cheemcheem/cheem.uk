import React from "react";

type DarkCardProps = {
    children: any,
    link: string
}

export default function DarkCard(props: DarkCardProps) {
    return <>
        <div className={"onclick"} onClick={() => window.open(props.link, "_blank")}>
            {props.children}
        </div>
    </>;
}