import React, {useEffect, useState} from "react";
import {defaultLocation} from "../common/contexts";
import {LocationType, PageMapping} from "../common/types";
import useSavedState from "./useSavedState";

export default function useLocation(trigger: any, isMobile: boolean): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [location, setLocation] = useState(defaultLocation);
    useEffect(() => {
        /**
         * Sets the location when the body is scrolled or the page is changed.
         *
         * Only runs when the trigger is changed.
         * This solves issues with page switching not updating the location.
         * There is also the dependency on location so that it can default back to the previous location when scrolling
         * above or below bounds.
         * The ticking of this method is handled through the ticking of the other useEffect.
         */
        const ids: LocationType[] = [];
        PageMapping.forEach(locations => locations.forEach(location => ids.push(location)));
        const setLocationBasedOnScroll = () => {
            const orderedLocations = ids.map(id => document.getElementById(id)) // map to elements
                .filter(el => el) // find elements that are on screen (remove nulls)
                .map(el => el as HTMLElement) // let the type system know that all elements are not null
                .sort((el1, el2) => el1.offsetTop > el2.offsetTop ? 1 : -1) // sort by distance from top

            // find closest to top that is on the screen
            const match = orderedLocations.find(element => {
                const rect = element.getBoundingClientRect();
                const topOfMatch = element.offsetTop;
                const bottomOfMatch = topOfMatch + rect.bottom;
                const topOfWindow = window.scrollY;
                const bottomOfWindow = topOfWindow + window.innerHeight;
                return (topOfMatch >= topOfWindow && topOfMatch <= bottomOfWindow)
                    || (bottomOfMatch >= topOfWindow && bottomOfMatch <= bottomOfWindow)
            });
            if (!match) {
                // the current page isn't rendered on the dom
                return window.requestAnimationFrame(setLocationBasedOnScroll);
            }
            setLocation(match.id);
        }
        window.requestAnimationFrame(setLocationBasedOnScroll);
    }, [trigger]);

    const [targetLocation, setTargetLocation] = useSavedState(defaultLocation, "location");
    useEffect(() => {
        const waitForPageLoad = () => {
            window.requestAnimationFrame(() => {
                const found = document.getElementById(targetLocation);
                if (!found) {
                    return waitForPageLoad();
                }

                let target = found!.offsetTop;
                if (isMobile) {
                    const nav = document.getElementById("nav")!;
                    target -= nav.getBoundingClientRect().height + 2;
                }
                window.scrollTo({top: target, behavior: "smooth"});
            });
        };
        waitForPageLoad();
    }, [targetLocation, isMobile]);

    useEffect(() => {
        const setTargetToCurrent = () => setTargetLocation(location);

        window.addEventListener("beforeunload", setTargetToCurrent);

        return () => window.removeEventListener("beforeunload", setTargetToCurrent);
    }, [setTargetLocation, location]);

    return [location, setTargetLocation];
}