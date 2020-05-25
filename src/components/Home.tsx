import React, {Suspense} from 'react';
import SmallCard from "./subcomponents/SmallCard";
import NewTabLink from "./subcomponents/NewTabLink";

const GitHubLogo = React.lazy(() => import("./subcomponents/svg/GitHubLogo"));
const LinkedInLogo = React.lazy(() => import("./subcomponents/svg/LinkedInLogo"));

export default function Home() {
    return <>
        <div className={"card-deck"}>
            <div className={"card-deck space-between card"}>
                <NewTabLink link={"https://github.com/cheemcheem"}>
                    <div style={{padding: "5px", width: "30px", height: "30px"}} className={"onclick"}>
                        <Suspense fallback={<></>}>
                            <GitHubLogo/>
                        </Suspense>
                    </div>
                </NewTabLink>
                <NewTabLink link={"https://linkedin.com/in/kathancheema"}>
                    <div style={{padding: "5px", width: "30px", height: "30px"}} className={"onclick"}>
                        <Suspense fallback={<></>}>
                            <LinkedInLogo/>
                        </Suspense>
                    </div>
                </NewTabLink>
            </div>
        </div>
        <SmallCard id={"about me"} headerTitle={"Kathan Cheema"}>
            <span tabIndex={0}>
                <p>
                    <span>Welcome to my web page!</span>
                </p>
                <p>
                    <span>Here you can find a few of my highlighted projects, links to my GitHub and LinkedIn, and some other links I found to be useful.</span>
                </p>
            </span>
        </SmallCard>
        <div className={"card"} style={{background: "unset", flex: "unset", fontSize: "var(--smallest-font-size)"}}>
            <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave
                Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    </>;
}