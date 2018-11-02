import {LabVisualObject} from "./labVisualObject";

export abstract class LabMachineDetails implements LabVisualObject {

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