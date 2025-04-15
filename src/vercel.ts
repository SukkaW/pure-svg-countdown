import { Hono } from 'hono';
import { createApp } from './main';
import { handle } from 'hono/vercel';

const app = createApp(new Hono());

export const GET = handle(app);
