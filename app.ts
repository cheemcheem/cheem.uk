import * as express from 'express';
import * as cluster from "cluster";
import * as deb from 'debug';
import * as logger from 'morgan';
import * as path from "path";
import * as createError from 'http-errors';
import Error from './shared/error';

import bodyParser = require("body-parser");
import labsRouter from "./routes/labs";
import queryRouter from "./routes/query";
import gradeRouter from './routes/grade';
import indexRouter from './routes/index';


const app = express();
logger.token('agent', (req: express.Request, res: express.Response) => {
    return String(req.get("User-Agent")).startsWith("curl") ? "[ curl ]" : "[browser]"
})
if (cluster.isMaster) {
    const debug = deb('server:app');
    debug("Starting router.")

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger(':date[clf] :agent :req[X-Real-IP] :method :url :status :response-time ms'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // Routing
    debug("Setting routing preferences.")
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/info', queryRouter);
    app.use('/grades', gradeRouter);
    app.use('/labs', labsRouter);
    app.use('/', indexRouter);

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
    debug("Set up router.");
}


export default app;
