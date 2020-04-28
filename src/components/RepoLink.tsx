import React from "react";
import {RepoLinkProps} from "../common/types";

export default function RepoLink(props: RepoLinkProps) {
    return <a target="_blank" rel="noopener noreferrer" href={`https://github.com/cheemcheem/${props.link}`}>GitHub</a>;
}