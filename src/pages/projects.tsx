import Card from "../subcomponents/card";
import RepoLink from "../subcomponents/repoLink";
import React from "react";
import {ProjectsProps} from "../common/types";

export default function Projects(props: ProjectsProps) {
    return <>
        <div className={"projects"}>
            <div ref={props.projectsRef} className={"card-deck-horizontal"}>
                <div ref={props.variableDivRef} id={"variableDiv"}/>
                <Card headerTitle={"Rubik's Cube Solver"}
                      headerSubtitle={
                          <div className={"card-deck space-between"}>
                              <RepoLink link={"https://github.com/cheemcheem/rubiks-cube-solver"}/>
                              <a href={"https://cube.cheem.uk"}>Live</a>
                          </div>
                      }
                      footer={
                          <iframe title={"cube"}
                                  src={"https://cube.cheem.uk"}
                                  width={"100%"}
                                  height={500}
                                  frameBorder={0}/>
                      }/>
                <Card headerTitle={"Energy Usage Tracker"}
                      headerSubtitle={<RepoLink link={"https://github.com/cheemcheem/energy-usage"}/>}
                      footer={<div style={{height: 700}}>example</div>}/>
                <Card headerTitle={"VCS Visualiser"}
                      headerSubtitle={<RepoLink link={"https://github.com/cheemcheem/vcs-history"}/>}
                      footer={<div style={{height: 1000}}>example</div>}/>
            </div>
        </div>
    </>
}