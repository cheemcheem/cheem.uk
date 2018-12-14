import {PCQueryResponse} from "../../shared/pcQueryResponse";

export class StatusHandler {

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
                    tablePCUsers.innerHTML = String(foundUsers);
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
     * @return {Promise<[string|null]>}
     */
    public static getStatus: (pc: string) => Promise<[string | null]> = (pc: string) => {

        return new Promise((resolve, reject) => {

            // Request object which will contain response object once loaded.
            const req = new XMLHttpRequest();

            /**
             * Once response is loaded, set list element to green if up and red if down.
             */
            const onResponseLoad = () => {
                try {
                    const json: PCQueryResponse = JSON.parse(req.responseText);
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
            req.open("GET", `info/pc/${pc}`, true);
            req.send(pc);

        });

    };

}