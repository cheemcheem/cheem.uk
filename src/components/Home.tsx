import React, {Suspense} from 'react';
import SmallCard from "./subcomponents/SmallCard";
import NewTabLink from "./subcomponents/NewTabLink";
import HeaderCard from "./subcomponents/HeaderCard";

const GitHubLogo = React.lazy(() => import("./subcomponents/svg/GitHubLogo"));
const LinkedInLogo = React.lazy(() => import("./subcomponents/svg/LinkedInLogo"));

export default function Home() {
    function Social() {
        return <div className={"card-deck"}>
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
    }

    return <>
        <div className={"card-deck-horizontal space-between"} style={{height: "100vh"}}>
            <div>
                <HeaderCard header={"Kathan Cheema"}>
                    <p>
                        Welcome to my web page! Here you can find a few of my highlighted projects, links to my GitHub
                        and
                        LinkedIn, and some other links I found to be useful.
                    </p>
                </HeaderCard>
                <SmallCard id={"about me"} headerTitle={"About Me"}>
                    <span>
                        <p>
                            Hi there! This section is in development, please have a look at the Projects or Useful Links areas instead!
                        </p>
                    </span>
                </SmallCard>
            </div>

            <div>
                <Social/>
                <div className={"card"}
                     style={{background: "unset", flex: "unset", fontSize: "var(--smallest-font-size)"}}>
                    <div>Icons made by <NewTabLink link="https://www.flaticon.com/authors/dave-gandy">Dave
                        Gandy</NewTabLink> from <NewTabLink link="https://www.flaticon.com/"
                                                            title="Flaticon">www.flaticon.com</NewTabLink></div>
                </div>
            </div>
        </div>
    </>;
}