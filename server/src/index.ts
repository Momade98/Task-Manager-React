import express, { Request, Response, NextFunction } from 'express';
import { TaskRepository } from './persistence/TaskRepository';
import cors from 'cors';

const app = express();
const taskRepo = new TaskRepository();

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await taskRepo.getAll();
    res.json(tasks);
});


app.post('/tasks', async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTask = await taskRepo.create(title, description);
    res.status(201).json(newTask);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});