window.onload = () => {

    return Promise.all([
        MapHandler.applyCanvas(JH105Info, document.querySelector("#JH105")),
        MapHandler.applyCanvas(JH103Info, document.querySelector("#JH103")),
        MapHandler.applyCanvas(MorrisonInfo, document.querySelector("#Morrison")),
        MapHandler.applyCanvas(JH110Info, document.querySelector("#JH110")),
        MapHandler.applyCanvas(JC035Info, document.querySelector("#JC035"))
    ]).then(() => {
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
        const list = [];
        for (let i = 0; i < svgs.length; i++) {
            list.push(svgs[i]);
        }
        list.push(pcList);

        const dropdown = document.getElementById("labSelector") as HTMLSelectElement;
        dropdown.addEventListener("change", () => {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === dropdown.value) {
                    list[i].classList.add("visible");
                } else {
                    list[i].classList.remove("visible");
                }
            }
        });
    });
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
            const tablePC = this.listOfPCs[i];
            const tablePCAddress = tablePC.children[0];
            const tablePCAddressInner = tablePCAddress.innerHTML;
            const tablePCUsers = tablePC.children[1];

            const id = "svg-" + tablePCAddressInner;

            const svgPCText = document.getElementById(id);

            // Update status each PC in the table
            StatusHandler.getStatus(tablePCAddressInner)
                .then((foundUsers) => {
                    // PC is active
                    tablePC.classList.remove("inactive");
                    tablePC.classList.add("active");
                    tablePCUsers.innerHTML = foundUsers;
                    this.numberOfActive++;

                    //todo remove once added all svg versions
                    if (!svgPCText) return;
                    svgPCText.classList.remove("inactive");
                    svgPCText.classList.add("active");


                })
                .catch((e) => {

                    // PC is inactive
                    tablePC.classList.remove("active");
                    tablePC.classList.add("inactive");
                    this.numberOfInactive++;
                    tablePCUsers.innerHTML = "N/A";

                    //todo remove once added all svg versions
                    if (!svgPCText) return;
                    svgPCText.classList.remove("active");
                    svgPCText.classList.add("inactive");


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
     * @return {Promise<string>}
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
            req.addEventListener("error", onResponseLoad); //todo change this as indicates connection issue to server not pc

            // Send GET to url asynchronously so all can be sent at once
            req.open("GET", pc, true);
            req.send(pc);

        });

    };

}

class SearchHandler {

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

class MapHandler {

    /**
     * Uses a lab room object's details and machines to populate the room svg's rect and texts elements, and properties.
     * @param labRoom {LabRoom} Lab Room with Lab Machines.
     * @param roomSVG {SVGElement} SVG element to customise.
     */
    static applyCanvas: (labRoom: LabRoom, roomSVG: SVGElement) => Promise<{}> = (labRoom: LabRoom, roomSVG: SVGElement) => {
        return new Promise((resolve, reject) => {
            const svgNS = "http://www.w3.org/2000/svg";

            roomSVG.style.color = labRoom.color;
            roomSVG.style.width = labRoom.width.toString();
            roomSVG.style.height = labRoom.height.toString();
            roomSVG.setAttribute("name", labRoom.name);

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

                if (i === machines.length - 1) {
                    resolve();
                    return;
                }
            }
            reject();
        })

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

    static readonly width: number = 80;
    static readonly height: number = 20;

    constructor(name: string, x: number, y: number) {
        super(name + "-l", SkinnyMachine.width, SkinnyMachine.height, "white", x * SkinnyMachine.width, y * SkinnyMachine.height);
    }

}

class ThiccMachine extends LabMachineDetails {

    static readonly width: number = 80;
    static readonly height: number = 40;

