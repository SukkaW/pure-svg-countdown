import { handle } from 'hono/vercel';
import { app } from './main';

export const GET = handle(app);
