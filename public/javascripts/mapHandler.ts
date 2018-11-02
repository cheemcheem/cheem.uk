import {LabRoom} from "./labRoom";
import {LabMachineDetails} from "../../interfaces/labMachineDetails";

export class MapHandler {

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