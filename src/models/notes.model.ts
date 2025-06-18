import { model, Schema } from "mongoose";
import { INote } from "../interfaces/notes.interface";


const noteSchema = new Schema<INote>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ["personal", "work", "study", "other"],
        default: "personal"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "gray" }
    }
});

const Note = model("Note", noteSchema);

export default Note;