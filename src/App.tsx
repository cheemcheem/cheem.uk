import React from 'react';
import './App.css';
import NavigationTab from "./components/NavigationTab";
import Page from "./components/Page";
import {LinkType, PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./components/NavigationDropDown";
import NavigationController from "./common/navigationController";

const Home = React.lazy(() => import("./pages/Home"));
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
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"rubik's cube solver"}/>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"energy usage tracker"}/>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"vcs visualiser"}/>
                        <NavigationTab<ProjectType> location={location} setLocation={setLocationViaNav} targetLocation={"cheem.uk"}/>
                    </NavigationDropDown>
                    <NavigationTab<PageType> location={page} setLocation={setPageViaNav} targetLocation={"Links"}/>
                    <NavigationDropDown visible={page === "Links"}>
                        <NavigationTab<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"web development links"}/>
                        <NavigationTab<LinkType> location={location} setLocation={setLocationViaNav} targetLocation={"general development links"}/>
                    </NavigationDropDown>
                </ul>
            </nav>
            <main>
                <Page location={page} setLocation={setPage} targetLocation={"Home"} parentRef={parentDiv} variableDivRef={variableDiv}>
                        <Home/>
                </Page>
                <Page location={page} setLocation={setPage} targetLocation={"Projects"} parentRef={parentDiv} variableDivRef={variableDiv}>
                        <Projects/>
                </Page>
                <Page location={page} setLocation={setPage} targetLocation={"Links"} parentRef={parentDiv} variableDivRef={variableDiv}>
                        <Links/>
                </Page>
            </main>
        </div>
    </>;
    //@formatter:on

}


