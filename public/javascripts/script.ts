import {MapHandler} from "./mapHandler";
import {SearchHandler} from "./searchHandler";
import {StatusHandler} from "./statusHandler";
import {RoomStore} from "../../shared/interfaces/roomStore";

const getData: () => Promise<RoomStore | Error> = () => {
    return new Promise((resolve, reject) => {
        // Request object which will contain response object once loaded.
        const req = new XMLHttpRequest();

        /**
         * Once response is loaded, set list element to green if up and red if down.
         */
        const onResponseLoad = () => {
            try {
                const json: RoomStore = JSON.parse(req.responseText);
                resolve(json);

            } catch (e) {
                reject(e);

            }

        };

        // Accept any state via onLoad method
        req.addEventListener("load", onResponseLoad);
        req.addEventListener("abort", onResponseLoad);
        req.addEventListener("error", onResponseLoad); //todo change this as indicates connection issue to server not pc

        // Send GET to url asynchronously so all can be sent at once
        req.open("GET", "info/all", true);
        req.send();

    });
};

const loadRoomsToDOM: (roomStore: RoomStore) => Promise<{}> = (roomStore: RoomStore) => {

    const currentPc = document.getElementById("current-pc");
    const currentUsers = document.getElementById("current-users");
    const listOfPCs: HTMLCollection = document.getElementsByClassName("pc");

    
    return Promise.all([
        MapHandler.applyCanvas(roomStore.JH105Info, document.querySelector("#JH105"), currentPc, currentUsers, listOfPCs),
        MapHandler.applyCanvas(roomStore.JH103Info, document.querySelector("#JH103"), currentPc, currentUsers, listOfPCs),
        MapHandler.applyCanvas(roomStore.MorrisonInfo, document.querySelector("#Morrison"), currentPc, currentUsers, listOfPCs),
        MapHandler.applyCanvas(roomStore.JH110Info, document.querySelector("#JH110"), currentPc, currentUsers, listOfPCs),
        MapHandler.applyCanvas(roomStore.JC035Info, document.querySelector("#JC035"), currentPc, currentUsers, listOfPCs)
    ]);
};

getData()
    .then((roomStore: RoomStore) => loadRoomsToDOM(roomStore))
    .then(() => {
        const listOfPCs: HTMLCollection = document.getElementsByClassName("pc");
        const header: HTMLElement = document.getElementById("title");
        const searchBar: HTMLInputElement = document.getElementById("search") as HTMLInputElement;

        // Create status checker and update the statuses
        const statusChecker = new StatusHandler(header, listOfPCs);
        statusChecker.updateStatuses();

        // Create search handler for pc list and assign to the search bar
        SearchHandler.assignSearchHandler(searchBar, listOfPCs);

        // Set up drop down
        const svgs = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "svg");
        const pcList = document.getElementById("List");
        const list: Element[] = [];
        for (let i = 0; i < svgs.length; i++) {
            list.push(svgs[i]);
        }
        list.push(pcList);

        const dropdown = document.getElementById("labSelector") as HTMLSelectElement;

        const showOption = (visibleValue: string) => {
            let found = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === visibleValue) {
                    list[i].classList.add("visible");
                    found = true;
                } else {
                    list[i].classList.remove("visible");
                }
            }
            return found;
        };

        if (window.location.hash !== "") {
            const roomName = window.location.hash.split("#")[1];
            if (showOption(roomName)) {
                dropdown.value = roomName;
            }
        }

        dropdown.addEventListener("change", () => {
            window.location.hash = dropdown.value;
            const selectedRoomName = dropdown.value;
            showOption(selectedRoomName);
        });


    })
    .catch(onerror => {
        console.error(onerror);
    });

