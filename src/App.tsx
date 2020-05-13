import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavigationTab from "./components/NavigationTab";
import {LinkType, PageType, ProjectType} from "./common/types";
import NavigationDropDown from "./components/NavigationDropDown";
import NavigationController from "./common/navigationController";
import Page from "./components/Page";
// import Home from "./pages/Home";
// import Projects from "./pages/Projects";
// import Links from "./pages/Links";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Links = React.lazy(() => import("./pages/Links"));

export default function App() {
    const {
        page,
        setPage,
        subLocation,
        setSubLocation,
        setPageViaNav,
        setLocationViaNav,
        navScrolling,
        setNavScrolling,
        navAnimationFrameTicking,
        setNavAnimationFrameTicking,
        sideNavContainsNonActive,
        setSideNavContainsNonActive
    } = NavigationController();

    //@formatter:off
    return <>
        <Router>
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
                    <Switch>
                        <Suspense fallback={<></>}>
                            <Route exact path="/">
                                <Page location={page} setLocation={setPage} targetLocation={"Home"} getNavHeight={getNavHeight} navAnimationFrameTicking={navAnimationFrameTicking} navScrolling={navScrolling} setSideNavContainsNonActive={setSideNavContainsNonActive} setSubLocation={setSubLocation} sideNavContainsNonActive={sideNavContainsNonActive} subLocation={subLocation}>
                                        <Home/>
                                </Page>
                            </Route>
                            <Route path="/projects">
                                <Page location={page} setLocation={setPage} targetLocation={"Projects"} >
                                        <Projects/>
                                </Page>
                            </Route>
                            <Route path="/links">
                                <Page location={page} setLocation={setPage} targetLocation={"Links"} >
                                        <Links/>
                                </Page>
                            </Route>
                        </Suspense>
                    </Switch>

            </main>
        </div>
    </Router>
    </>;
    //@formatter:on

}


