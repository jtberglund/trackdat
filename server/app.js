"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1["default"]();
var PORT = process.env.PORT || 8080;
app.use(cors_1["default"]({
    origin: 'http://localhost:5000'
}));
// define a route handler for the default home page
app.get('/', function (req, res) {
    res.send('Hello worlds!');
});
// start the Express server
app.listen(PORT, function () {
    console.log("server started at http://localhost:" + PORT);
});
