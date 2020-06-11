import Card from "./subcomponents/Card";
import RepoLink from "./subcomponents/RepoLink";
import React from "react";
import NewTabLink from "./subcomponents/NewTabLink";
import SmallCard from "./subcomponents/SmallCard";

export default function Projects() {

    function RubiksCubeDescription() {
        return <>
            <div className={"card-deck space-between"}>
                <RepoLink link={"rubiks-cube-solver"}/>
                <NewTabLink link={"https://cube.cheem.uk"}>Live</NewTabLink>
            </div>
        </>
    }

    function RubiksCubeFooter() {
        return <>
            <p>
                I set out on this project to create a Rubik's cube game that works from within the browser.
                My motivations came from playing with my Rubik's cube and wanting to programmatically solve my cube
                using software that I wrote.
            </p>
            <p>
                I ended up creating a full-stack app, with a front-end for rendering the cube state and a back-end for
                handling user requests and updating the state of the cube.
                Seeing as the front-end seemed very state-dependant, I thought this would be a good opportunity to learn
                React, so I used a library called <NewTabLink mono
                                                              link={"https://github.com/brianzinn/react-babylonjs"}>react-babylonjs</NewTabLink> that
                provided React components for the WebGL library <NewTabLink mono
                                                                            link={"https://github.com/BabylonJS/Babylon.js"}>babylonjs</NewTabLink> .
            </p>
            <p>
                For the back end, I used spring-boot running on jdk-13 with an in-memory Hibernate database for handling
                sessions storage and cube state storage.
            </p>
            <p>
                As it stands now, I achieved most of my goals going into this project.
                You can browse to <NewTabLink mono link={"https://cube.cheem.uk"}>cube.cheem.uk</NewTabLink> and see a
                3D, manipulable, interactive Rubik's cube!
                It currently does not solve the cube by performing any special actions, it merely reverses the moves
                made so far until it reaches the last solved state!
            </p>
            <br/>

            <iframe title={"cube"}
                    src={"https://cube.cheem.uk"}
                    width={"100%"}
                    height={500}
                    frameBorder={0}/>

            <ul className={"hashtags"}>
                <li>spring-boot</li>
                <li>jdk-13</li>
                <li>java</li>
                <li>webgl</li>
                <li>react</li>
            </ul>

        </>
    }

    return <>
        <SmallCard headerTitle={"Projects"}>
            <p tabIndex={0}>
                Here are a few fun projects that I've worked on, the rest can be found on my <NewTabLink
                link={"https://github.com/cheemcheem"}>GitHub</NewTabLink>.
            </p>
        </SmallCard>
        <Card headerTitle={"rubik's cube solver"}
              headerSubtitle={<RubiksCubeDescription/>}
              footer={<RubiksCubeFooter/>}/>
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