"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const InvestorSchema_1 = __importDefault(require("./models/InvestorSchema"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const ConnectionString = process.env.CONNECTION_DETAILS;
mongoose_1.default.connect("mongodb://localhost:27017/techasia")
    .then(() => (console.log("connected")))
    .catch((err) => (console.log(err)));
//get operations
app.get('/', (req, res) => {
    res.send("hello from the backend");
});
app.get("/api/get/investments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInvestments = yield InvestorSchema_1.default.find({});
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Investments not found" });
    }
}));
//post operations
app.post("/api/post/investment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Company, Domicile, Year_Of_Operation, Busienss, Percentage_Ownership, Price_Asset, Date_Of_Ownership } = req.body;
        const newInvestment = new InvestorSchema_1.default({
            Company,
            Domicile,
            Year_Of_Operation,
            Busienss,
            Percentage_Ownership,
            Price_Asset,
            Date_Of_Ownership
        });
        res.send(newInvestment);
        yield newInvestment.save();
        res.status(200).json({ status: "Investment saved" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Investments not saved" });
    }
}));
app.listen(port, () => (console.log(`server is running at port ${port}`)));
