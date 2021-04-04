import { VercelRequest, VercelResponse } from '@vercel/node';
import { finishAppearStyle, mainStyle, timerDisappearStyle, svgBegin, svgContainerBegin, svgContainerEnd, svgEnd, svgForeignObjectBegin, svgForeignObjectEnd } from './contants';

export default async (request: VercelRequest, response: VercelResponse): Promise<void> => {
  const { time, title, finish: finishText, bgColor, borderColor } = request.query;

  response.setHeader('content-type', 'image/svg+xml');
  response.status(200).send(buildSvg(time, title, finishText, bgColor, borderColor));
};

const padNumber = (num: number): string => String(num).padStart(2, '0');

function buildSvg(
  time: string | string[],
  title: string | string[] = 'Countdown',
  finish: string | string[] = 'The auction has expired',
  bgColor: string | string[] = '#EDEDED',
  borderColor: string | string[] = '#000'
): string {
  if (Array.isArray(time)) time = time.join('');
  if (Array.isArray(title)) title = title.join(' ');
  if (Array.isArray(bgColor)) bgColor = bgColor.join('');
  if (Array.isArray(borderColor)) borderColor = borderColor.join('');

  let style = '';
  let timerDiv = '';

  try {
    const endDate = new Date(time);
    const end = endDate.getTime();
    const now = new Date().getTime();

    let seconds = (end - now) / 1000;
    const allSecondsLeft = Math.round(seconds);

    if (allSecondsLeft > 0) {
      const daysLeft = Math.floor(allSecondsLeft / 86400);
      seconds = allSecondsLeft - daysLeft * 86400;
      const daysDelay = seconds;

      const hoursLeft = Math.floor(seconds / 3600);
      seconds = seconds - hoursLeft * 3600;
      const hoursDelay = seconds;

      const minutesLeft = Math.floor(seconds / 60);
      seconds = seconds - minutesLeft * 60;
      const secondsLeft = Math.round(seconds);
      const minutesDelay = secondsLeft;

      style += `.seconds::after { content: "${secondsLeft}"; animation-name: countdown-seconds; animation-duration: 60s; }`;
      style += `.minutes::after { content: "${minutesLeft}"; animation-name: countdown-minutes; animation-duration: 3600s; animation-delay: ${minutesDelay}s }`;
      style += `.hours::after { content: "${hoursLeft}"; animation-name: countdown-hours; animation-duration: 86400s; animation-delay: ${hoursDelay}s }`;
      style += `.days::after { content: "${daysLeft}"; animation-name: countdown-days; animation-duration: ${daysLeft * 86400}s; animation-delay: ${daysDelay}s }`;
      style += `.timer { opacity: 100%; animation-name: timer-disappear; animation-duration: 1s; animation-timing-function:step-end;animation-direction: normal; animation-play-state: running; animation-fill-mode: forwards; animation-delay: ${allSecondsLeft - 1}s }`;
      style += `.finish { opacity: 0%; animation-name: finish-appear; animation-duration: 1s; animation-timing-function:step-end; animation-direction: normal; animation-play-state: running; animation-fill-mode: forwards; animation-delay: ${allSecondsLeft - 1}s }`;

      style += createKeyframes(secondsLeft - 1, 60, 'seconds');
      style += createKeyframes(minutesLeft - 1, 60, 'minutes');
      style += createKeyframes(hoursLeft - 1, 24, 'hours');
      style += createKeyframes(daysLeft - 1, daysLeft, 'days');
      style += timerDisappearStyle + finishAppearStyle;

      timerDiv += '<div class="contain">';
      timerDiv += '<div class="timer">';
      timerDiv += '<span class="days"></span>d ';
      timerDiv += '<span class="hours"></span>h ';
      timerDiv += '<span class="minutes"></span>m ';
      timerDiv += '<span class="seconds"></span>s';
      timerDiv += '</div>';
      timerDiv += `<div class="finish"><span class="error">${finish}</span></div>`;
      timerDiv += '</div>';
    } else {
      timerDiv = `<div class="contain"><div class="timer"><span class="error">${finish}</span></div></div>`;
    }

    timerDiv += `<div class="end">End: ${formatTime(endDate)}</div>`;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    timerDiv = '<div class="timer"><span class="error">There is something goes wrong here!</span></div>';
  }

  let result = '';

  result += svgBegin;
  result += svgForeignObjectBegin;

  result += '<style>';
  result += mainStyle + style;

  result += '.main {';
  // Fallbacks, in case user input background color is invalid
  result += 'background: #ededed;';
  result += 'border-color: #000;';
  result += `background: ${bgColor};`;
  result += `border-color: ${borderColor};`;
  result += '}';

  result += '.divider {';
  result += 'background: #000;';
  result += `background: ${borderColor};`;
  result += '}';

  result += '</style>';
  result += svgContainerBegin;
  result += '<div class="main">';
  result += `<div class="title">${title}</div>`;
  result += '<hr class="divider" />';

  result += timerDiv;

  result += '</div>';
  result += svgContainerEnd;
  result += svgForeignObjectEnd;
  result += svgEnd;

  return result;
}

function formatTime(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${padNumber(date.getUTCHours())}:${padNumber(date.getUTCMinutes())}:${padNumber(date.getUTCSeconds())} UTC`;
}

function createKeyframes(start: number, steps: number, name: string): string {
  let result = `@keyframes countdown-${name} {`;

  for (let i = 0; i < steps; i++) {
    result += `${((100 / steps) * i).toFixed(2)}%{`;
    result += `content: "${start - i >= 0 ? start - i : steps + start - i}"`;
    result += '}';
  }

  result += '100%{';
  result += `content:"${start - steps + 1 >= 0 ? start - steps + 1 : start + 1}"`;
  result += '}';

  result += '}';
  return result;
}
