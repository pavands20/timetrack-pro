// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Clock } = Icons;

const PROJECTS = [
  { id: 'p1', name: 'Website redesign', client: 'Northgate Bakery', billable: true, tasks: ['Design', 'Development', 'Content review'] },
  { id: 'p2', name: 'Brand guidelines refresh', client: 'Fernhill Garden Centre', billable: true, tasks: ['Research', 'Layout', 'Handover'] },
  { id: 'p3', name: 'Studio operations', client: 'Internal', billable: false, tasks: ['Team meetings', 'Training', 'Planning'] },
];

const ALERTS = [
  { id: 'a1', text: 'Your timesheet for 26/10/2026 – 01/11/2026 was approved by Priya Raman.', when: '03/11/2026 17:40' },
  { id: 'a2', text: 'Annual leave 23/12/2026 – 24/12/2026 was approved.', when: '02/11/2026 09:15' },
  { id: 'a3', text: 'Sofia Lindqvist asked you to confirm Friday’s task on Brand guidelines refresh.', when: '30/10/2026 16:05' },
];

const SHEET_STATUS = 'Draft';
const BASE_NOW_MIN = 15 * 60 + 32;
const pad = (n) => String(n).padStart(2, '0');
const fmtDur = (m) => (m <= 0 ? '0h' : `${Math.floor(m / 60)}h ${pad(m % 60)}m`);
const fmtClock = (m) => `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`;
const fmtHMS = (s) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

function PlayIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
    </svg>
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const clay = `color-mix(in srgb, ${brand.accentColor} 50%, ${brand.primaryColor} 50%)`;
  const canvas = brand.backgroundColor;
  const tint = `color-mix(in srgb, ${ink} 7%, ${canvas})`;
  const tintStrong = `color-mix(in srgb, ${ink} 12%, ${canvas})`;
  const muted = `color-mix(in srgb, ${ink} 74%, ${canvas})`;
  const shadow = `0 10px 28px color-mix(in srgb, ${ink} 11%, transparent)`;
  const serif = { fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600, color: ink };

  const [status, setStatus] = React.useState('in'); // in | break | out
  const [tick, setTick] = React.useState(0);
  const [worked, setWorked] = React.useState(21600);
  const [breakSec, setBreakSec] = React.useState(1800);
  const [closedToday, setClosedToday] = React.useState(0);
  const [session, setSession] = React.useState({ start: '09:02', project: 'p1', task: 'Design', billable: true });
  const [projectId, setProjectId] = React.useState('');
  const [task, setTask] = React.useState('');
  const [billable, setBillable] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [notice, setNotice] = React.useState(null);
  const [alertsOpen, setAlertsOpen] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      if (status === 'in') setWorked((w) => w + 1);
      else if (status === 'break') setBreakSec((b) => b + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  const nowMin = BASE_NOW_MIN + Math.floor(tick / 60);
  const nowLabel = fmtClock(nowMin);
  const locked = SHEET_STATUS === 'Submitted' || SHEET_STATUS === 'Approved';
  const clockedIn = status !== 'out';
  const runningMin = clockedIn ? Math.floor(worked / 60) : 0;
  const todayMin = closedToday + runningMin;
  const dayMins = [480, 450, todayMin, 0, 0, 0, 0];
  const weekMin = dayMins.reduce((a, b) => a + b, 0);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayDates = ['02/11', '03/11', '04/11', '05/11', '06/11', '07/11', '08/11'];
  const proj = PROJECTS.find((p) => p.id === (session && session.project));
  const selected = PROJECTS.find((p) => p.id === projectId);
  const unread = ALERTS.length;

  const onProject = (e) => {
    const id = e.target.value;
    setProjectId(id);
    setTask('');
    const p = PROJECTS.find((x) => x.id === id);
    if (p) setBillable(p.billable);
    setErrors((er) => ({ ...er, project: undefined }));
  };

  const clockIn = (e) => {
    e.preventDefault();
    if (clockedIn) {
      setNotice({ tone: 'info', text: `you’re already clocked in since ${session.start} — your running entry is shown above.` });
      return;
    }
    if (locked) {
      setNotice({ tone: 'warn', text: `this week’s timesheet is ${SHEET_STATUS.toLowerCase()} and can’t be edited, so you can’t clock in.` });
      return;
    }
    const er = {};
    if (!projectId) er.project = 'choose a project so this time is charged somewhere.';
    if (!task) er.task = projectId ? 'choose a task from this project.' : 'pick a project first, then its task.';
    setErrors(er);
    if (er.project || er.task) {
      setNotice({ tone: 'warn', text: 'your clock-in hasn’t started yet — a project and task are needed first.' });
      return;
    }
    setSession({ start: nowLabel, project: projectId, task, billable });
    setWorked(0);
    setBreakSec(0);
    setStatus('in');
    setNotice({ tone: 'ok', text: `clocked in at ${nowLabel} on ${selected.name} / ${task}.` });
  };

  const startBreak = () => {
    if (status !== 'in') return;
    setStatus('break');
    setNotice({ tone: 'info', text: `break started at ${nowLabel}. your worked time is paused.` });
  };
  const endBreak = () => {
    if (status !== 'break') return;
    setStatus('in');
    setNotice({ tone: 'ok', text: `welcome back — break ended at ${nowLabel}. the break is left out of your worked time.` });
  };
  const clockOut = () => {
    if (!clockedIn) return;
    const m = Math.floor(worked / 60);
    setClosedToday((c) => c + m);
    setStatus('out');
    setNotice({ tone: 'ok', text: `clocked out at ${nowLabel}. ${fmtDur(m)} worked, ${fmtDur(Math.round(breakSec / 60))} in breaks.` });
    setWorked(0);
    setBreakSec(0);
  };

  const pillBtn = (enabled, kind) => ({
    minHeight: 48,
    borderRadius: 999,
    padding: '12px 24px',
    fontWeight: 600,
    fontSize: 15,
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: brand.fontBody,
    border: 'none',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.5,
    backgroundColor: kind === 'clay' ? clay : kind === 'ink' ? ink : tintStrong,
    color: kind === 'tint' ? ink : canvas,
  });

  const fieldStyle = (bad) => ({
    width: '100%',
    minHeight: 48,
    borderRadius: 999,
    padding: '12px 20px',
    border: 'none',
    backgroundColor: canvas,
    color: ink,
    fontSize: 15,
    fontFamily: brand.fontBody,
    boxShadow: bad ? `inset 0 0 0 2px ${clay}` : `inset 0 0 0 1px color-mix(in srgb, ${ink} 14%, transparent)`,
  });

  const noticeColor = notice && notice.tone === 'warn' ? clay : ink;

  const hint = status === 'in'
    ? 'you’re on the clock — take a break or clock out whenever you’re ready.'
    : status === 'break'
    ? 'you’re on a break. end it to resume, or clock out to finish for the day.'
    : 'break and clock-out controls wake up once you clock in.';

  const chartLabel = dayNames.map((d, i) => `${d} ${fmtDur(dayMins[i])}`).join(', ');
  const MAXMIN = 600;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12" style={{ fontFamily: brand.fontBody, color: ink }}>
      <style>{`
        .at-focus:focus-visible{outline:3px solid ${ink};outline-offset:3px}
        .at-btn{transition:filter .2s ease, transform .1s ease, background-color .2s ease}
        .at-btn:not(:disabled):hover{filter:brightness(1.08)}
        .at-btn:not(:disabled):active{transform:translateY(1px)}
        .at-card{transition:transform .25s ease, box-shadow .25s ease}
        .at-card:hover{transform:translateY(-2px)}
        .at-rise{animation:at-rise .35s ease both}
        .at-bar{transition:height .6s cubic-bezier(.2,.8,.2,1)}
        @keyframes at-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes at-pulse{0%,100%{opacity:1}50%{opacity:.35}}
        .at-dot{animation:at-pulse 2s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){
          .at-rise,.at-dot{animation:none}
          .at-btn,.at-card,.at-bar{transition:none}
          .at-card:hover{transform:none}
        }
      `}</style>

      {/* Row 1 */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
        <div className="md:col-span-8" data-wf="b-0-0">
          <h1 style={{ ...serif, fontSize: 40, lineHeight: 1.15, margin: 0 }}>Dashboard</h1>
          <p style={{ color: muted, fontSize: 15, marginTop: 8, lineHeight: 1.5 }}>
            wednesday 04/11/2026 · times shown in Europe/London
          </p>
        </div>
        <div className="md:col-span-4 md:text-right" data-wf="b-0-1">
          <button
            type="button"
            className="at-btn at-focus"
            aria-expanded={alertsOpen}
            aria-controls="alerts-panel"
            onClick={() => setAlertsOpen((o) => !o)}
            style={{ ...pillBtn(true, 'tint'), width: 'auto', backgroundColor: tintStrong }}
          >
            <Icons.Bell className="h-5 w-5" aria-hidden="true" />
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{unread} unread alerts</span>
          </button>
        </div>
      </div>

      {alertsOpen && (
        <section
          id="alerts-panel"
          aria-label="Unread alerts"
          className="at-rise"
          style={{ marginTop: 16, borderRadius: 24, backgroundColor: tint, padding: 24, boxShadow: shadow }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 16 }}>
            {ALERTS.map((a) => (
              <li key={a.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.5 }}>
                <span aria-hidden="true" style={{ marginTop: 8, width: 8, height: 8, borderRadius: 999, backgroundColor: clay, flex: 'none' }} />
                <span>
                  {a.text}
                  <span style={{ display: 'block', color: muted, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{a.when}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div role="status" aria-live="polite" style={{ minHeight: notice ? undefined : 0 }}>
        {notice && (
          <p
            key={notice.text}
            className="at-rise"
            style={{
              marginTop: 24,
              marginBottom: 0,
              borderRadius: 999,
              padding: '12px 20px',
              backgroundColor: tint,
              color: noticeColor,
              fontSize: 15,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            {notice.tone === 'warn' ? <Icons.AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Icons.CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />}
            <span>{notice.text}</span>
          </p>
        )}
      </div>

      {/* Row 2 */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-6" data-wf="b-1-0">
          <section
            aria-label="Clock status"
            style={{
              height: '100%',
              borderRadius: '50% 50% 24px 24px / 72px 72px 24px 24px',
              backgroundColor: tint,
              boxShadow: shadow,
              padding: '64px 32px 32px',
              textAlign: 'center',
            }}
          >
            {status === 'out' ? (
              <div className="at-rise">
                <p style={{ ...serif, fontSize: 24, margin: 0 }}>You’re not clocked in</p>
                <p style={{ color: muted, fontSize: 15, lineHeight: 1.5, margin: '12px auto 0', maxWidth: 320 }}>
                  choose a project and task below, then clock in to start today’s next entry.
                </p>
                <p style={{ color: muted, fontSize: 13, marginTop: 16, fontVariantNumeric: 'tabular-nums' }}>
                  worked so far today · {fmtDur(todayMin)}
                </p>
              </div>
            ) : (
              <div className="at-rise">
                <p style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: muted }}>
                  <span className="at-dot" aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: status === 'break' ? muted : clay }} />
                  {status === 'break' ? 'on a break' : 'running now'}
                </p>
                <p style={{ ...serif, fontSize: 24, margin: '8px 0 0', fontVariantNumeric: 'tabular-nums' }}>
                  Clocked in since {session.start}
                </p>
                <p style={{ fontSize: 15, margin: '8px 0 0', lineHeight: 1.5 }}>
                  {proj ? proj.name : ''} / {session.task} · {session.billable ? 'Billable' : 'Non-billable'}
                </p>
                <p style={{ fontSize: 32, fontWeight: 600, margin: '16px 0 0', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>
                  {fmtHMS(worked)}
                </p>
                <p style={{ color: muted, fontSize: 13, margin: '4px 0 0', fontVariantNumeric: 'tabular-nums' }}>
                  worked · breaks so far {fmtDur(Math.round(breakSec / 60))}
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="md:col-span-6" data-wf="b-1-1">
          <button
            type="button"
            className="at-card at-focus"
            onClick={() => navigate('timesheet')}
            aria-label={`Open weekly timesheet. Week 02/11/2026 to 08/11/2026, total ${fmtDur(weekMin)}, status ${SHEET_STATUS}`}
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'left',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 24,
              backgroundColor: tint,
              boxShadow: shadow,
              padding: 32,
              color: ink,
              fontFamily: brand.fontBody,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: muted }}>this week</span>
            <span style={{ ...serif, fontSize: 24, fontVariantNumeric: 'tabular-nums' }}>Week 02/11/2026 – 08/11/2026</span>
            <span style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: muted, marginRight: 8 }}>Total</span>
              {fmtDur(weekMin)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '4px 16px', backgroundColor: tintStrong, fontSize: 14, fontWeight: 600 }}>
                <Icons.Edit className="h-4 w-4" aria-hidden="true" />
                Status: {SHEET_STATUS}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600 }}>
                open timesheet <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Row 3 */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div data-wf="b-2-0">
          <button type="button" className="at-btn at-focus" disabled={status !== 'in'} onClick={startBreak} style={pillBtn(status === 'in', 'tint')}>
            Start break
          </button>
        </div>
        <div data-wf="b-2-1">
          <button type="button" className="at-btn at-focus" disabled={status !== 'break'} onClick={endBreak} style={pillBtn(status === 'break', 'tint')}>
            End break
          </button>
        </div>
        <div data-wf="b-2-2">
          <button type="button" className="at-btn at-focus" disabled={!clockedIn} onClick={clockOut} style={pillBtn(clockedIn, 'ink')}>
            Clock out
          </button>
        </div>
      </div>
      <p style={{ color: muted, fontSize: 13, lineHeight: 1.5, margin: '12px 0 0' }}>{hint}</p>

      {/* Row 4 */}
      <form
        id="clock-in-form"
        data-wf="b-3-0"
        onSubmit={clockIn}
        noValidate
        aria-labelledby="clock-in-heading"
        style={{ marginTop: 48, borderRadius: 24, backgroundColor: tint, padding: 32 }}
      >
        <h2 id="clock-in-heading" style={{ ...serif, fontSize: 24, margin: 0 }}>Clock in</h2>
        <p style={{ color: muted, fontSize: 15, lineHeight: 1.5, margin: '8px 0 24px' }}>
          {clockedIn
            ? 'you’re already clocked in, so this stays quiet until you clock out.'
            : 'every entry is charged to a project and task. no location is asked for or stored.'}
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="ci-project" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Project</label>
            <select
              id="ci-project"
              data-wf="i-3-0-0"
              className="at-focus"
              value={projectId}
              onChange={onProject}
              disabled={clockedIn}
              aria-invalid={!!errors.project}
              aria-describedby={errors.project ? 'ci-project-err' : undefined}
              style={{ ...fieldStyle(!!errors.project), opacity: clockedIn ? 0.55 : 1 }}
            >
              <option value="">Choose a project</option>
              {PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {p.client}</option>
              ))}
            </select>
            {errors.project && (
              <p id="ci-project-err" className="at-rise" style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, margin: '8px 0 0 8px', color: clay, fontWeight: 600 }}>
                <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />{errors.project}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ci-task" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Task</label>
            <select
              id="ci-task"
              data-wf="i-3-0-1"
              className="at-focus"
              value={task}
              onChange={(e) => { setTask(e.target.value); setErrors((er) => ({ ...er, task: undefined })); }}
              disabled={clockedIn || !selected}
              aria-invalid={!!errors.task}
              aria-describedby={errors.task ? 'ci-task-err' : undefined}
              style={{ ...fieldStyle(!!errors.task), opacity: clockedIn || !selected ? 0.55 : 1 }}
            >
              <option value="">{selected ? 'Choose a task' : 'Choose a project first'}</option>
              {selected && selected.tasks.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
            {errors.task && (
              <p id="ci-task-err" className="at-rise" style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, margin: '8px 0 0 8px', color: clay, fontWeight: 600 }}>
                <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />{errors.task}
              </p>
            )}
          </div>
          <div>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }} id="ci-bill-label">Billable</span>
            <label
              htmlFor="ci-billable"
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, borderRadius: 999, padding: '12px 20px', backgroundColor: canvas, cursor: clockedIn ? 'not-allowed' : 'pointer', opacity: clockedIn ? 0.55 : 1, boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${ink} 14%, transparent)`, fontSize: 15 }}
            >
              <input
                id="ci-billable"
                data-wf="i-3-0-2"
                className="at-focus"
                type="checkbox"
                checked={billable}
                disabled={clockedIn}
                onChange={(e) => setBillable(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: clay }}
              />
              {billable ? 'Billable time' : 'Non-billable time'}
            </label>
          </div>
        </div>
      </form>

      {/* Row 5 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4" data-wf="b-4-0">
          <button
            type="submit"
            form="clock-in-form"
            className="at-btn at-focus"
            disabled={clockedIn}
            style={pillBtn(!clockedIn, 'clay')}
          >
            <PlayIcon />
            Clock in
          </button>
        </div>
      </div>

      {/* Row 6 */}
      <section data-wf="b-5-0" aria-labelledby="chart-heading" style={{ marginTop: 48, borderRadius: 24, backgroundColor: tint, padding: 32 }}>
        <h2 id="chart-heading" style={{ ...serif, fontSize: 24, margin: 0 }}>Hours by day, Mon–Sun</h2>
        <p style={{ color: muted, fontSize: 15, margin: '8px 0 24px' }}>week of 02/11/2026 · today’s bar grows while you’re clocked in</p>
        <div role="img" aria-label={`Hours by day: ${chartLabel}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {dayNames.map((d, i) => {
            const isToday = i === 2;
            const h = Math.round((dayMins[i] / MAXMIN) * 160);
            return (
              <div key={d} aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: muted, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{fmtDur(dayMins[i])}</span>
                <div style={{ height: 160, width: '100%', maxWidth: 56, display: 'flex', alignItems: 'flex-end' }}>
                  <div
                    className="at-bar"
                    style={{
                      width: '100%',
                      height: Math.max(h, 6),
                      borderRadius: '999px 999px 8px 8px',
                      backgroundColor: dayMins[i] === 0 ? tintStrong : isToday ? clay : ink,
                      opacity: dayMins[i] === 0 || isToday ? 1 : 0.82,
                    }}
                  />
                </div>
                <span style={{ fontSize: 14, fontWeight: isToday ? 700 : 500 }}>{isToday ? `${d} · today` : d}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Row 7 */}
      <section aria-labelledby="list-heading" style={{ marginTop: 48 }}>
        <h2 id="list-heading" style={{ ...serif, fontSize: 24, margin: 0 }}>Hours this week</h2>
        <ul data-wf="b-6-0" style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gap: 8 }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const isToday = i === 2;
            return (
              <li
                key={dayNames[i]}
                data-wf={`i-6-0-${i}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  borderRadius: 999,
                  padding: '16px 24px',
                  backgroundColor: isToday ? tintStrong : tint,
                  fontSize: 15,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontWeight: isToday ? 700 : 500 }}>
                  {dayNames[i]} {dayDates[i]}
                  {isToday && (
                    <span style={{ borderRadius: 999, padding: '2px 12px', fontSize: 12, fontWeight: 600, backgroundColor: canvas }}>today</span>
                  )}
                </span>
                <span style={{ fontWeight: 600 }}>{fmtDur(dayMins[i])}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