    constructor(name: string, x: number, y: number) {
        super(name + "-l", ThiccMachine.width, ThiccMachine.height, "white", ThiccMachine.width * x, ThiccMachine.height * y);
    }

}

// todo tutor machine list
// JC0.14 pc2-125
// JC0.29 pc2-124
// JC030 pc2-126
// JC036 pc2-128
// JC037 pc2-127
// JC1.33A pc2-131
// JC1.33B pc2-145
// JH103 pc2-144

const JH105Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-033", 0, 0),
    new SkinnyMachine("pc5-001", 1, 0),
    new SkinnyMachine("pc5-002", 2, 0),
    new SkinnyMachine("pc5-003", 3, 0),
    new SkinnyMachine("pc5-004", 4, 0),
    new SkinnyMachine("pc5-005", 5, 0),
    new SkinnyMachine("pc5-011", 6, 0),
    new SkinnyMachine("pc5-012", 7, 0),
    new SkinnyMachine("pc5-013", 8, 0),

    new SkinnyMachine("pc5-020", 2, 3),
    new SkinnyMachine("pc5-019", 3, 3),
    new SkinnyMachine("pc5-018", 4, 3),
    new SkinnyMachine("pc5-017", 5, 3),
    new SkinnyMachine("pc5-016", 6, 3),
    new SkinnyMachine("pc5-015", 7, 3),
    new SkinnyMachine("pc5-014", 8, 3),

    new SkinnyMachine("pc2-015", 2, 4),
    new SkinnyMachine("pc2-010", 3, 4),
    new SkinnyMachine("pc2-147", 4, 4),
    new SkinnyMachine("pc2-083", 5, 4),
    new SkinnyMachine("pc2-041", 6, 4),
    new SkinnyMachine("pc2-044", 7, 4),
    new SkinnyMachine("pc2-021", 8, 4),

    new SkinnyMachine("pc2-034", 2, 7),
    new SkinnyMachine("pc2-038", 3, 7),
    new SkinnyMachine("pc2-141", 4, 7),
    new SkinnyMachine("pc2-132", 5, 7),
    new SkinnyMachine("pc2-019", 6, 7),
    new SkinnyMachine("pc2-001", 7, 7),

    new SkinnyMachine("pc2-007", 2, 8),
    new SkinnyMachine("pc2-048", 3, 8),
    new SkinnyMachine("pc2-130", 4, 8),
    new SkinnyMachine("pc2-024", 5, 8),
    new SkinnyMachine("pc2-016", 6, 8),
    new SkinnyMachine("pc2-022", 7, 8),


    new SkinnyMachine("pc2-002", 0, 9),

    new SkinnyMachine("pc2-043", 0, 10),

    new SkinnyMachine("pc2-013", 0, 11),
    new SkinnyMachine("pc2-051", 4, 11),
    new SkinnyMachine("pc2-077", 5, 11),
    new SkinnyMachine("pc2-008", 6, 11),
    new SkinnyMachine("pc2-030", 7, 11),

];
const JH105Info = new LabRoom("white", 12 * SkinnyMachine.height, JH105Machines, "Silent Labs JH105", 9 * SkinnyMachine.width);

const JH103Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-144", 0, 3),
];
const JH103Info = new LabRoom("white", 5 * SkinnyMachine.height, JH103Machines, "Goldfish JH103", 4 * SkinnyMachine.width);

const MorrisonMachines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-047", 0, 0),
    new SkinnyMachine("pc2-069", 1, 0),
    new SkinnyMachine("pc2-031", 2, 0),
    new SkinnyMachine("pc2-086", 3, 0),
    new SkinnyMachine("pc2-084", 4, 0),

    new SkinnyMachine("pc2-108", 0, 1),
    new SkinnyMachine("pc2-120", 1, 1),
    new SkinnyMachine("pc2-090", 2, 1),
    new SkinnyMachine("pc2-003", 3, 1),
    new SkinnyMachine("pc2-118", 4, 1),
];
const MorrisonInfo = new LabRoom("white", 2 * SkinnyMachine.height, MorrisonMachines, "Morrison", 5 * SkinnyMachine.width);

