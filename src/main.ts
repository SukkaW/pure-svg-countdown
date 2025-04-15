import { IttyRouter, error } from 'itty-router';
import { buildSvg } from './lib';

export const app = IttyRouter();

function joinString(str: string | string[]) {
  if (typeof str === 'string') {
    return str;
  }
  return str.join('');
}

app.get('/timer', ({ query }) => {
  const time = query.time;
  if (!time) {
    return error(
      400,
      'The "time" parameter is required in the query string.'
    );
  }

  const title = query.title || 'Countdown';
  const finishText = query.finish || 'The countdown has expired';
  const bgColor = query.bgColor || '#EDEDED';
  const borderColor = query.borderColor || '#000';
  const fontColor = query.fontColor || '#000';

  const svg = buildSvg(
    joinString(time),
    joinString(title),
    joinString(finishText),
    joinString(bgColor),
    joinString(borderColor),
    joinString(fontColor)
  );

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'X-Robots-Tag': 'noindex'
    }
  });
});

app.get('/*', c => fetch(c.url, c));
