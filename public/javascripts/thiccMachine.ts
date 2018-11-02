import {LabMachineDetails} from "../../interfaces/labMachineDetails";

export class ThiccMachine extends LabMachineDetails {

    static readonly width: number = 80;
    static readonly height: number = 40;

    constructor(name: string, x: number, y: number) {
        super(name + "-l", ThiccMachine.width, ThiccMachine.height, "white", x * ThiccMachine.width, y * ThiccMachine.height);
    }

}