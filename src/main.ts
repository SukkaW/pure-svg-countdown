import type { Hono } from 'hono';
import { buildSvg } from './lib';

export function createApp(app: Hono) {
  app.get('/timer', c => {
    c.header('X-Robots-Tag', 'noindex');

    const time = c.req.query('time');
    if (!time) {
      c.status(400);
      return c.text('The "time" parameter is required in the query string.');
    }

    const title = c.req.query('title') || 'Countdown';
    const finishText = c.req.query('finish') || 'The countdown has expired';
    const bgColor = c.req.query('bgColor') || '#EDEDED';
    const borderColor = c.req.query('borderColor') || '#000';
    const fontColor = c.req.query('fontColor') || '#000';

    const svg = buildSvg(
      time,
      title,
      finishText,
      bgColor,
      borderColor,
      fontColor
    );

    c.header('Content-Type', 'image/svg+xml');
    c.status(200);

    return c.text(svg);
  });

  app.get('*', c => fetch(c.req.url, c.req.raw));

  return app;
}
