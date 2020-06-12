import React, {Suspense} from 'react';
import './App.css';
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


const Nav = React.lazy(() => import('./components/Nav'));
const Main = React.lazy(() => import('./components/Main'));

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
                <Suspense fallback={<></>}>
                    <Nav/>
                    <Main/>
                </Suspense>
            </div>
        </ContextProviders>
    </>;
}


