import debug0 = require("debug");
import express = require("express");

const debug = debug0("cheem:app:grade");

/**
 * Handles calculating grades.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
export const grades: express.RequestHandler = (req, res, next) => {
    const body = req.body;
    debug(`Calculating grades for ${JSON.stringify(body)}.`);
    calculate(body.values)
        .then((result) => {
            const resultString = JSON.stringify(result);
            debug(`Successfully calculated ${resultString}.`);
            res.set("Content-Type", "application/json; charset=utf-8");
            res.send(resultString);
        })
        .catch((e) => {
            debug(`Unsuccessfully calculated result. Reason: ${JSON.stringify(e)}.`);
            e.status = 400;
            next(e);
        });
};

/**
 * Handles help section for grades.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 */
export const gradesHelp: express.RequestHandler = (req, res) => {
    const isCurl: boolean = String(req.get("User-Agent")).startsWith("curl");

    if (isCurl) {
        debug("Sending cURL Grades Info.");
        res.set("Content-Type", "text/plain; charset=utf-8");
        res.send(`Usage - send POST to /grades with body =
{
  values : [
    { "grade" : number, "credits" : number, "achieved": boolean|undefined}
  ]
}.
Example curl: 'curl -X POST -H "Content-Type: application/json" -d @grades.json http://cheem.co.uk/grades'`);
    } else {
        debug("Rendering Grades.");
        res.render("grade", {title: "Kathan Cheema - Grades"});
    }
};

function calculate(e: [IRowString]) {
    return new Promise<IResults>((resolve, reject) => {
        const t: IRowNumber[] = [];
        let n = !0;
        e.forEach((eo) => {
            const grade = parseFloat(eo.grade);
            const credits = parseInt(eo.credits, 10);
            const achieved = eo.achieved !== false;
            if (validateRow(grade, credits)) {
                t.push({
                    achieved,
                    credits,
                    grade,
                });
            } else {
                n = !1;
            }
        });
        if (n) {
            const achieved = calculateResult(t.filter((r) => r.achieved));
            const willAchieve = calculateResult(t);
            resolve({achieved, will_achieve: willAchieve});
        } else {
            reject();
        }
    });
}

function calculateResult(t: IRowNumber[]) {
    const meanVal = CWM(t);
    const medianVal = CWMedian(t);
    const mean: string = oneDecimalPlace(meanVal);
    const median: string = oneDecimalPlace(medianVal);
    const degreeClass: string = classificationFromGrades(meanVal, medianVal);
    return {mean, median, class: degreeClass};
}

interface IResults {
    achieved: IResult;
    will_achieve: IResult | undefined;
}

interface IResult {
    mean: string;
    median: string;
    class: string;
}

interface IRowString {
    grade: string;
    credits: string;
    achieved: boolean | undefined;
}

interface IRowNumber {
    grade: number;
    credits: number;
    achieved: boolean;
}

function validateRow(grade: number, credits: number) {
    return isNaN(grade)
    || 0 > grade
    || grade > 20
    || isNaN(credits)
    || 0 > credits
    || credits > 120
    || !isInt(credits) ? !1 : !0;
}

function isInt(e: any) {
    return parseFloat(e) !== parseInt(e, 10) || isNaN(e) ? !1 : !0;
}

function oneDecimalPlace(e: number) {
    const t = Math.round(10 * e) / 10;
    return t.toFixed(1);
}

function CWM(e: IRowNumber[]) {
    let t = 0;
    let n = 0;
    for (let o = 0; o < e.length; o++) {
        t += e[o].grade * e[o].credits;
        n += e[o].credits;
    }
    return t / n;
}

function CWMedian(e: IRowNumber[]) {
    e.sort((e0, t0) => e0.grade - t0.grade);
    let t = 0;
    let n = 0;
    for (; n < e.length; n++) {
        t += e[n].credits;
    }
    const o = (t + 1) / 2;
    if (isInt(o)) {
        for (t = 0, n = 0; n < e.length; n++) {
            if (t += e[n].credits, t >= o) {
                return e[n].grade;
            }
        }
    } else {
        for (t = 0, n = 0; n < e.length; n++) {
            if (t += e[n].credits, o - .5 === t && o + .5 > t) {
                return (e[n + 1].grade + e[n].grade) / 2;
            }
            if (t > o) {
                return e[n].grade;
            }
        }
    }
}

function classificationFromGrades(mean: number, median: number) {
    return mean >= 16.5 ? "First Class Honours" :
        mean >= 16 && median >= 16.5 ? "First Class Honours" :
            mean >= 13.5 ? "Upper Second Class Honours (II.1)" :
                mean >= 13 && median >= 13.5 ? "Upper Second Class Honours (II.1)" :
                    mean >= 10.5 ? "Lower Second Class Honours (II.2)" :
                        mean >= 10 && median >= 10.5 ? "Lower Second Class Honours (II.2)" :
                            mean >= 7.5 ? "Third Class Honours" :
                                mean >= 7 && median >= 7.5 ? "Third Class Honours" :
                                    'a degree "Not of Honours Standard"';
}