const JH110Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-072", 0, 0),
    new SkinnyMachine("pc2-113", 2, 0),
    new SkinnyMachine("pc2-065", 3, 0),
    new SkinnyMachine("pc2-081", 11, 0),

    new SkinnyMachine("pc2-139", 2, 1),
    new SkinnyMachine("pc2-097", 3, 1),

    new SkinnyMachine("pc2-075", 6, 3),
    new SkinnyMachine("pc2-105", 7, 3),
    new SkinnyMachine("pc2-025", 8, 3),
    new SkinnyMachine("pc2-067", 9, 3),
    new SkinnyMachine("pc2-099", 10, 3),
    new SkinnyMachine("pc2-112", 11, 3),
    new SkinnyMachine("pc2-064", 13, 3),
    new SkinnyMachine("pc2-057", 14, 3),
    new SkinnyMachine("pc2-085", 15, 3),
    new SkinnyMachine("pc2-111", 16, 3),
    new SkinnyMachine("pc2-063", 17, 3),

    new SkinnyMachine("pc2-053", 0, 6),
    new SkinnyMachine("pc2-027", 1, 6),
    new SkinnyMachine("pc2-071", 2, 6),
    new SkinnyMachine("pc2-009", 3, 6),
    new SkinnyMachine("pc2-101", 6, 6),
    new SkinnyMachine("pc2-106", 7, 6),
    new SkinnyMachine("pc2-094", 8, 6),
    new SkinnyMachine("pc2-066", 9, 6),
    new SkinnyMachine("pc2-056", 10, 6),
    new SkinnyMachine("pc2-020", 11, 6),
    new SkinnyMachine("pc2-098", 13, 6),
    new SkinnyMachine("pc2-102", 14, 6),
    new SkinnyMachine("pc2-074", 15, 6),
    new SkinnyMachine("pc2-059", 16, 6),
    new SkinnyMachine("pc2-062", 17, 6),

    new SkinnyMachine("pc2-089", 0, 7),
    new SkinnyMachine("pc2-028", 1, 7),
    new SkinnyMachine("pc2-082", 2, 7),
    new SkinnyMachine("pc2-092", 3, 7),

    new SkinnyMachine("pc2-076", 6, 9),
    new SkinnyMachine("pc2-079", 7, 9),
    new SkinnyMachine("pc2-070", 8, 9),
    new SkinnyMachine("pc2-091", 9, 9),
    new SkinnyMachine("pc2-096", 10, 9),
    new SkinnyMachine("pc2-109", 11, 9),
    new SkinnyMachine("pc2-080", 13, 9),
    new SkinnyMachine("pc2-054", 14, 9),
    new SkinnyMachine("pc2-129", 15, 9),
    new SkinnyMachine("pc2-068", 16, 9),
    new SkinnyMachine("pc2-123", 17, 9),

    new SkinnyMachine("pc2-058", 0, 12),
    new SkinnyMachine("pc2-133", 1, 12),
    new SkinnyMachine("pc2-100", 2, 12),
    new SkinnyMachine("pc2-095", 3, 12),

    new SkinnyMachine("pc2-093", 0, 13),
    new SkinnyMachine("pc2-117", 1, 13),
    new SkinnyMachine("pc2-026", 2, 13),
    new SkinnyMachine("pc2-040", 3, 13),
    new SkinnyMachine("pc2-104", 6, 13),
    new SkinnyMachine("pc2-055", 7, 13),
    new SkinnyMachine("pc2-078", 8, 13),
    new SkinnyMachine("pc2-049", 9, 13),
    new SkinnyMachine("pc2-087", 13, 13),
    new SkinnyMachine("pc2-088", 14, 13),
    new SkinnyMachine("pc2-116", 15, 13),
    new SkinnyMachine("pc2-121", 16, 13),
    new SkinnyMachine("pc2-060", 17, 13),

    new SkinnyMachine("pc2-052", 6, 14),
    new SkinnyMachine("pc2-114", 7, 14),
    new SkinnyMachine("pc2-148", 8, 14),
    new SkinnyMachine("pc2-029", 9, 14),
    new SkinnyMachine("pc2-143", 13, 14),
    new SkinnyMachine("pc2-119", 14, 14),
    new SkinnyMachine("pc2-122", 15, 14),
    new SkinnyMachine("pc2-046", 16, 14),
    new SkinnyMachine("pc2-050", 17, 14),

    new SkinnyMachine("pc5-023", 0, 17),
    new SkinnyMachine("pc5-022", 1, 17),
    new SkinnyMachine("pc5-036", 2, 17),
    new SkinnyMachine("pc5-038", 3, 17),
    new SkinnyMachine("pc2-005", 6, 17),
    new SkinnyMachine("pc2-138", 7, 17),
    new SkinnyMachine("pc2-073", 8, 17),
    new SkinnyMachine("pc2-103", 9, 17),
    new SkinnyMachine("pc2-107", 10, 17),
    new SkinnyMachine("pc2-036", 11, 17),

    new SkinnyMachine("pc5-037", 0, 18),
    new SkinnyMachine("pc5-033", 1, 18),
    new SkinnyMachine("pc5-031", 2, 18),
    new SkinnyMachine("pc5-021", 3, 18),
    new SkinnyMachine("pc2-011", 6, 18),
    new SkinnyMachine("pc2-039", 7, 18),
    new SkinnyMachine("pc2-017", 8, 18),
    new SkinnyMachine("pc2-045", 9, 18),
    new SkinnyMachine("pc2-004", 10, 18),
    new SkinnyMachine("pc2-014", 11, 18),

    new SkinnyMachine("pc5-030", 0, 23),
    new SkinnyMachine("pc5-034", 1, 23),
    new SkinnyMachine("pc5-032", 2, 23),
    new SkinnyMachine("pc5-035", 3, 23),
    new SkinnyMachine("pc2-110", 5, 23),
    new SkinnyMachine("pc2-150", 6, 23),
    new SkinnyMachine("pc2-140", 7, 23),
    new SkinnyMachine("pc2-061", 8, 23),
    new SkinnyMachine("pc2-137", 9, 23),
    new SkinnyMachine("pc2-134", 10, 23),
    new SkinnyMachine("pc2-142", 11, 23),


];
const JH110Info = new LabRoom("white", 23 * SkinnyMachine.height, JH110Machines, "Teaching Lab JH110", 19 * SkinnyMachine.width);

