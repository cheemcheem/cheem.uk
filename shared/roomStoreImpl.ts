import LabMachineDetails from "./labMachineDetails";
import {SkinnyMachine} from "../public/javascripts/skinnyMachine";
import {LabRoom} from "../public/javascripts/labRoom";
import {ThiccMachine} from "../public/javascripts/thiccMachine";
import {RoomStore} from "./interfaces/roomStore";


// todo tutor machine list
// JC0.14 pc2-125
// JC0.29 pc2-124
// JC030 pc2-126
// JC036 pc2-128
// JC037 pc2-127
// JC1.33A pc2-131
// JC1.33B pc2-145
// JH103 pc2-144

const JH105Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-033", 0, 0),
    new SkinnyMachine("pc5-001", 1, 0),
    new SkinnyMachine("pc5-002", 2, 0),
    new SkinnyMachine("pc5-003", 3, 0),
    new SkinnyMachine("pc5-004", 4, 0),
    new SkinnyMachine("pc5-005", 5, 0),
    new SkinnyMachine("pc5-011", 6, 0),
    new SkinnyMachine("pc5-012", 7, 0),
    new SkinnyMachine("pc5-013", 8, 0),

    new SkinnyMachine("pc5-020", 2, 3),
    new SkinnyMachine("pc5-019", 3, 3),
    new SkinnyMachine("pc5-018", 4, 3),
    new SkinnyMachine("pc5-017", 5, 3),
    new SkinnyMachine("pc5-016", 6, 3),
    new SkinnyMachine("pc5-015", 7, 3),
    new SkinnyMachine("pc5-014", 8, 3),

    new SkinnyMachine("pc2-015", 2, 4),
    new SkinnyMachine("pc2-010", 3, 4),
    new SkinnyMachine("pc2-147", 4, 4),
    new SkinnyMachine("pc2-083", 5, 4),
    new SkinnyMachine("pc2-041", 6, 4),
    new SkinnyMachine("pc2-044", 7, 4),
    new SkinnyMachine("pc2-021", 8, 4),

    new SkinnyMachine("pc2-034", 2, 7),
    new SkinnyMachine("pc2-038", 3, 7),
    new SkinnyMachine("pc2-141", 4, 7),
    new SkinnyMachine("pc2-132", 5, 7),
    new SkinnyMachine("pc2-019", 6, 7),
    new SkinnyMachine("pc2-001", 7, 7),

    new SkinnyMachine("pc2-007", 2, 8),
    new SkinnyMachine("pc2-048", 3, 8),
    new SkinnyMachine("pc2-130", 4, 8),
    new SkinnyMachine("pc2-024", 5, 8),
    new SkinnyMachine("pc2-016", 6, 8),
    new SkinnyMachine("pc2-022", 7, 8),


    new SkinnyMachine("pc2-002", 0, 9),

    new SkinnyMachine("pc2-043", 0, 10),

    new SkinnyMachine("pc2-013", 0, 11),
    new SkinnyMachine("pc2-051", 4, 11),
    new SkinnyMachine("pc2-077", 5, 11),
    new SkinnyMachine("pc2-008", 6, 11),
    new SkinnyMachine("pc2-030", 7, 11),

];
const JH105Info = new LabRoom("white", 12 * SkinnyMachine.height, JH105Machines, "Silent Labs JH105", 9 * SkinnyMachine.width);

const JH103Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-144", 0, 3),
];
const JH103Info = new LabRoom("white", 5 * SkinnyMachine.height, JH103Machines, "Goldfish JH103", 4 * SkinnyMachine.width);

const MorrisonMachines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-047", 0, 0),
    new SkinnyMachine("pc2-069", 1, 0),
    new SkinnyMachine("pc2-031", 2, 0),
    new SkinnyMachine("pc2-086", 3, 0),
    new SkinnyMachine("pc2-084", 4, 0),

    new SkinnyMachine("pc2-108", 0, 1),
    new SkinnyMachine("pc2-120", 1, 1),
    new SkinnyMachine("pc2-090", 2, 1),
    new SkinnyMachine("pc2-003", 3, 1),
    new SkinnyMachine("pc2-118", 4, 1),
];
const MorrisonInfo = new LabRoom("white", 2 * SkinnyMachine.height, MorrisonMachines, "Morrison", 5 * SkinnyMachine.width);

