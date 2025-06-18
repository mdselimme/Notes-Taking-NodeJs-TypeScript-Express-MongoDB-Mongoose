import express, { Request, Response, Router } from 'express';
import Note from '../models/notes.model';
const notesRouter: Router = express.Router();



notesRouter.post('/create-note', async (req: Request, res: Response) => {
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
        const note = await Note.create(body);

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note: note
        })
    } catch (error) {
        console.log(error)
    }
});


notesRouter.get('/', async (req: Request, res: Response) => {
    try {

        const notes = await Note.find().populate("user");

        res.status(201).json({
            success: true,
            message: "Note find successfully",
            notes
        })
    } catch (error) {
        console.log(error)
    }
});

notesRouter.get('/notes/:noteId', async (req: Request, res: Response) => {
    try {
        const noteId = req.params.noteId;
        const note = await Note.findById(noteId)

        res.status(201).json({
            success: true,
            message: "Note find successfully",
            note
        })
    } catch (error) {
        console.log(error)
    }
});


export default notesRouter;