import debug0 = require("debug");
import express = require("express");
const fetch = require("node-fetch");

const debug = debug0("cheem:app:weather");

/**
 * Handles weather.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 */
export const weatherRequest: express.RequestHandler = async (req, res) => {
    const owmId = req.query.owm;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const ownUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${owmId}`;
    const response = await fetch(ownUrl);
    debug({response});
    res.sendStatus(204);
    // res.render("weather", {title: "Kathan Cheema - Weather"});
};
