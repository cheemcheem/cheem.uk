import React from "react";

type NavigationProps = {
    targetLocation: string,
    location: string,
    setLocation: (location: string) => void
}

function Navigation(props: NavigationProps) {
    const setLocationOnClick = () => props.setLocation(props.targetLocation);

    return <>
        <div className={"nav-item"} style={{cursor: "pointer"}} onClick={setLocationOnClick}>
            <span className={`nav-link site ${props.location === props.targetLocation ? "active" : ""}`}>
            {props.targetLocation}
        </span>
        </div>
    </>
}

export default Navigation;