import LabVisualObject from "./labVisualObject";
import LabMachineDetails from "../labMachineDetails";

export default interface Lab extends LabVisualObject {
    readonly machines: LabMachineDetails[];
}