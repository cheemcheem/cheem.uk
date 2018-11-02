import {Lab} from "../../interfaces/lab";
import {LabMachineDetails} from "../../interfaces/labMachineDetails";

export class LabRoom implements Lab {
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