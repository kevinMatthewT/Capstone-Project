"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const ConnectionString = process.env.CONNECTION_DETAILS;
mongoose_1.default.connect("mongodb://localhost:27017/techasia")
    .then(() => (console.log("connected")))
    .catch((err) => (console.log(err)));
app.get('/', (req, res) => {
    res.send("hello from the backend");
});
app.listen(port, () => (console.log(`server is running at port ${port}`)));
