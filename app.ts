import * as cors from "cors";
import * as deb from "debug";
import * as express from "express";
import * as helmet from "helmet";
import * as createError from "http-errors";
import * as logger from "morgan";
import * as path from "path";
import gradeRouter from "./routes/grade";
import indexRouter from "./routes/index";
import personalRouter from "./routes/personal";
import weatherRouter from "./routes/weather";
import bodyParser = require("body-parser");

const app = express();
logger.token("agent", (req: express.Request) => {
    return String(req.get("User-Agent")).startsWith("curl") ? "[ curl ]" : "[browser]";
});
const debug = deb("cheem:app:setup");
debug("Starting router.");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger(":date[clf] :agent :req[X-Real-IP] :method :url :status :response-time ms"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet({hsts: false}));
app.use(cors({origin: true}));

// Routing
debug("Setting routing preferences.");
app.use(express.static(path.join(__dirname, "public")));
app.use("/personal", personalRouter);
app.use("/grades", gradeRouter);
app.use("/weather", weatherRouter);
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");

});
debug("Set up router.");

export default app;
