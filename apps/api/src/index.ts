import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.API_PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const UserSchema = z.object({
  email: z.string().email('Invalid email address'),
});

app.post('/users', async (req, res) => {
  try {
    const { email } = UserSchema.parse(req.body);
    
    const user = await prisma.user.create({
      data: {
        email,
      },
    });
    
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}

export default app;
