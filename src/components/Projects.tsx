import Card from "./subcomponents/Card";
import RepoLink from "./subcomponents/RepoLink";
import React from "react";
import NewTabLink from "./subcomponents/NewTabLink";

export default function Projects() {
    return <>
        <Card headerTitle={"rubik's cube solver"}
              headerSubtitle={
                  <div className={"card-deck space-between"}>
                      <RepoLink link={"rubiks-cube-solver"}/>
                      <NewTabLink link={"https://cube.cheem.uk"}>Live</NewTabLink>
                  </div>
              }
              footer={
                  <iframe title={"cube"}
                          src={"https://cube.cheem.uk"}
                          width={"100%"}
                          height={500}
                          frameBorder={0}/>
              }/>
        <Card headerTitle={"energy usage tracker"}
              headerSubtitle={<RepoLink link={"energy-usage"}/>}
              footer={<div style={{height: 700}}>example</div>}/>
        <Card headerTitle={"vcs visualiser"}
              headerSubtitle={<RepoLink link={"vcs-history"}/>}
              footer={<div style={{height: 1000}}>example</div>}/>
        <Card headerTitle={"cheem.uk"}
              headerSubtitle={
                  <div className={"card-deck space-between"}>
                      <RepoLink link={"cheem.uk"}/>
                      <NewTabLink link={"https://cheem.uk"}>Live</NewTabLink>
                  </div>
              }
              footer={<div style={{height: 1000}}>example</div>}/>
    </>;
}