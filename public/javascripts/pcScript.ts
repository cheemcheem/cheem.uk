window.onload = () => {

    MapHandler.applyCanvas(JH105Info, document.querySelector("#JH105"));

    const listOfPCs: HTMLCollection = document.getElementsByClassName("pc");
    const header: HTMLElement = document.getElementById("title");
    const searchBar: HTMLInputElement = document.getElementById("search") as HTMLInputElement;

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

        // @ts-ignore
        const lab = document.getElementById(document.querySelector("svg.visible").id);

        // Loop through each lab machine in the PC list
        for (let i = 0; i < this.listOfPCs.length; i++) {

            // Get current table row info
            const tablePC = this.listOfPCs[i];
            const tablePCAddress = tablePC.children[0];
            const tablePCUsers = tablePC.children[1];

            const id = "svg-" + tablePCAddress.innerHTML;

            // @ts-ignore
            const svgPCText = lab.getElementById(id);

            //todo remove
            if (!svgPCText) continue;
            // Update status each PC in the table
            StatusHandler.getStatus(tablePCAddress.innerHTML)
                .then((foundUsers) => {

                    // PC is active
                    tablePC.classList.remove("inactive");
                    tablePC.classList.add("active");
                    tablePCUsers.innerHTML = foundUsers;

                    svgPCText.classList.remove("inactive");
                    svgPCText.classList.add("active");

                    this.numberOfActive++;

                })
                .catch((e) => {
                    // PC is inactive
                    tablePC.classList.remove("active");
                    tablePC.classList.add("inactive");

                    svgPCText.classList.remove("active");
                    svgPCText.classList.add("inactive");

                    this.numberOfInactive++;
                    tablePCUsers.innerHTML = "N/A";

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
                try {
                    const json = JSON.parse(req.responseText);
                    if ("up" === json.status) {
                        resolve(json.users);

                    } else {
                        reject(`not up ${pc}`);

                    }

                } catch (e) {
                    reject(e + pc);

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

class MapHandler {

    static applyCanvas(labRoom: LabRoom, roomSVG: SVGElement) {
        const svgNS = "http://www.w3.org/2000/svg";

        roomSVG.style.color = labRoom.color;
        roomSVG.style.width = labRoom.width.toString();
        roomSVG.style.height = labRoom.height.toString();

        const machines: LabMachineDetails[] = labRoom.machines;

        for (let i = 0; i < machines.length; i++) {
            const machine: LabMachineDetails = machines[i];

            const rect: SVGGraphicsElement = document.createElementNS(svgNS, "rect");
            rect.setAttributeNS(null, 'x', String(machine.x));
            rect.setAttributeNS(null, 'y', String(machine.y));
            rect.setAttributeNS(null, 'height', String(machine.height));
            rect.setAttributeNS(null, 'width', String(machine.width));
            rect.setAttributeNS(null, 'fill', machine.color);
            rect.setAttributeNS(null, 'stroke', "black");
            rect.setAttributeNS(null, 'stroke-linecap', "square");
            rect.setAttributeNS(null, 'stroke-opacity', "1");
            rect.setAttributeNS(null, 'fill-opacity', "0.7");

            const font: SVGTextElement = document.createElementNS(svgNS, "text");
            font.setAttributeNS(null, 'x', String(machine.x + machine.width / 2));
            font.setAttributeNS(null, 'y', String(machine.y + machine.height / 2));
            font.setAttributeNS(null, 'text-anchor', "middle");
            font.setAttributeNS(null, 'alignment-baseline', "central");
            font.style.font = "10px sans-serif";
            font.innerHTML = machine.name;
            font.id = "svg-" + machine.name;

            roomSVG.appendChild(rect);
            roomSVG.appendChild(font);

        }

    }

}

interface LabVisualObject {

    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly color: string;

}


interface Lab extends LabVisualObject {
    readonly machines: LabMachineDetails[];
}

class LabRoom implements Lab {
    private readonly _color: string;
    private readonly _height: number;
    private readonly _machines: LabMachineDetails[];
    private readonly _name: string;
    private readonly _width: number;

    constructor(color: string, height: number, machines: LabMachineDetails[], name: string, width: number) {
        this._color = color;
        this._height = height;
        this._machines = machines;
        this._name = name;
        this._width = width;
    }


    get color(): string {
        return this._color;
    }

    get height(): number {
        return this._height;
    }

    get machines(): LabMachineDetails[] {
        return this._machines;
    }

    get name(): string {
        return this._name;
    }

    get width(): number {
        return this._width;
    }
}


abstract class LabMachineDetails implements LabVisualObject {

    private readonly _name: string;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _color: string;

    private readonly _x: number;
    private readonly _y: number;


    protected constructor(name: string, width: number, height: number, color: string, x: number, y: number) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
    }


    get name(): string {
        return this._name;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get color(): string {
        return this._color;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}

class SkinnyMachine extends LabMachineDetails {

    static readonly width: number = 100;
    static readonly height: number = 40;

    constructor(name: string, color: string, x: number, y: number) {
        super(name, SkinnyMachine.width, SkinnyMachine.height, color, x, y);
    }

}

class ThiccMachine extends LabMachineDetails {

    static readonly width: number = 100;
    static readonly height: number = 80;

    constructor(name: string, color: string, x: number, y: number) {
        super(name, ThiccMachine.width, ThiccMachine.height, color, x, y);
    }

}


const JH105Machines = [
    new SkinnyMachine("pc2-033-l", "white", 0, 0),
    new SkinnyMachine("pc5-001-l", "white", SkinnyMachine.width, 0),
    new SkinnyMachine("pc5-002-l", "white", SkinnyMachine.width * 2, 0),
    new SkinnyMachine("pc5-003-l", "white", SkinnyMachine.width * 3, 0),
    new SkinnyMachine("pc5-004-l", "white", SkinnyMachine.width * 4, 0),
    new SkinnyMachine("pc5-005-l", "white", SkinnyMachine.width * 5, 0),
    new SkinnyMachine("pc5-011-l", "white", SkinnyMachine.width * 6, 0),
    new SkinnyMachine("pc5-012-l", "white", SkinnyMachine.width * 7, 0),
    new SkinnyMachine("pc5-013-l", "white", SkinnyMachine.width * 8, 0),

    new SkinnyMachine("pc5-020-l", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-019-l", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-018-l", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-017-l", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-016-l", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-015-l", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 3),
    new SkinnyMachine("pc5-014-l", "white", SkinnyMachine.width * 8, SkinnyMachine.height * 3),

    new SkinnyMachine("pc2-015-l", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-010-l", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-147-l", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-083-l", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-041-l", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-044-l", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 4),
    new SkinnyMachine("pc2-021-l", "white", SkinnyMachine.width * 8, SkinnyMachine.height * 4),

    new SkinnyMachine("pc2-034-l", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 7),
    new SkinnyMachine("pc2-038-l", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 7),
    new SkinnyMachine("pc2-141-l", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 7),
    new SkinnyMachine("pc2-132-l", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 7),
    new SkinnyMachine("pc2-019-l", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 7),
    new SkinnyMachine("pc2-001-l", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 7),

    new SkinnyMachine("pc2-007-l", "white", SkinnyMachine.width * 2, SkinnyMachine.height * 8),
    new SkinnyMachine("pc2-048-l", "white", SkinnyMachine.width * 3, SkinnyMachine.height * 8),
    new SkinnyMachine("pc2-130-l", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 8),
    new SkinnyMachine("pc2-024-l", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 8),
    new SkinnyMachine("pc2-016-l", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 8),
    new SkinnyMachine("pc2-022-l", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 8),


    new SkinnyMachine("pc2-002-l", "white", 0, SkinnyMachine.height * 9),

    new SkinnyMachine("pc2-043-l", "white", 0, SkinnyMachine.height * 10),

    new SkinnyMachine("pc2-013-l", "white", 0, SkinnyMachine.height * 11),
    new SkinnyMachine("pc2-051-l", "white", SkinnyMachine.width * 4, SkinnyMachine.height * 11),
    new SkinnyMachine("pc2-077-l", "white", SkinnyMachine.width * 5, SkinnyMachine.height * 11),
    new SkinnyMachine("pc2-008-l", "white", SkinnyMachine.width * 6, SkinnyMachine.height * 11),
    new SkinnyMachine("pc2-030-l", "white", SkinnyMachine.width * 7, SkinnyMachine.height * 11),

];
const JH105Info = new LabRoom("white", 12 * SkinnyMachine.height, JH105Machines, "Silent Labs JH105", 9 * SkinnyMachine.width);

const JH103Machines = [
    new SkinnyMachine("pc2-144", "white", 0, SkinnyMachine.height * 3),
];
const JH103Info = new LabRoom("white", 5 * SkinnyMachine.height, JH103Machines, "Tutor Room JH103", 4 * SkinnyMachine.width);