const JC035Machines: LabMachineDetails[] = [
    new ThiccMachine("pc3-026-l", 0, 0),
    new ThiccMachine("pc3-067-l", 2, 0),
    new ThiccMachine("pc3-036-l", 3, 0),
    new ThiccMachine("pc3-071-l", 5, 0),
    new ThiccMachine("pc3-027-l", 6, 0),
    new ThiccMachine("pc5-006-l", 10, 0),
    new ThiccMachine("pc3-019-l", 13, 0),
    new ThiccMachine("pc3-039-l", 14, 0),

    new ThiccMachine("pc3-043-l", 0, 1),
    new ThiccMachine("pc3-033-l", 2, 1),
    new ThiccMachine("pc3-034-l", 3, 1),
    new ThiccMachine("pc3-021-l", 5, 1),
    new ThiccMachine("pc3-025-l", 6, 1),
    new ThiccMachine("pc5-007-l", 10, 1),
    new ThiccMachine("pc3-048-l", 13, 1),
    new ThiccMachine("pc3-041-l", 14, 1),

    new ThiccMachine("pc3-047-l", 0, 2),
    new ThiccMachine("pc3-045-l", 2, 2),
    new ThiccMachine("pc3-072-l", 3, 2),
    new ThiccMachine("pc3-028-l", 5, 2),
    new ThiccMachine("pc3-070-l", 6, 2),
    new ThiccMachine("pc5-008-l", 10, 2),
    new ThiccMachine("pc3-042-l", 13, 2),
    new ThiccMachine("pc3-020-l", 14, 2),

    new ThiccMachine("pc3-018-l", 0, 3),
    new ThiccMachine("pc3-024-l", 2, 3),
    new ThiccMachine("pc3-053-l", 3, 3),
    new ThiccMachine("pc3-068-l", 5, 3),
    new ThiccMachine("pc3-065-l", 6, 3),
    new ThiccMachine("pc5-009-l", 10, 3),

    new ThiccMachine("pc3-069-l", 0, 4),
    new ThiccMachine("pc3-001-l", 2, 4),
    new ThiccMachine("pc3-064-l", 3, 4),
    new ThiccMachine("pc3-060-l", 5, 4),
    new ThiccMachine("pc3-058-l", 6, 4),
    new ThiccMachine("pc5-025-l", 10, 4),

    new ThiccMachine("pc3-022-l", 11, 5),
    new ThiccMachine("pc3-046-l", 12, 5),
    new ThiccMachine("pc3-032-l", 13, 5),
    new ThiccMachine("pc3-035-l", 14, 5),

    new ThiccMachine("pc3-038-l", 11, 6),
    new ThiccMachine("pc3-066-l", 12, 6),
    new ThiccMachine("pc3-030-l", 13, 6),
    new ThiccMachine("pc3-023-l", 14, 6),

    new ThiccMachine("pc2-141-l", 0, 7),

    new ThiccMachine("pc5-010-l", 11, 8),
    new ThiccMachine("pc5-028-l", 12, 8),
    new ThiccMachine("pc5-024-l", 13, 8),
    new ThiccMachine("pc5-026-l", 14, 8),
    new ThiccMachine("pc5-029-l", 15, 8),
    new ThiccMachine("pc5-027-l", 16, 8),
    new ThiccMachine("pc5-039-l", 17, 8),
    new ThiccMachine("pc5-054-l", 18, 8),

    new ThiccMachine("pc3-063-l", 11, 9),
    new ThiccMachine("pc3-056-l", 12, 9),
    new ThiccMachine("pc3-029-l", 13, 9),
    new ThiccMachine("pc3-057-l", 14, 9),
    new ThiccMachine("pc3-061-l", 15, 9),
    new ThiccMachine("pc3-050-l", 16, 9),
    new ThiccMachine("pc3-059-l", 17, 9),
    new ThiccMachine("pc3-062-l", 18, 9),

    new ThiccMachine("pc2-012-l", 0, 10),

    new ThiccMachine("pc3-049-l", 11, 11),
    new ThiccMachine("pc3-031-l", 12, 11),
    new ThiccMachine("pc3-055-l", 13, 11),
    new ThiccMachine("pc3-037-l", 14, 11),
    new ThiccMachine("pc3-052-l", 15, 11),
    new ThiccMachine("pc3-044-l", 16, 11),
    new ThiccMachine("pc3-051-l", 17, 11),
    new ThiccMachine("pc3-040-l", 18, 11),

    new ThiccMachine("pc3-007-l", 11, 12),
    new ThiccMachine("pc3-010-l", 12, 12),
    new ThiccMachine("pc3-013-l", 13, 12),
    new ThiccMachine("pc3-004-l", 14, 12),
    new ThiccMachine("pc3-008-l", 15, 12),
    new ThiccMachine("pc3-017-l", 16, 12),
    new ThiccMachine("pc3-009-l", 17, 12),
    new ThiccMachine("pc3-011-l", 18, 12),

    new ThiccMachine("pc2-136-l", 6, 14),

    new ThiccMachine("pc3-002-l", 11, 14),
    new ThiccMachine("pc3-012-l", 12, 14),
    new ThiccMachine("pc3-014-l", 13, 14),
    new ThiccMachine("pc3-003-l", 14, 14),
    new ThiccMachine("pc3-015-l", 15, 14),
    new ThiccMachine("pc3-005-l", 16, 14),
    new ThiccMachine("pc3-006-l", 17, 14),
    new ThiccMachine("pc3-016-l", 18, 14),

];
const JC035Info = new LabRoom("white", 14 * SkinnyMachine.height, JC035Machines, "Student Lab JC0.35", 18 * SkinnyMachine.width);




