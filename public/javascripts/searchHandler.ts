export class SearchHandler {

    private readonly searchBar: HTMLInputElement;
    private readonly listOfPCs: HTMLCollection;

    private constructor(searchBar: HTMLInputElement, listOfPCs: HTMLCollection) {
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
                .then((ignored) => {
                })
                .catch((ignored) => {
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

            // Set #views to searching mode for css sorting of visibility
            const views = document.getElementById("views");
            views.classList.add("searchMode");

            if (term.length === 0) {
                views.classList.remove("searchMode");
                return reject("Empty List!");
            }

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
                return resolve(`Found ${matchingPCs.length} matches.`);

            } else {
                views.classList.remove("searchMode");
                this.searchBar.classList.add("inactive");
                return reject("Empty List!");

            }

        });

    };

    /**
     * Update a pc element's class depending of it it matches search or not.
     * @param pc {Element}
     * @param term {string}
     * @returns {Element | null}
     */
    private checkMatch: (pc: Element, term: string) => (Element | null) = (pc: Element, term: string) => {

        // Get current table row children in String form
        const pcAddress = String(pc.children[0].innerHTML);
        const pcUsers = String(pc.children[1].innerHTML);
        const pcRect = document.getElementById(`svg-${pcAddress}`);
        // Check if either match
        if (pcUsers.match(term) || pcAddress.match(term)) {
            pc.classList.add("matches");

            //todo remove once added all svg versions
            if (pcRect) pcRect.classList.add("matches");
            return pc;

        } else {
            pc.classList.remove("matches");

            //todo remove once added all svg versions
            if (pcRect) pcRect.classList.remove("matches");
            return null;

        }

    };

    public static assignSearchHandler(searchBar: HTMLInputElement, listOfPCs: HTMLCollection): void {
        new SearchHandler(searchBar, listOfPCs);
    }

}