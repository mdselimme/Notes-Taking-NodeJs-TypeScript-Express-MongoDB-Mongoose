import express, { Application, Request, Response } from 'express';
const app: Application = express();
app.use(express.json());

// Routes Import 
import notesRouter from '../controllers/notes.controller';
import usersRouter from '../controllers/users.controller';

// Notes Router Use 
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("Server is Running...");
});

export default app; 