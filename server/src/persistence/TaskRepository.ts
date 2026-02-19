import { pool } from '../config/db';
import { Task } from '../models/task';

export class TaskRepository{
    async getAll(): Promise<Task[]> {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    }

    async getOne(id: string): Promise<Task>{
        const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return rows[0];
    }

    async create(title: string, description: string): Promise<Task> {
        const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [title, description]);
        return rows[0];
    }

    async update (id: string, title: string, description: string): Promise<void> {
        await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3', [title, description, id]);
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    }
}