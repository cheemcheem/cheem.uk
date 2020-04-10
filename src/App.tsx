import React, {useEffect, useState} from 'react';
import './App.css';
import Navigation from "./common/navigation";
import Page from "./common/page";
import Projects from "./pages/projects";
import {Page as PageType} from "./common/types";

function App() {
    const pageKey = "pageKey";
    const [page, setPage] = useState(() => localStorage.getItem(pageKey) as PageType || "Home");
    useEffect(() => localStorage.setItem(pageKey, page), [pageKey, page]);

    return (
        <div>
            <br/>
            <div className={"top-nav-container"}>
                <nav className={"nav nav-pills nav-justified"}
                     style={{display: "flex", flexDirection: "row", width: "60%", justifyContent: "space-around"}}>
                    <Navigation location={page} setLocation={setPage} targetLocation={"Home"}/>
                    <Navigation location={page} setLocation={setPage} targetLocation={"Projects"}/>
                    <Navigation location={page} setLocation={setPage} targetLocation={"About Me"}/>
                </nav>
            </div>
            <main style={{width: "100%"}}>
                <br/>
                <Page location={page} setLocation={setPage} targetLocation={"Projects"}>
                    <Projects/>
                </Page>
            </main>
        </div>
    );
}

export default App;
