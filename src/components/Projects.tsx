import Card from "./subcomponents/Card";
import RepoLink from "./subcomponents/RepoLink";
import React from "react";
import NewTabLink from "./subcomponents/NewTabLink";
import HeaderCard from "./subcomponents/HeaderCard";

export default function Projects() {

    function HashTags(props: { hashtags: any[] }) {
        return <ul className={"hashtags"}>{props.hashtags.map(hashtag => <li>{hashtag}</li>)}</ul>;
    }

    const react = <NewTabLink mono link={"https://reactjs.org/"}>react</NewTabLink>;
    const reactB = <NewTabLink mono link={"https://github.com/brianzinn/react-babylonjs"}>react-babylonjs</NewTabLink>;
    const babylonJS = <NewTabLink mono link={"https://github.com/BabylonJS/Babylon.js"}>babylonjs</NewTabLink>;
    const webgl = <NewTabLink mono link={"https://get.webgl.org/"}>webgl</NewTabLink>;
    const springBoot = <NewTabLink mono link={"https://spring.io/projects/spring-boot"}>spring-boot</NewTabLink>;
    const jdk13 = <NewTabLink mono link={"https://openjdk.java.net/projects/jdk/13/"}>jdk-13</NewTabLink>;
    const jdk12 = <NewTabLink mono link={"https://openjdk.java.net/projects/jdk/12/"}>jdk-12</NewTabLink>;
    const java = <NewTabLink mono link={"https://www.java.com/en/"}>java</NewTabLink>;
    const cube = <NewTabLink mono link={"https://cube.cheem.uk"}>cube.cheem.uk</NewTabLink>;
    const maven = <NewTabLink mono link={"https://maven.apache.org/"}>maven</NewTabLink>;
    const gradle = <NewTabLink mono link={"https://gradle.org/"}>gradle</NewTabLink>;
    const lombok = <NewTabLink mono link={"https://projectlombok.org/"}>lombok</NewTabLink>;

    function RubiksCube() {
        return <>
            <p>
                I set out on this project to create a Rubik's cube game that works from within the browser.
                My motivations came from playing with my Rubik's cube and wanting to programmatically solve my cube
                using software that I wrote.
            </p>
            <p>
                I ended up creating a full-stack app, with a front-end for rendering the cube state and a back-end for
                handling user requests and updating the state of the cube.
            </p>
            <p>
                Seeing as the front-end seemed very state-dependant, I thought this would be a good opportunity to
                learn {react}, so I used a library called {reactB} that provided {react} components for the
                WebGL library {babylonJS}.
            </p>
            <p>
                For the back end, I used {springBoot} running on {jdk13} with an in-memory Hibernate database for
                handling sessions storage and cube state storage.
            </p>
            <p>
                As it stands now, I achieved most of my goals going into this project.
                You can browse to {cube} and see a 3D, manipulable, interactive Rubik's cube!
                It currently does not solve the cube by performing any special actions, it merely reverses the moves
                made so far until it reaches the last solved state!
            </p>
            <br/>
            <iframe title={"cube"} src={"https://cube.cheem.uk"} width={"100%"} height={500} frameBorder={0}/>
            <HashTags hashtags={[springBoot, jdk13, java, webgl, react, maven, lombok]}/>
        </>
    }

    function EnergyUsage() {
        return <>
            <p>
                This is a {springBoot} app that runs on {jdk13} and provides a RESTful API for tracking your household
                energy usage! I created this to get a grasp of how much energy I am spending on a monthly basis, as I
                still have one of those old top-up meters and have not yet been upgraded to a smart meter.
            </p>
            <p>
                To use this app, you are required to have a csv of date and balance columns. Once that csv is loaded
                into the app, it will show you information like average or total spending across a range of days, weeks,
                months, or years!
            </p>
            <p>
                This can be useful if you would like to determine your summer month spending, you could give a query
                like this <span className={"mono"}>
                    curl -X POST 'http://localhost:8080&#8203;/api&#8203;/average&#8203;/monthly&#8203;/between&#8203;?startDate=01/06/2020 00:00&#8203;&endDate=31/08/2020 23:59'
                </span>
                .
            </p>
            <p>
                Future plans for this project include allowing multiple users to use it at once and creating a {react}-based
                front-end interface.
            </p>

            <HashTags hashtags={[springBoot, jdk13, java, maven, lombok]}/>
        </>
    }


    const VCSVisualiser = <>
        <HashTags hashtags={[java, gradle, jdk12, lombok]}/>
    </>;


    return <>
        <HeaderCard header={"Projects"}>
            <p>
                Here are a few fun projects that I've worked on, the rest can be found on my <NewTabLink
                link={"https://github.com/cheemcheem"}>GitHub</NewTabLink>.
            </p>
        </HeaderCard>

        <Card headerTitle={"rubik's cube solver"}
              headerSubtitle={<div className={"card-deck space-between"}>
                  <RepoLink link={"rubiks-cube-solver"}/>
                  <NewTabLink link={"https://cube.cheem.uk"}>Live</NewTabLink>
              </div>}
              footer={<RubiksCube/>}/>

        <Card headerTitle={"energy usage tracker"}
              headerSubtitle={<RepoLink link={"energy-usage"}/>}
              footer={<EnergyUsage/>}/>

        <Card headerTitle={"vcs visualiser"}
              headerSubtitle={<RepoLink link={"vcs-history"}/>}
              footer={VCSVisualiser}/>

        <Card headerTitle={"cheem.uk"}
              headerSubtitle={<div className={"card-deck space-between"}>
                  <RepoLink link={"cheem.uk"}/>
                  <NewTabLink link={"https://cheem.uk"}>Live</NewTabLink>
              </div>}
              footer={<div style={{height: 1000}}>example</div>}/>
    </>;
}