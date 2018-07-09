// import {Context} from "vm";

window.onload = () => {

    const silentLabCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("JH105");
    CanvasHandler.applyCanvas(silentLabsInfo, silentLabCanvas);


    const listOfPCs: HTMLCollection = document.getElementsByClassName("pc");
    const header: HTMLElement = document.getElementById("title");
    const searchBar: HTMLInputElement = <HTMLInputElement> document.getElementById("search");

    // Create status checker and update the statuses
    const statusChecker = new StatusHandler(header, listOfPCs);
    statusChecker.updateStatuses();

    // Create search handler for pc list and assign to the search bar
    SearchHandler.assignSearchHandler(searchBar, listOfPCs);

};


class StatusHandler {

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
            StatusHandler.getStatus(pcAddress.innerHTML)
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
     * @param pc {string} The address of the pc to check.
     * @return {Promise<string | null>}
     */
    public static getStatus: (pc: string) => Promise<string> = (pc: string) => {

        return new Promise((resolve, reject) => {

            // Request object which will contain response object once loaded.
            const req = new XMLHttpRequest();

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
            req.open("GET", pc, true);
            req.send(pc);

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


class CanvasHandler {

    static applyCanvas(labRoom: LabRoom, canvasElement: HTMLCanvasElement) {

        canvasElement.height = labRoom.height + 100;
        canvasElement.width = labRoom.width;
        canvasElement.style.color = labRoom.color;

        const machines: LabMachine[] = labRoom.machines;

        console.table(machines);

        const context: CanvasRenderingContext2D = canvasElement.getContext("2d");
        for (let i = 0; i < machines.length; i++) {
            const machine: LabMachine = machines[i];


            context.fillStyle = "rgb(200, 0, 0)";
            context.fillRect(
                machine.x,
                machine.y,
                machine.width,
                machine.height
            );

            context.fillStyle = "rgb(255, 255, 255)";
            context.fillRect(
                machine.x + 1,
                machine.y + 1,
                machine.width - 2,
                machine.height - 2
            );

            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText(machine.name, machine.x + 10, machine.y + machine.height / 2 + 3, machine.width);
        }

        context.fillStyle = "rgb(0, 0, 0)";
        context.fillText(labRoom.name, 0, canvasElement.height - 50);

    }

}


interface Canvas {

    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly color: string;

}


abstract class LabMachine implements Canvas {

    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly color: string;

    readonly x: number;
    readonly y: number;


    protected constructor(name: string, width: number, height: number, color: string, x: number, y: number) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }


}

class SkinnyMachine extends LabMachine {

    static readonly width: number = 100;
    static readonly height: number = 40;

    constructor(name: string, color: string, x: number, y: number) {
        super(name, SkinnyMachine.width, SkinnyMachine.height, color, x, y);
    }

}

class ThiccMachine extends LabMachine {

    static readonly width: number = 100;
    static readonly height: number = 80;

    constructor(name: string, color: string, x: number, y: number) {
        super(name, ThiccMachine.width, ThiccMachine.height, color, x, y);
    }

}


interface LabRoom extends Canvas {
    readonly machines: LabMachine[];
}


const silentLabsInfo: LabRoom = {

    color: "white",
    height: 12 * SkinnyMachine.height,
    name: "Silent Labs",
    width: 9 * SkinnyMachine.width,
    machines: [
        new SkinnyMachine("pc2-033", "white", 0, 0),
        new SkinnyMachine("pc5-001", "white", SkinnyMachine.width, 0),
        new SkinnyMachine("pc5-002", "white", SkinnyMachine.width * 2, 0),
        new SkinnyMachine("pc5-003", "white", SkinnyMachine.width * 3, 0),
        new SkinnyMachine("pc5-004", "white", SkinnyMachine.width * 4, 0),
        new SkinnyMachine("pc5-005", "white", SkinnyMachine.width * 5, 0),
        new SkinnyMachine("pc5-011", "white", SkinnyMachine.width * 6, 0),
        new SkinnyMachine("pc5-012", "white", SkinnyMachine.width * 7, 0),
        new SkinnyMachine("pc5-013", "white", SkinnyMachine.width * 8, 0),

        new SkinnyMachine("pc5-020", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-019", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-018", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-017", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-016", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-015", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 3),
        new SkinnyMachine("pc5-014", "white", SkinnyMachine.width * 8, SkinnyMachine.height * 3),

        new SkinnyMachine("pc2-015", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-010", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-147", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-083", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-041", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-044", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 4),
        new SkinnyMachine("pc2-021", "white", SkinnyMachine.width * 8, SkinnyMachine.height * 4),

        new SkinnyMachine("pc2-034", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 7),
        new SkinnyMachine("pc2-038", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 7),
        new SkinnyMachine("pc2-141", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 7),
        new SkinnyMachine("pc2-132", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 7),
        new SkinnyMachine("pc2-019", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 7),
        new SkinnyMachine("pc2-001", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 7),

        new SkinnyMachine("pc2-007", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 8),
        new SkinnyMachine("pc2-048", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 8),
        new SkinnyMachine("pc2-130", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 8),
        new SkinnyMachine("pc2-024", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 8),
        new SkinnyMachine("pc2-016", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 8),
        new SkinnyMachine("pc2-022", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 8),


        new SkinnyMachine("pc2-002", "white", 0, SkinnyMachine.height * 9),

        new SkinnyMachine("pc2-043", "white", 0, SkinnyMachine.height * 10),

        new SkinnyMachine("pc2-013", "white", 0, SkinnyMachine.height * 11),
        new SkinnyMachine("pc2-051", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 11),
        new SkinnyMachine("pc2-077", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 11),
        new SkinnyMachine("pc2-008", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 11),
        new SkinnyMachine("pc2-030", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 11),

    ]


};


