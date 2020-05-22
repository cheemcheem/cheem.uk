import React from 'react';
import './App.css';
import Page from "./components/Page";
import Nav from "./components/Nav";
import {
    DarkModeContext,
    defaultIsDarkMode,
    defaultIsMobile,
    defaultPage,
    NavContext,
    PageContext
} from "./common/contexts";
import useMediaQuery from "./hooks/useMediaQuery";
import useScrollDiff from "./hooks/useScrollDiff";
import useLocation from "./hooks/useLocation";
import useIsNavBarLarge from "./hooks/useIsNavBarLarge";
import useSavedState from "./hooks/useSavedState";

const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Links = React.lazy(() => import("./pages/Links"));

export default function App() {

    const [page, setPage] = useSavedState(defaultPage, "page");
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)", defaultIsDarkMode);
    const isMobile = useMediaQuery("(max-width: 750px)", defaultIsMobile)
    const scrollDiff = useScrollDiff();
    const location = useLocation({scrollDiff, page});
    const isNavBarLarge = useIsNavBarLarge(scrollDiff);

    return <>
        <PageContext.Provider value={{page, setPage}}>
            <div className={"card-deck space-between container"}>
                <NavContext.Provider value={{isMobile, isNavBarLarge, location}}>
                    <Nav/>
                </NavContext.Provider>
                <DarkModeContext.Provider value={isDarkMode}>
                    <main>
                        <Page targetPage={"Home"}><Home/></Page>
                        <Page targetPage={"Projects"}><Projects/></Page>
                        <Page targetPage={"Links"}><Links/></Page>
                    </main>
                </DarkModeContext.Provider>
            </div>
        </PageContext.Provider>
    </>;

}


