window.onload = () => {
    getStatuses();
};

/**
 * Search bar
 * @type {HTMLInputElement}
 */
const searchBar = document.getElementById("search");

/**
 * Runs search with new search bar value.
 */
const onKeyUp = () => {
    findMatches(searchBar.value)
        .then((val) => {
            console.log(val);
        })
        .catch((error) => {
            console.error(error);
        });
};

searchBar.addEventListener("keyup", onKeyUp);

// For calculating the statistics
let numberOfActive = 0;
let numberOfInactive = 0;

// List of pc table row elements
const listOfPCs = document.getElementsByClassName("pc");
const totalNumber = listOfPCs.length;

// Title
const header = document.getElementById("title");

/**
 * Update all status colours with retrieved statuses.
 */
const getStatuses = () => {

    // Loop through each lab machine in the PC list
    for (let i = 0; i < listOfPCs.length; i++) {

        // Get current table row info
        const pc = listOfPCs[i];
        const pcAddress = pc.children[0];
        const pcUsers = pc.children[1];

        // Update status each PC in the table
        getStatus(pcAddress)
            .then((foundUsers) => {

                // PC is active
                pc.classList.remove("inactive");
                pc.classList.add("active");
                numberOfActive++;

                pcUsers.innerHTML = foundUsers;

            })
            .catch(() => {

                // PC is inactive
                pc.classList.remove("active");
                pc.classList.add("inactive");
                numberOfInactive++;

                pcUsers.innerHTML = "N/A";

            })
            .finally(() => {

                // Finally update header counts
                const active = `${numberOfActive}/${totalNumber}`;
                const notResponded = `${totalNumber - (numberOfActive + numberOfInactive)}`;

                header.innerHTML = `List of PCS (active: ${active}) (still checking: ${notResponded})`

            });

    }

};

/**
 * Retrieve and set status of a pc.
 * @param pc {Element} Table Data element where innerHTML is the address of the pc to check.
 */
const getStatus = (pc) => {

    return new Promise((resolve, reject) => {

        // Request object which will contain response object once loaded.
        const req = new XMLHttpRequest();
        const url = pc.innerHTML;

        /**
         * Once response is loaded, set list element to green if up and red if down.
         */
        const onResponseLoad = () => {
            const json = JSON.parse(req.responseText);
            if ("up" === json.status) {
                resolve(json.users);

            } else {
                reject();

            }

        };

        // Accept any state via onLoad method
        req.addEventListener("load", onResponseLoad);
        req.addEventListener("abort", onResponseLoad);
        req.addEventListener("error", onResponseLoad);

        // Send GET to url asynchronously so all can be sent at once
        req.open("GET", url, true);
        req.send(pc.innerHTML);

    });

};

/**
 * Get list of PCs which have either an address or users that matches the search term.
 * @param term {string} Search string to find.
 * @returns {Promise<string>}
 */
const findMatches = (term) => {

    return new Promise((resolve, reject) => {

        // Set #pcTableBody to searching mode for css sorting of visibility
        const tableBody = document.getElementById("pcTableBody");
        tableBody.classList.add("searchMode");

        // PCs which match the search term
        let matchingPCs = [];

        // Create list of PCs which have term in either address or users
        for (let i = 0; i < listOfPCs.length; i++) {
            const pc = listOfPCs[i];
            const testMatch = checkMatch(pc, term);

            if (testMatch) {
                matchingPCs.push(testMatch);

            }

        }

        if (matchingPCs.length > 0) {
            searchBar.classList.remove("inactive");
            resolve(`Found ${matchingPCs.length} matches.`);

        } else {
            tableBody.classList.remove("searchMode");
            searchBar.classList.add("inactive");
            reject("Empty List!");

        }

    });

};

/**
 * Check whether a given pc index matches the term and update classes inside of it accordingly.
 * @param pc {Element}
 * @param term {string}
 * @returns {Element | null}
 */
const checkMatch = (pc, term) => {

    // Get current table row children in String form
    const pcAddress = String(pc.children[0].innerHTML);
    const pcUsers = String(pc.children[1].innerHTML);

    // Check if either matchd
    if (pcUsers.match(term) || pcAddress.match(term)) {
        pc.classList.add("matches");
        return pc;

    } else {
        pc.classList.remove("matches");
        return null;

    }

};