import { pool } from '../config/db';
import { Task } from '../models/task';

export class TaskRepository{
    async getAll(): Promise<Task[]> {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        return rows;
    }

    async create(title: string, description: string): Promise<Task> {
        const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [title, description]);
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    }
}