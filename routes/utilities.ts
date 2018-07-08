import {sprintf} from "sprintf-js";

/**
 * Generate list of Lab Machine URLs. (Pre set).
 */
const generateListOfPCs: () => [string] = () => {

    /**
     * For generating a 3x0 padded number string from a number.
     * @param number Integer to pad.
     */
    const format: (number: number) => string = (number: number) => {
        return sprintf("%03d", number);
    };

    /**
     * For generating a "pc<@param type>-<@param number>-l" style URL (ie local pc name).
     * @param type Lab Machine Type (2, 3, or 5. Can be anything but it won't be a valid URL).
     * @param number Lab Machine Number (0 - upper bound depends on Lab Machine Type).
     */
    const pcx: (type: number, number: number) => string = (type: number, number: number) => {
        return `pc${type}-${format(number)}-l`;
    };

    // Add first pc2-000-l.cs.st-andrews.ac.uk to initialise typed list
    let returnable: [string] = [pcx(2, 0)];

    // Add pc2s
    for (let i = 1; i <= 150; i++) {
        returnable.push(pcx(2, i));

    }

    // Add pc3s
    for (let i = 0; i <= 72; i++) {
        returnable.push(pcx(3, i));

    }

    // Add pc5s
    for (let i = 0; i <= 39; i++) {
        returnable.push(pcx(5, i));

    }

    return returnable;
};


/**
 * Used to hold a list of PC addresses which can be queried.
 * @type {[string]}
 */
export const listOfPCs: [string] = generateListOfPCs();