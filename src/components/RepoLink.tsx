import React from "react";
import {RepoLinkProps} from "../common/types";
import NewTabLink from "./NewTabLink";

export default function RepoLink(props: RepoLinkProps) {
    return <NewTabLink link={`https://github.com/cheemcheem/${props.link}`}>GitHub</NewTabLink>;
}