const JH110Machines: LabMachineDetails[] = [
    new SkinnyMachine("pc2-072", 0, 0),
    new SkinnyMachine("pc2-113", 2, 0),
    new SkinnyMachine("pc2-065", 3, 0),
    new SkinnyMachine("pc2-081", 11, 0),

    new SkinnyMachine("pc2-139", 2, 1),
    new SkinnyMachine("pc2-097", 3, 1),

    new SkinnyMachine("pc2-075", 6, 3),
    new SkinnyMachine("pc2-105", 7, 3),
    new SkinnyMachine("pc2-025", 8, 3),
    new SkinnyMachine("pc2-067", 9, 3),
    new SkinnyMachine("pc2-099", 10, 3),
    new SkinnyMachine("pc2-112", 11, 3),
    new SkinnyMachine("pc2-064", 13, 3),
    new SkinnyMachine("pc2-057", 14, 3),
    new SkinnyMachine("pc2-085", 15, 3),
    new SkinnyMachine("pc2-111", 16, 3),
    new SkinnyMachine("pc2-063", 17, 3),

    new SkinnyMachine("pc2-053", 0, 6),
    new SkinnyMachine("pc2-027", 1, 6),
    new SkinnyMachine("pc2-071", 2, 6),
    new SkinnyMachine("pc2-009", 3, 6),
    new SkinnyMachine("pc2-101", 6, 6),
    new SkinnyMachine("pc2-106", 7, 6),
    new SkinnyMachine("pc2-094", 8, 6),
    new SkinnyMachine("pc2-066", 9, 6),
    new SkinnyMachine("pc2-056", 10, 6),
    new SkinnyMachine("pc2-020", 11, 6),
    new SkinnyMachine("pc2-098", 13, 6),
    new SkinnyMachine("pc2-102", 14, 6),
    new SkinnyMachine("pc2-074", 15, 6),
    new SkinnyMachine("pc2-059", 16, 6),
    new SkinnyMachine("pc2-062", 17, 6),

    new SkinnyMachine("pc2-089", 0, 7),
    new SkinnyMachine("pc2-028", 1, 7),
    new SkinnyMachine("pc2-082", 2, 7),
    new SkinnyMachine("pc2-092", 3, 7),

    new SkinnyMachine("pc2-076", 6, 9),
    new SkinnyMachine("pc2-079", 7, 9),
    new SkinnyMachine("pc2-070", 8, 9),
    new SkinnyMachine("pc2-091", 9, 9),
    new SkinnyMachine("pc2-096", 10, 9),
    new SkinnyMachine("pc2-109", 11, 9),
    new SkinnyMachine("pc2-080", 13, 9),
    new SkinnyMachine("pc2-054", 14, 9),
    new SkinnyMachine("pc2-129", 15, 9),
    new SkinnyMachine("pc2-068", 16, 9),
    new SkinnyMachine("pc2-123", 17, 9),

    new SkinnyMachine("pc2-058", 0, 12),
    new SkinnyMachine("pc2-133", 1, 12),
    new SkinnyMachine("pc2-100", 2, 12),
    new SkinnyMachine("pc2-095", 3, 12),

    new SkinnyMachine("pc2-093", 0, 13),
    new SkinnyMachine("pc2-117", 1, 13),
    new SkinnyMachine("pc2-026", 2, 13),
    new SkinnyMachine("pc2-040", 3, 13),
    new SkinnyMachine("pc2-104", 6, 13),
    new SkinnyMachine("pc2-055", 7, 13),
    new SkinnyMachine("pc2-078", 8, 13),
    new SkinnyMachine("pc2-049", 9, 13),
    new SkinnyMachine("pc2-087", 13, 13),
    new SkinnyMachine("pc2-088", 14, 13),
    new SkinnyMachine("pc2-116", 15, 13),
    new SkinnyMachine("pc2-121", 16, 13),
    new SkinnyMachine("pc2-060", 17, 13),

    new SkinnyMachine("pc2-052", 6, 14),
    new SkinnyMachine("pc2-114", 7, 14),
    new SkinnyMachine("pc2-148", 8, 14),
    new SkinnyMachine("pc2-029", 9, 14),
    new SkinnyMachine("pc2-143", 13, 14),
    new SkinnyMachine("pc2-119", 14, 14),
    new SkinnyMachine("pc2-122", 15, 14),
    new SkinnyMachine("pc2-046", 16, 14),
    new SkinnyMachine("pc2-050", 17, 14),

    new SkinnyMachine("pc5-023", 0, 17),
    new SkinnyMachine("pc5-022", 1, 17),
    new SkinnyMachine("pc5-036", 2, 17),
    new SkinnyMachine("pc5-038", 3, 17),
    new SkinnyMachine("pc2-005", 6, 17),
    new SkinnyMachine("pc2-138", 7, 17),
    new SkinnyMachine("pc2-073", 8, 17),
    new SkinnyMachine("pc2-103", 9, 17),
    new SkinnyMachine("pc2-107", 10, 17),
    new SkinnyMachine("pc2-036", 11, 17),

    new SkinnyMachine("pc5-037", 0, 18),
    new SkinnyMachine("pc5-033", 1, 18),
    new SkinnyMachine("pc5-031", 2, 18),
    new SkinnyMachine("pc5-021", 3, 18),
    new SkinnyMachine("pc2-011", 6, 18),
    new SkinnyMachine("pc2-039", 7, 18),
    new SkinnyMachine("pc2-017", 8, 18),
    new SkinnyMachine("pc2-045", 9, 18),
    new SkinnyMachine("pc2-004", 10, 18),
    new SkinnyMachine("pc2-014", 11, 18),

    new SkinnyMachine("pc5-030", 0, 23),
    new SkinnyMachine("pc5-034", 1, 23),
    new SkinnyMachine("pc5-032", 2, 23),
    new SkinnyMachine("pc5-035", 3, 23),
    new SkinnyMachine("pc2-110", 5, 23),
    new SkinnyMachine("pc2-150", 6, 23),
    new SkinnyMachine("pc2-140", 7, 23),
    new SkinnyMachine("pc2-061", 8, 23),
    new SkinnyMachine("pc2-137", 9, 23),
    new SkinnyMachine("pc2-134", 10, 23),
    new SkinnyMachine("pc2-142", 11, 23),


];
const JH110Info = new LabRoom("white", 23 * SkinnyMachine.height, JH110Machines, "Teaching Lab JH110", 19 * SkinnyMachine.width);

