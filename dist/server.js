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
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
}));
app.post('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, color, completed } = req.body;
    if (!title || !color) {
        res.status(400).json({ message: 'Title and color are required' });
    }
    try {
        const task = yield prisma.task.create({
            data: {
                title,
                color,
                completed: completed || false,
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create task', error });
    }
}));
app.get('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield prisma.task.findUnique({
            where: { id: Number(id) },
        });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch the task', error });
    }
}));
app.put('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    try {
        const task = yield prisma.task.update({
            where: { id: Number(id) },
            data: { title, color, completed },
        });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
}));
app.delete('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.task.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
}));
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
