import * as express from 'express';
import * as cluster from "cluster";
import * as logger from 'morgan';
import * as path from "path";
import * as createError from 'http-errors';
import Error from './shared/error';

import bodyParser = require("body-parser");
import indexRouter from "./routes";

import queryRouter from "./routes/query";

const app = express();

if (cluster.isMaster) {

    console.log("aaaa2")
// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

// Routing
    console.log("aaaa3")
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/info', queryRouter);
    app.use('/', indexRouter);
    console.log("aaaa4")

// Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

// Error handler
    app.use((err: Error, req: express.Request, res: express.Response) => {
        // Set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // Render the error page
        res.status(err.status || 500);
        res.render('error');

    });
}


export default app;
