import React, {Suspense} from 'react';
import './App.css';
import NavigationTab from "./components/NavigationTab";
import Page from "./components/Page";
import {LinkType, PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./components/NavigationDropDown";
import NavigationController from "./common/navigationController";

const Projects = React.lazy(() => import("./pages/Projects"));
const Links = React.lazy(() => import("./pages/Links"));

export default function App() {
    const {page, setPage, location, parentDiv, variableDiv, nav, setPageViaNav, setLocationViaNav} = NavigationController();

    //@formatter:off
    return <>
        <div className={"card-deck space-between container"}>
            <nav ref={nav} className={"side-nav"}>
                <ul>
                    <NavigationTab<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Home"}/>
                    <NavigationTab<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Projects"}/>
                    <NavigationDropDown visible={page === "Projects"}>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Rubik's Cube Solver"}/>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Energy Usage Tracker"}/>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"VCS Visualiser"}/>
                    </NavigationDropDown>
                    <NavigationTab<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Links"}/>
                    <NavigationDropDown visible={page === "Links"}>
                        <NavigationTab<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"web development links"}/>
                        <NavigationTab<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"general development links"}/>
                    </NavigationDropDown>
                </ul>
            </nav>
            <main>
                <Page location={page} setLocation={setPage} targetLocation={"Projects"}>
                    <Suspense fallback={<></>}>
                        <Projects parentRef={parentDiv} variableDivRef={variableDiv}/>
                    </Suspense>
                </Page>
                <Page location={page} setLocation={setPage} targetLocation={"Links"}>
                    <Suspense fallback={<></>}>
                        <Links parentRef={parentDiv} variableDivRef={variableDiv}/>
                    </Suspense>
                </Page>
            </main>
        </div>
    </>;
    //@formatter:on

}


