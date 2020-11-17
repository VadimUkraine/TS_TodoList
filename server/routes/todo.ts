import { Router, Request, Response } from 'express';
import path from 'path';
import todos from '../db/todos';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    res.status(200);
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/api/todos', (req: Request, res: Response) => {
  try {
    res.status(200).json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error with getting todo list',
    });
  }
});

router.post('/api/todos', async (req: Request, res: Response) => {
  try {
    await todos.unshift(req.body);
    res.status(201).json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error with adding todo',
    });
  }
});

router.delete('/api/todos', async (req: Request, res: Response) => {
  try {
    const index = todos.findIndex((todo) => (todo.id === req.body.id));
    await todos.splice(index, 1);
    res.status(200).json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error with deleting todo',
    });
  }
});

router.put('/api/todos', async (req: Request, res: Response) => {
  try {
    const index = todos.findIndex((todo) => (todo.id === req.body.id));
    await todos.splice(index, 1);
    await todos.unshift(req.body);
    res.status(200).json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error with editing todo',
    });
  }
});

export default router;
