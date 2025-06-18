"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes Import 
const notes_controller_1 = __importDefault(require("../controllers/notes.controller"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
// Notes Router Use 
app.use('/notes', notes_controller_1.default);
app.use('/users', users_controller_1.default);
app.get('/', (req, res) => {
    res.send("Server is Running...");
});
exports.default = app;
