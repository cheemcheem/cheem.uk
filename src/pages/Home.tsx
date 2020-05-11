import React, {useEffect, useState} from 'react';
import SmallCard from "../components/SmallCard";
import NewTabLink from "../components/NewTabLink";

export default function Home() {

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const switchColourScheme = () => setIsDarkMode(!isDarkMode);
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

        // use deprecated api if current api is not supported
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", switchColourScheme);
        } else {
            mediaQuery.addListener(switchColourScheme);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", switchColourScheme);
            } else {
                mediaQuery.removeListener(switchColourScheme);
            }
        }
    }, [isDarkMode])

    return <>
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
        <SmallCard headerTitle={"Kathan Cheema"}>
            <h4>Welcome to my web page.</h4>
        </SmallCard>
        <div className={"card"} style={{background: "unset", flex: "unset", fontSize: "var(--smallest-font-size)"}}>
            <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave
                Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    </>;
}