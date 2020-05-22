import React from 'react';
import SmallCard from "../components/SmallCard";
import NewTabLink from "../components/NewTabLink";
import {DarkModeContext} from '../common/contexts';


export default function Home() {
    return <>
        <DarkModeContext.Consumer>
            {isDarkMode => <>
                <div className={"card-deck"}>
                    <div className={"card-deck space-between card"}>
                        <NewTabLink link={"https://github.com/cheemcheem"}>
                            <img style={{padding: "5px"}} className={"onclick"}
                                 src={`github-logo${isDarkMode ? "-light" : ""}.svg`}
                                 width={"30px"} height={"30px"}
                                 alt={"GitHub Logo"}/>
                        </NewTabLink>
                        <NewTabLink link={"https://linkedin.com/in/kathancheema"}>
                            <img style={{padding: "5px"}} className={"onclick"}
                                 src={`linkedin-logo${isDarkMode ? "-light" : ""}.svg`}
                                 width={"30px"} height={"30px"}
                                 alt={"LinkedIn Logo"}/>
                        </NewTabLink>
                    </div>
                </div>
            </>}
        </DarkModeContext.Consumer>
        <SmallCard headerTitle={"Kathan Cheema"}>
            <h4 id={"About Me"}>Welcome to my web page.</h4>
        </SmallCard>
        <div className={"card"} style={{background: "unset", flex: "unset", fontSize: "var(--smallest-font-size)"}}>
            <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave
                Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    </>;
}