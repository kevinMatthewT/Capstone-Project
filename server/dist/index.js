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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const ConnectionString = process.env.CONNECTION_DETAILS;
mongoose_1.default.connect("mongodb://localhost:27017/techasia", {})
    .then(() => (console.log("connected")))
    .catch((err) => (console.log(err)));
//get operations
app.get('/', (req, res) => {
    res.send("hello from the backend");
});
app.get("/api/get/investment", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInvestments = yield InvestorSchema_1.default.find({});
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Company/filter/:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const allInvestments = yield InvestorSchema_1.default.find({ Company: { $regex: filtername } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Domicile/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const allInvestments = yield InvestorSchema_1.default.find({ Domicile: { $regex: filtername } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Year_Of_Operation/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const numFilter = Number(filtername);
        const allInvestments = yield InvestorSchema_1.default.find({ Year_Of_Operation: { $gte: numFilter } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Business/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const allInvestments = yield InvestorSchema_1.default.find({ Business: { $regex: filtername } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Percentage_Ownership/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const numFilter = Number(filtername);
        const allInvestments = yield InvestorSchema_1.default.find({ Percentage_Ownership: { $gte: numFilter } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Price_Asset/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const numFilter = Number(filtername);
        const allInvestments = yield InvestorSchema_1.default.find({ Price_Asset: { $gte: numFilter } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/Date_Of_Ownership/filter:filtername", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtername = req.params.filtername;
        const allInvestments = yield InvestorSchema_1.default.find({ Date_Of_Ownership: { $gte: filtername } });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
app.get("/api/get/investment/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const allInvestments = yield InvestorSchema_1.default.findOne({ _id: uid });
        res.status(200).json(allInvestments);
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not found" }));
    }
}));
//post operations
app.post("/api/post/investment", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Company, Company_Investor, Domicile, Year_Of_Operation, Business, Percentage_Ownership, Revenue, Expense, Ebida, Tax_Investment, Price_Asset, Price_Liability, Equity, COGS, //cost of good sales
    Date_Of_Ownership } = req.body;
    const newInvestment = new InvestorSchema_1.default({
        Company,
        Company_Investor,
        Domicile,
        Year_Of_Operation,
        Business,
        Percentage_Ownership,
        Revenue,
        Expense,
        Ebida,
        Tax_Investment,
        Price_Asset,
        Price_Liability,
        Equity,
        COGS,
        Date_Of_Ownership
    });
    try {
        // res.send(newInvestment);
        yield newInvestment.save();
        res.status(200).json({ status: "Investment saved" });
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not saved" }));
    }
}));
app.post("/api/post/investment/many", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const multipleInvestments = req.body;
    if (!Array.isArray(multipleInvestments)) {
        res.status(400).json({
            error: "Request body must be an array of investments.",
        });
        return;
    }
    const Investments = multipleInvestments.map((item) => ({
        Company: item.Company,
        Company_Investor: item.Company_Investor,
        Domicile: item.Domicile,
        Year_Of_Operation: item.Year_Of_Operation,
        Business: item.Business,
        Percentage_Ownership: item.Percentage_Ownership,
        Revenue: item.Revenue,
        Expense: item.Expense,
        Ebida: item.Ebida,
        Tax_Investment: item.Tax_Investment,
        Price_Asset: item.Price_Asset,
        Price_Liability: item.Price_Liability,
        Equity: item.Equity,
        COGS: item.COGS,
        Date_Of_Ownership: item.Date_Of_Ownership,
    }));
    try {
        yield InvestorSchema_1.default.insertMany(Investments);
        res.status(200).json({ status: "Investment saved" });
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not saved" }));
    }
}));
//delete 
app.delete("/api/delete/investment/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield InvestorSchema_1.default.deleteOne({ _id: id });
        res.status(200).json({ status: "Investment deleted" });
    }
    catch (error) {
        console.error(error);
    }
}));
//post
app.put("/api/update/investment/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Company, Company_Investor, Domicile, Year_Of_Operation, Business, Percentage_Ownership, Revenue, Expense, Ebida, Tax_Investment, Price_Asset, Price_Liability, Equity, COGS, Date_Of_Ownership } = req.body;
    const uid = req.params.id;
    try {
        yield InvestorSchema_1.default.updateOne({ _id: uid }, {
            $set: {
                Company: Company,
                Company_Investor: Company_Investor,
                Domicile: Domicile,
                Year_Of_Operation: Year_Of_Operation,
                Business: Business,
                Percentage_Ownership: Percentage_Ownership,
                Revenue: Revenue,
                Expense: Expense,
                Ebida: Ebida,
                Tax_Investment: Tax_Investment,
                Price_Asset: Price_Asset,
                Price_Liability: Price_Liability,
                Equity: Equity,
                COGS: COGS,
                Date_Of_Ownership: Date_Of_Ownership
            }
        });
        res.status(200).json({ status: "Investment saved" });
    }
    catch (error) {
        console.error(error);
        next(res.status(500).json({ error: "Investments not saved" }));
    }
}));
app.listen(port, () => (console.log(`server is running at port ${port}`)));
