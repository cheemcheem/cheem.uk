import {LabRoom} from "./labRoom";
import LabMachineDetails from "../../shared/labMachineDetails";
import Lab from "../../shared/interfaces/lab";

export class MapHandler {

    /**
     * Uses a lab room object's details and machines to populate the room svg's rect and texts elements, and properties.
     * @param labRoom {Lab} Lab Room with Lab Machines.
     * @param roomSVG {SVGElement} SVG element to customise.
     */
    static applyCanvas: (labRoom: Lab, roomSVG: SVGElement) => Promise<{}> = (labRoom: LabRoom, roomSVG: SVGElement) => {
        return new Promise((resolve, reject) => {
            const svgNS = "http://www.w3.org/2000/svg";

            console.log(labRoom._name);
            roomSVG.style.color = labRoom._color;
            roomSVG.style.width = String(labRoom._width);
            roomSVG.style.height = String(labRoom._height);
            roomSVG.setAttribute("name", labRoom._name);

            const machines: LabMachineDetails[] = labRoom._machines;

            for (let i = 0; i < machines.length; i++) {
                const machine: LabMachineDetails = machines[i];

                const rect: SVGGraphicsElement = document.createElementNS(svgNS, "rect");
                rect.setAttributeNS(null, 'x', String(machine._x));
                rect.setAttributeNS(null, 'y', String(machine._y));
                rect.setAttributeNS(null, 'height', String(machine._height));
                rect.setAttributeNS(null, 'width', String(machine._width));
                rect.setAttributeNS(null, 'fill', machine._color);
                rect.setAttributeNS(null, 'stroke', "black");
                rect.setAttributeNS(null, 'stroke-linecap', "square");
                rect.setAttributeNS(null, 'stroke-opacity', "1");
                rect.setAttributeNS(null, 'fill-opacity', "0.7");

                const font: SVGTextElement = document.createElementNS(svgNS, "text");
                font.setAttributeNS(null, 'x', String(machine._x + machine._width / 2));
                font.setAttributeNS(null, 'y', String(machine._y + machine._height / 2));
                font.setAttributeNS(null, 'text-anchor', "middle");
                font.setAttributeNS(null, 'alignment-baseline', "central");
                font.style.font = "10px sans-serif";
                font.innerHTML = machine._name;
                font.id = "svg-" + machine._name;

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