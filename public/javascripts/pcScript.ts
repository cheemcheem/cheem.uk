window.onload = () => {

    const listOfPCs: HTMLCollection = document.getElementsByClassName("pc");
    const header: HTMLElement = document.getElementById("title");
    const searchBar: HTMLInputElement = <HTMLInputElement> document.getElementById("search");

    // Create status checker and update the statuses
    const statusChecker = new StatusChecker(header, listOfPCs);
    statusChecker.updateStatuses();

    // Create search handler for pc list and assign to the search bar
    SearchHandler.assignSearchHandler(searchBar, listOfPCs);

};


class StatusChecker {

    private readonly header: HTMLElement;
    private readonly listOfPCs: HTMLCollection;

    // For calculating the statistics
    private numberOfActive: number;
    private numberOfInactive: number;
    private totalNumber: number;

    constructor(header: HTMLElement, listOfPCs: HTMLCollection) {
        this.header = header;
        this.listOfPCs = listOfPCs;
        this.init()
    }

    private init() {
        this.numberOfActive = 0;
        this.numberOfInactive = 0;

        // List of pc table row elements
        this.totalNumber = this.listOfPCs.length;

    }

    /**
     * Update all status colours with retrieved statuses.
     */
    public updateStatuses = () => {

        // Loop through each lab machine in the PC list
        for (let i = 0; i < this.listOfPCs.length; i++) {

            // Get current table row info
            const pc = this.listOfPCs[i];
            const pcAddress = pc.children[0];
            const pcUsers = pc.children[1];

            // Update status each PC in the table
            this.getStatus(pcAddress)
                .then((foundUsers) => {

                    // PC is active
                    pc.classList.remove("inactive");
                    pc.classList.add("active");
                    this.numberOfActive++;

                    pcUsers.innerHTML = foundUsers;

                })
                .catch(() => {

                    // PC is inactive
                    pc.classList.remove("active");
                    pc.classList.add("inactive");
                    this.numberOfInactive++;

                    pcUsers.innerHTML = "N/A";

                })
                .finally(() => {

                    // Finally update header counts
                    const active = `${this.numberOfActive}/${this.totalNumber}`;
                    const notResponded = `${this.totalNumber - (this.numberOfActive + this.numberOfInactive)}`;

                    this.header.innerHTML = `List of PCS (active: ${active}) (still checking: ${notResponded})`

                });

        }

    };

    /**
     * Retrieve and set status of a pc.
     * @param pc {Element} Table Data element where innerHTML is the address of the pc to check.
     * @return {Promise<string | null>}
     */
    public getStatus: (pc: Element) => Promise<string> = (pc: Element) => {

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

}

class SearchHandler {

    private readonly searchBar: HTMLInputElement;
    private readonly listOfPCs: HTMLCollection;

    constructor(searchBar: HTMLInputElement, listOfPCs: HTMLCollection) {
        this.searchBar = searchBar;
        this.listOfPCs = listOfPCs;
        this.init()
    }

    private init() {
        /**
         * Runs search with new search bar value.
         */
        const onKeyUp = () => {
            this.findMatches(this.searchBar.value)
                .then((val) => {
                    console.log(val);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        this.searchBar.addEventListener("keyup", onKeyUp);
    }

    /**
     * Get list of PCs which have either an address or users that matches the search term.
     * @param term {string} Search string to find.
     * @returns {Promise<string>}
     */
    private findMatches: (term: string) => Promise<string> = (term: string) => {

        return new Promise((resolve, reject) => {

            // Set #pcTableBody to searching mode for css sorting of visibility
            const tableBody = document.getElementById("pcTableBody");
            tableBody.classList.add("searchMode");

            // PCs which match the search term
            let matchingPCs = [];

            // Create list of PCs which have term in either address or users
            for (let i = 0; i < this.listOfPCs.length; i++) {
                const pc = this.listOfPCs[i];
                const testMatch = this.checkMatch(pc, term);

                if (testMatch) {
                    matchingPCs.push(testMatch);

                }

            }

            if (matchingPCs.length > 0) {
                this.searchBar.classList.remove("inactive");
                resolve(`Found ${matchingPCs.length} matches.`);

            } else {
                tableBody.classList.remove("searchMode");
                this.searchBar.classList.add("inactive");
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
    private checkMatch: (pc: Element, term: string) => (Element | null) = (pc: Element, term: string) => {

        // Get current table row children in String form
        const pcAddress = String(pc.children[0].innerHTML);
        const pcUsers = String(pc.children[1].innerHTML);

        // Check if either match
        if (pcUsers.match(term) || pcAddress.match(term)) {
            pc.classList.add("matches");
            return pc;

        } else {
            pc.classList.remove("matches");
            return null;

        }

    };

    public static assignSearchHandler(searchBar: HTMLInputElement, listOfPCs: HTMLCollection): void {
        new SearchHandler(searchBar, listOfPCs);
    }

}



