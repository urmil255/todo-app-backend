import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
});


app.post('/api/tasks', async (req: Request, res: Response) => {
  const { title, color, completed } = req.body;

  if (!title || !color) {
     res.status(400).json({ message: 'Title and color are required' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        color,
        completed: completed || false,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
});

app.get('/api/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
       res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the task', error });
  }
});

app.put('/api/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
});


app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