const JC035Machines: LabMachineDetails[] = [
    new ThiccMachine("pc3-026", 0, 0),
    new ThiccMachine("pc3-067", 2, 0),
    new ThiccMachine("pc3-036", 3, 0),
    new ThiccMachine("pc3-071", 5, 0),
    new ThiccMachine("pc3-027", 6, 0),
    new ThiccMachine("pc5-006", 10, 0),
    new ThiccMachine("pc3-019", 13, 0),
    new ThiccMachine("pc3-039", 14, 0),

    new ThiccMachine("pc3-043", 0, 1),
    new ThiccMachine("pc3-033", 2, 1),
    new ThiccMachine("pc3-034", 3, 1),
    new ThiccMachine("pc3-021", 5, 1),
    new ThiccMachine("pc3-025", 6, 1),
    new ThiccMachine("pc5-007", 10, 1),
    new ThiccMachine("pc3-048", 13, 1),
    new ThiccMachine("pc3-041", 14, 1),

    new ThiccMachine("pc3-047", 0, 2),
    new ThiccMachine("pc3-045", 2, 2),
    new ThiccMachine("pc3-072", 3, 2),
    new ThiccMachine("pc3-028", 5, 2),
    new ThiccMachine("pc3-070", 6, 2),
    new ThiccMachine("pc5-008", 10, 2),
    new ThiccMachine("pc3-042", 13, 2),
    new ThiccMachine("pc3-020", 14, 2),

    new ThiccMachine("pc3-018", 0, 3),
    new ThiccMachine("pc3-024", 2, 3),
    new ThiccMachine("pc3-053", 3, 3),
    new ThiccMachine("pc3-068", 5, 3),
    new ThiccMachine("pc3-065", 6, 3),
    new ThiccMachine("pc5-009", 10, 3),

    new ThiccMachine("pc3-069", 0, 4),
    new ThiccMachine("pc3-001", 2, 4),
    new ThiccMachine("pc3-064", 3, 4),
    new ThiccMachine("pc3-060", 5, 4),
    new ThiccMachine("pc3-058", 6, 4),
    new ThiccMachine("pc5-025", 10, 4),

    new ThiccMachine("pc3-022", 15, 5),
    new ThiccMachine("pc3-046", 16, 5),
    new ThiccMachine("pc3-032", 17, 5),
    new ThiccMachine("pc3-035", 18, 5),

    new ThiccMachine("pc3-038", 15, 6),
    new ThiccMachine("pc3-066", 16, 6),
    new ThiccMachine("pc3-030", 17, 6),
    new ThiccMachine("pc3-023", 18, 6),

    // new ThiccMachine("pc2-141", 0, 7), // todo find out why pc2-141 is duplicated

    new ThiccMachine("pc5-010", 11, 8),
    new ThiccMachine("pc5-028", 12, 8),
    new ThiccMachine("pc5-024", 13, 8),
    new ThiccMachine("pc5-026", 14, 8),
    new ThiccMachine("pc5-029", 15, 8),
    new ThiccMachine("pc5-027", 16, 8),
    new ThiccMachine("pc5-039", 17, 8),
    new ThiccMachine("pc3-054", 18, 8),

    new ThiccMachine("pc3-063", 11, 9),
    new ThiccMachine("pc3-056", 12, 9),
    new ThiccMachine("pc3-029", 13, 9),
    new ThiccMachine("pc3-057", 14, 9),
    new ThiccMachine("pc3-061", 15, 9),
    new ThiccMachine("pc3-050", 16, 9),
    new ThiccMachine("pc3-059", 17, 9),
    new ThiccMachine("pc3-062", 18, 9),

    new ThiccMachine("pc2-012", 0, 10),

    new ThiccMachine("pc3-049", 11, 11),
    new ThiccMachine("pc3-031", 12, 11),
    new ThiccMachine("pc3-055", 13, 11),
    new ThiccMachine("pc3-037", 14, 11),
    new ThiccMachine("pc3-052", 15, 11),
    new ThiccMachine("pc3-044", 16, 11),
    new ThiccMachine("pc3-051", 17, 11),
    new ThiccMachine("pc3-040", 18, 11),

    new ThiccMachine("pc3-007", 11, 12),
    new ThiccMachine("pc3-010", 12, 12),
    new ThiccMachine("pc3-013", 13, 12),
    new ThiccMachine("pc3-004", 14, 12),
    new ThiccMachine("pc3-008", 15, 12),
    new ThiccMachine("pc3-017", 16, 12),
    new ThiccMachine("pc3-009", 17, 12),
    new ThiccMachine("pc3-011", 18, 12),

    new ThiccMachine("pc2-136", 6, 14),

    new ThiccMachine("pc3-002", 11, 14),
    new ThiccMachine("pc3-012", 12, 14),
    new ThiccMachine("pc3-014", 13, 14),
    new ThiccMachine("pc3-003", 14, 14),
    new ThiccMachine("pc3-015", 15, 14),
    new ThiccMachine("pc3-005", 16, 14),
    new ThiccMachine("pc3-006", 17, 14),
    new ThiccMachine("pc3-016", 18, 14),

];
const JC035Info = new LabRoom("white", 15 * ThiccMachine.height, JC035Machines, "Student Lab JC0.35", 19 * ThiccMachine.width);

const roomStoreImpl: RoomStore = {JH105Info, JH103Info, MorrisonInfo, JH110Info, JC035Info};
export default roomStoreImpl;