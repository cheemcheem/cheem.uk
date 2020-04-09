import React, {useState} from 'react';
import './App.css';
import Navigation from "./common/navigation";
import Page from "./common/page";
import Card from "./subcomponents/cards";

function App() {
    const [location, setLocation] = useState("Home");
    return (
        <div className="App">
            <br/>
            <nav className={"nav nav-pills nav-justified"}>
                <Navigation location={location} setLocation={setLocation} targetLocation={"Home"}/>
                <Navigation location={location} setLocation={setLocation} targetLocation={"Projects"}/>
                <Navigation location={location} setLocation={setLocation} targetLocation={"About Me"}/>
            </nav>
            <br/>
            <main>
                <Page location={location} setLocation={setLocation} targetLocation={"Projects"}>
                    <Card headerTitle={"Rubik's Cube"}
                          headerSubtitle={"in BabylonJS/React"}
                          footer={
                              <iframe title={"cube"} src={"https://cube.cheem.uk"} width={"100%"} height={500}
                                      frameBorder={0}/>
                          }/>
                </Page>

            </main>
        </div>
    );
}

export default App;
