import React, {Suspense} from 'react';
import './App.css';
import Navigation from "./subcomponents/navigation";
import Page from "./subcomponents/page";
import {LinkType, PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./subcomponents/navigationDropDown";
import AppNavigationHandler from "./common/appNavigationHandler";

const Projects = React.lazy(() => import("./pages/projects"));
const Links = React.lazy(() => import("./pages/links"));

export default function App() {
    const {page, setPage, location, parentDiv, variableDiv, nav, setPageViaNav, setLocationViaNav} = AppNavigationHandler();

    //@formatter:off
    return <>
        <div className={"card-deck space-between container"}>
            <nav ref={nav} className={"side-nav"}>
                <ul>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Home"}/>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Projects"}/>
                    <NavigationDropDown visible={page === "Projects"}>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Rubik's Cube Solver"}/>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"Energy Usage Tracker"}/>
                        <Navigation<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"VCS Visualiser"}/>
                    </NavigationDropDown>
                    <Navigation<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Links"}/>
                    <NavigationDropDown visible={page === "Links"}>
                        <Navigation<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"web development links"}/>
                        <Navigation<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"general development links"}/>
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


