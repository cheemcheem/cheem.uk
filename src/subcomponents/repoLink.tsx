import React from "react";
import {RepoLinkProps} from "../common/types";

export default function RepoLink(props: RepoLinkProps) {
    return <a href={props.link}>GitHub</a>;
}