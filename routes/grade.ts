import * as express from 'express';

/**
 * Handles calculating grades.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const grades:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {

        const body = req.body;
        calculate(body.values)
            .then(result => {
                res.set('Content-Type', 'application/json; charset=utf-8');
                res.send(JSON.stringify(result));
            }).catch((e) => {
                e.status = 400;
                next(e);
            });
    };

/**
 * Handles help section for grades.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const gradesHelp:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {
        const isCurl: boolean = String(req.get("User-Agent")).startsWith("curl");

        if (isCurl) {
            console.log("curling");
            res.set("Content-Type", "text/plain; charset=utf-8")
            res.send(`Usage - send POST to /grades with body = \n{\n  values : [\n    { "grade" : number, "credits" : number, "achieved": boolean|undefined}\n  ]\n}. \nExample curl: 'curl -X POST -H "Content-Type: application/json" -d @grades.json https://kc67.host.cs.st-andrews.ac.uk/grades'`);
        } else {
            console.log("browsering");
            res.render('grade', {title: "Grades Help"});
        }
    };


/**
 * Used to route "/grades"
 * "/" receives POST of grades and sends expected back.
 * @type {Router} express router object.
 */
const gradeRouter = express.Router();
gradeRouter.post('/', grades);
gradeRouter.get('/', gradesHelp);

export default gradeRouter;

function calculate(e: [rowString]) {
    return new Promise<results>((resolve, reject) => {
        const t: rowNumber[] = [];
        let n = !0;
        e.forEach(eo => {
            let grade = parseFloat(eo.grade);
            let credits = parseInt(eo.credits);
            let achieved = eo.achieved !== false;
            if (validateRow(grade, credits)) {
                t.push({
                    grade: grade,
                    credits: credits,
                    achieved: achieved
                });
            } else {
                n = !1;
            }
        });
        if (n) {
            console.log(t);
            const achieved = calculateResult(t.filter(r => r.achieved));
            const will_achieve = calculateResult(t);
            resolve({achieved: achieved, will_achieve: will_achieve});
        } else {
            reject();
        }
    })
}

function calculateResult(t: rowNumber[]) {
    const meanVal = CWM(t);
    const medianVal = CWMedian(t);
    const mean: string = oneDecimalPlace(meanVal);
    const median: string = oneDecimalPlace(medianVal);
    const degreeClass: string = classificationFromGrades(meanVal, medianVal);
    return { mean: mean, median: median, class: degreeClass};
}
interface results {
    achieved: result;
    will_achieve: result | undefined
}
interface result {
    mean: string;
    median: string;
    class: string;
}

interface rowString {
    grade: string;
    credits: string;
    achieved: boolean|undefined;
}

interface rowNumber {
    grade: number;
    credits: number;
    achieved: boolean;
}
function validateRow(grade: number, credits: number) {
    return isNaN(grade) || 0 > grade || grade > 20 || isNaN(credits) || 0 > credits || credits > 120 || !isInt(credits) ? !1 : !0
}
function isInt(e: any) {
    return parseFloat(e) != parseInt(e, 10) || isNaN(e) ? !1 : !0
}
function oneDecimalPlace(e: number) {
    var t = Math.round(10 * e) / 10;
    return t.toFixed(1)
}
function CWM(e: rowNumber[]) {
    for (var t = 0, n = 0, o = 0; o < e.length; o++)
        t += e[o].grade * e[o].credits, n += e[o].credits;
    return t / n
}
function CWMedian(e: rowNumber[]) {
    e.sort(function (e, t) {
        return e.grade - t.grade
    });
    for (var t = 0, n = 0; n < e.length; n++)
        t += e[n].credits;
    var o = (t + 1) / 2;
    if (isInt(o)) {
        for (t = 0, n = 0; n < e.length; n++)
            if (t += e[n].credits, t >= o)
                return e[n].grade
    } else
        for (t = 0, n = 0; n < e.length; n++) {
            if (t += e[n].credits, o - .5 == t && o + .5 > t)
                return (e[n + 1].grade + e[n].grade) / 2;
            if (t > o)
                return e[n].grade
        }
}

function classificationFromGrades(mean: number, median: number) {
    return mean >= 16.5 ? "First Class Honours" : mean >= 16 && median >= 16.5 ? "First Class Honours" : mean >= 13.5 ? "Upper Second Class Honours (II.1)" : mean >= 13 && median >= 13.5 ? "Upper Second Class Honours (II.1)" : mean >= 10.5 ? "Lower Second Class Honours (II.2)" : mean >= 10 && median >= 10.5 ? "Lower Second Class Honours (II.2)" : mean >= 7.5 ? "Third Class Honours" : mean >= 7 && median >= 7.5 ? "Third Class Honours" : 'a degree "Not of Honours Standard"'
}