import LabMachineDetails from "../../shared/labMachineDetails";

export class SkinnyMachine extends LabMachineDetails {

    static readonly width: number = 80;
    static readonly height: number = 20;

    constructor(name: string, x: number, y: number) {
        super(name + "-l", SkinnyMachine.width, SkinnyMachine.height, "white", x * SkinnyMachine.width, y * SkinnyMachine.height);
    }

}