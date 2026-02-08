import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Task } from '../models/task';

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
    body('title').notEmpty().withMessage('title is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('completed').isBoolean().withMessage('Completed must be boolean'),
];



// Create
router.post('/', taskValidationRules, (req: Request, res: Response) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(task);
    res.status(201).json(task);
});

// get all tasks
router.get('/', (req: Request, res: Response) => {
    res.json(tasks);
});

// get a single task
router.get('/:id', taskValidationRules, (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id as string));
  
    if (!task) {
      res.status(404).send('Task not found');
    } else {
      res.json(task);
    }
});


// Udpate
router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  

    const task = tasks.find((t) => t.id === parseInt(req.params.id as string));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task);
    }
});


// Delete
router.delete('/:id', (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id as string));

    if(index === -1){
        res.status(404).send('Task not found');
    } else {
        tasks.splice(index, 1);
        res.status(204).send();
    }

});

export default router;