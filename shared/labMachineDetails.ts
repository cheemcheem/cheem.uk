import LabVisualObject from "./interfaces/labVisualObject";

export default abstract class LabMachineDetails implements LabVisualObject {

    readonly _name: string;
    readonly _width: number;
    readonly _height: number;
    readonly _color: string;

    readonly _x: number;
    readonly _y: number;


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