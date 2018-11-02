import {LabVisualObject} from "./labVisualObject";
import {LabMachineDetails} from "./labMachineDetails";

export interface Lab extends LabVisualObject {
    readonly machines: LabMachineDetails[];
}