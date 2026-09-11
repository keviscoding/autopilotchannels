// One weekly slot, defined once. Every date on the registration page is
// computed from it, so a link in a video description from three months ago
// still lands on "the next session" instead of a dead date.

export const WEBINAR = {
  weekday: 3, // 0 = Sunday
  hour: 16, // 24h clock, in the timeZone below
  minute: 0,
  // Set in the host's own timezone, so the slot never drifts for the host
  // when the clocks change. 16:00 London is 11am New York and 8am Los Angeles.
  timeZone: 'Europe/London',
  durationMinutes: 75,
  // People arriving late can still be let in, and until this window closes
  // the page keeps pointing at today's session rather than next week's.
  joinWindowMinutes: 20,
  title: 'HeadStart Channels live workshop',
  summary:
    'How a faceless YouTube channel actually gets built: judging a niche, where the video ideas come from, who makes the videos and what it costs. Live with Kevis.',
  // Where "Save my place" sends people: the hosted registration form URL from
  // whatever captures emails (Brevo free to start). Every register button on
  // both pages switches to it, with the ?source= tag from the video description
  // appended so attribution survives. Set that form's redirect to
  // /#/webinar/confirmed so we keep the calendar links, the Telegram prompt and
  // the apply-now path. If the form can be embedded instead, we do that on the
  // page and drop this.
  registrationUrl: '',
  // Fallback capture if we ever run registration through Typeform instead.
  typeformId: '',
  telegram: '',
};

export type Session = { start: Date; end: Date };

/** Milliseconds to add to a UTC instant to get wall-clock time in `timeZone`. */
function zoneOffsetMs(instant: Date, timeZone: string): number {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of fmt.formatToParts(instant)) {
    if (part.type !== 'literal') p[part.type] = part.value;
  }
  const asUtc = Date.UTC(
    Number(p.year),
    Number(p.month) - 1,
    Number(p.day),
    Number(p.hour) % 24,
    Number(p.minute),
    Number(p.second),
  );
  return asUtc - instant.getTime();
}

/** The calendar date, in `timeZone`, that a UTC instant falls on. */
function zonedDate(instant: Date, timeZone: string) {
  const off = zoneOffsetMs(instant, timeZone);
  const shifted = new Date(instant.getTime() + off);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
  };
}

/** The UTC instant for a wall-clock time in `timeZone`. */
function zonedToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = Date.UTC(year, month, day, hour, minute);
  // Resolve twice: the first correction can land on the other side of a
  // daylight saving change, which shifts the offset again.
  let instant = new Date(guess - zoneOffsetMs(new Date(guess), timeZone));
  instant = new Date(guess - zoneOffsetMs(instant, timeZone));
  return instant;
}

export function nextSession(now: Date = new Date()): Session {
  const { weekday, hour, minute, timeZone, durationMinutes, joinWindowMinutes } = WEBINAR;
  for (let i = 0; i <= 14; i++) {
    const probe = new Date(now.getTime() + i * 86400000);
    const d = zonedDate(probe, timeZone);
    if (d.weekday !== weekday) continue;
    const start = zonedToUtc(d.year, d.month, d.day, hour, minute, timeZone);
    if (start.getTime() + joinWindowMinutes * 60000 > now.getTime()) {
      return { start, end: new Date(start.getTime() + durationMinutes * 60000) };
    }
  }
  // Unreachable in practice: any weekday occurs inside a 14 day window.
  const fallback = new Date(now.getTime() + 7 * 86400000);
  return { start: fallback, end: new Date(fallback.getTime() + durationMinutes * 60000) };
}

export function isLive(session: Session, now: Date = new Date()): boolean {
  return now >= session.start && now <= session.end;
}

/** "Wednesday, September 17" in the visitor's own timezone. */
export function formatDay(d: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/** "7:00 PM" in the visitor's own timezone. */
export function formatTime(d: Date): string {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(d);
}

export function formatWeekdayOnly(d: Date): string {
  return new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(d);
}

/** "GMT+1", "EDT", whatever the visitor's browser reports. */
export function localZoneLabel(d: Date): string {
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    timeZoneName: 'short',
  }).formatToParts(d);
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
}

function stamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function googleCalendarUrl(s: Session): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: WEBINAR.title,
    dates: `${stamp(s.start)}/${stamp(s.end)}`,
    details: WEBINAR.summary,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsHref(s: Session): string {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HeadStart Channels//Workshop//EN',
    'BEGIN:VEVENT',
    `UID:${stamp(s.start)}-workshop@headstartchannels.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(s.start)}`,
    `DTEND:${stamp(s.end)}`,
    `SUMMARY:${WEBINAR.title}`,
    `DESCRIPTION:${WEBINAR.summary}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}
