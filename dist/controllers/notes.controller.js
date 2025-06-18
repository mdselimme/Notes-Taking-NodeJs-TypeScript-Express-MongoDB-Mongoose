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
const notes_model_1 = __importDefault(require("../models/notes.model"));
const notesRouter = express_1.default.Router();
notesRouter.post('/create-note', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        // approach 1 
        /* const myNote = new Note({
            title: "Learning Node",
            tags: {
                label: "database"
            }
        });
        await myNote.save(); */
        // approach 2 
        const note = yield notes_model_1.default.create(body);
        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: note
        });
    }
    catch (error) {
        console.log(error);
    }
}));
notesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_model_1.default.find().populate("user");
        res.status(201).json({
            success: true,
            message: "Note find successfully",
            notes
        });
    }
    catch (error) {
        console.log(error);
    }
}));
notesRouter.get('/notes/:noteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.noteId;
        const note = yield notes_model_1.default.findById(noteId);
        res.status(201).json({
            success: true,
            message: "Note find successfully",
            note
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = notesRouter;
