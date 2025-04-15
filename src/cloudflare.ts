import { Hono } from 'hono/quick';
import { createApp } from './main';

export default createApp(new Hono());
