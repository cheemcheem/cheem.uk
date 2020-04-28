import Card from "../components/Card";
import RepoLink from "../components/RepoLink";
import React from "react";
import {ProjectType} from "../common/types";

export default function Projects() {
    return <>
        <Card<ProjectType> headerTitle={"rubik's cube solver"}
                           headerSubtitle={
                               <div className={"card-deck space-between"}>
                                   <RepoLink link={"rubiks-cube-solver"}/>
                                   <a target="_blank" rel="noopener noreferrer" href={"https://cube.cheem.uk"}>Live</a>
                               </div>
                           }
                           footer={
                               <iframe title={"cube"}
                                       src={"https://cube.cheem.uk"}
                                       width={"100%"}
                                       height={500}
                                       frameBorder={0}/>
                           }/>
        <Card<ProjectType> headerTitle={"energy usage tracker"}
                           headerSubtitle={<RepoLink link={"energy-usage"}/>}
                           footer={<div style={{height: 700}}>example</div>}/>
        <Card<ProjectType> headerTitle={"vcs visualiser"}
                           headerSubtitle={<RepoLink link={"vcs-history"}/>}
                           footer={<div style={{height: 1000}}>example</div>}/>
        <Card<ProjectType> headerTitle={"cheem.uk"}
                           headerSubtitle={
                               <div className={"card-deck space-between"}>
                                   <RepoLink link={"cheem.uk"}/>
                                   <a target="_blank" rel="noopener noreferrer" href={"https://cheem.uk"}>Live</a>
                               </div>
                           }
                           footer={<div style={{height: 1000}}>example</div>}/>
    </>
}