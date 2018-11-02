import Lab from "../../shared/interfaces/lab";
import LabMachineDetails from "../../shared/labMachineDetails";

export class LabRoom implements Lab {
    readonly _color: string;
    readonly _height: number;
    readonly _machines: LabMachineDetails[];
    readonly _name: string;
    readonly _width: number;

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