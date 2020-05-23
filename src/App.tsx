import React from 'react';
import './App.css';
import Page from "./components/Page";
import Nav from "./components/Nav";
import {
    DarkModeContext,
    defaultIsDarkMode,
    defaultIsMobile,
    LocationContext,
    NavContext,
    PageContext
} from "./common/contexts";
import useMediaQuery from "./hooks/useMediaQuery";
import useScrollDiff from "./hooks/useScrollDiff";
import useLocation from "./hooks/useLocation";
import useIsNavBarLarge from "./hooks/useIsNavBarLarge";
import {ReactChildren} from "./common/types";
import usePage from "./hooks/usePage";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Links = React.lazy(() => import("./pages/Links"));

function ContextProviders(props: ReactChildren) {
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)", defaultIsDarkMode);
    const isMobile = useMediaQuery("(max-width: 750px)", defaultIsMobile)
    const scrollDiff = useScrollDiff();
    const isNavBarLarge = useIsNavBarLarge(scrollDiff);
    const [page, setPage] = usePage();
    const [location, setTargetLocation] = useLocation({scrollDiff, page}, isMobile);

    return <>
        <PageContext.Provider value={{page, setPage}}>
            <DarkModeContext.Provider value={isDarkMode}>
                <NavContext.Provider value={{isMobile, isNavBarLarge}}>
                    <LocationContext.Provider value={{location, setTargetLocation}}>
                        {props.children}
                    </LocationContext.Provider>
                </NavContext.Provider>
            </DarkModeContext.Provider>
        </PageContext.Provider>
    </>;
}

export default function App() {
    return <>
        <ContextProviders>
            <div className={"card-deck space-between container"}>
                <Nav/>
                <main>
                    <Page targetPage={"Home"}><Home/></Page>
                    <Page targetPage={"Projects"}><Projects/></Page>
                    <Page targetPage={"Links"}><Links/></Page>
                </main>
            </div>
        </ContextProviders>
    </>;
}


