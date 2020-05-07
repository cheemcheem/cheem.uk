import React from "react";
import SmallCard from "../components/SmallCard";
import {LinkType} from "../common/types";
import NewTabLink from "../components/NewTabLink";

function Row(props: { title: string, link: URL }) {
    return <div className={"card-deck space-between mb-1 mono"}>
        <div className={"card-deck space-between card-deck-half"}>
            <span>{props.title}</span>
            <span className={"hidden-mobile"}>-</span>
        </div>
        <div className={"card-deck right"}>
            <NewTabLink link={props.link.href}>
                <span>{props.link.hostname}</span>
            </NewTabLink>
        </div>
    </div>
}

export default function Links() {
    return <>
        <SmallCard<LinkType> headerTitle={"web development links"}>
            <Row title={"flex box"} link={new URL("https://www.internetingishard.com/html-and-css/flexbox/")}/>
            <Row title={"mdn"} link={new URL("https://developer.mozilla.org/")}/>
            <Row title={"coolors"} link={new URL("https://coolors.co/")}/>
            <Row title={"css fonts"} link={new URL("https://www.cssfontstack.com/")}/>
        </SmallCard>
        <SmallCard<LinkType> headerTitle={"general development links"}>
            <Row title={"duckduckgo bangs"} link={new URL("https://duckduckgo.com/bang")}/>
        </SmallCard>
    </>;
}
