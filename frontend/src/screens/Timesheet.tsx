// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Check, X, Clock, Edit, ArrowLeft, AlertCircle, CheckCircle } = Icons;

const WEEK = [
  { key: '02/11/2026', short: 'Mon', long: 'Monday', dm: '02/11' },
  { key: '03/11/2026', short: 'Tue', long: 'Tuesday', dm: '03/11' },
  { key: '04/11/2026', short: 'Wed', long: 'Wednesday', dm: '04/11' },
  { key: '05/11/2026', short: 'Thu', long: 'Thursday', dm: '05/11' },
  { key: '06/11/2026', short: 'Fri', long: 'Friday', dm: '06/11' },
  { key: '07/11/2026', short: 'Sat', long: 'Saturday', dm: '07/11' },
  { key: '08/11/2026', short: 'Sun', long: 'Sunday', dm: '08/11' },
];
const TODAY = '04/11/2026';
const WEEK_LABEL = '02/11/2026 – 08/11/2026';

const LIMITS = { daily: 480, weekly: 2400, threshold: 360, minBreak: 20 };

const PROJECTS = [
  {
    id: 'p-fernhill',
    client: 'Fernhill Garden Centre',
    name: 'Website rebuild',
    billable: true,
    tasks: [
      { id: 't-fh-design', name: 'Design' },
      { id: 't-fh-dev', name: 'Development' },
      { id: 't-fh-review', name: 'Review' },
    ],
  },
  {
    id: 'p-marlowe',
    client: 'Marlowe Botanics',
    name: 'Seasonal catalogue',
    billable: true,
    tasks: [
      { id: 't-ma-photo', name: 'Photography' },
      { id: 't-ma-copy', name: 'Copywriting' },
      { id: 't-ma-layout', name: 'Layout' },
    ],
  },
  {
    id: 'p-internal',
    client: 'Internal',
    name: 'Studio admin',
    billable: false,
    tasks: [
      { id: 't-in-meet', name: 'Team meeting' },
      { id: 't-in-plan', name: 'Planning' },
      { id: 't-in-train', name: 'Training' },
    ],
  },
];

const INITIAL_ENTRIES = [
  { id: 1, date: '02/11/2026', projectId: 'p-fernhill', taskId: 't-fh-dev', billable: true, source: 'manual', breakMin: 30, minutes: 390 },
  { id: 2, date: '02/11/2026', projectId: 'p-internal', taskId: 't-in-meet', billable: false, source: 'manual', breakMin: 0, minutes: 60 },
  { id: 3, date: '03/11/2026', projectId: 'p-marlowe', taskId: 't-ma-layout', billable: true, source: 'manual', breakMin: 15, minutes: 405 },
  { id: 4, date: '03/11/2026', projectId: 'p-marlowe', taskId: 't-ma-copy', billable: true, source: 'manual', breakMin: 0, minutes: 120 },
  { id: 5, date: '04/11/2026', projectId: 'p-fernhill', taskId: 't-fh-design', billable: true, source: 'clock', breakMin: 20, minutes: 255 },
  { id: 6, date: '04/11/2026', projectId: 'p-internal', taskId: 't-in-plan', billable: false, source: 'manual', breakMin: 0, minutes: 60 },
];

function fmt(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0 && m === 0) return '0h';
  if (h === 0) return m + 'm';
  return h + 'h' + (m ? ' ' + m + 'm' : '');
}

function parseHours(raw) {
  const s = String(raw).trim().toLowerCase();
  let mins = null;
  let m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (m && Number(m[2]) < 60) mins = Number(m[1]) * 60 + Number(m[2]);
  if (mins === null) {
    m = s.match(/^(\d{1,2})\s*h(?:\s*(\d{1,2})\s*m?)?$/);
    if (m && Number(m[2] || 0) < 60) mins = Number(m[1]) * 60 + Number(m[2] || 0);
  }
  if (mins === null) {
    m = s.match(/^\d+(?:[.,]\d+)?$/);
    if (m) mins = Math.round(parseFloat(s.replace(',', '.')) * 60);
  }
  if (mins === null || mins <= 0 || mins > 1440) return null;
  return mins;
}

function parseDate(raw) {
  const m = String(raw).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return { error: 'enter the date as dd/mm/yyyy, for example 04/11/2026.' };
  const key = m[1].padStart(2, '0') + '/' + m[2].padStart(2, '0') + '/' + m[3];
  if (!WEEK.some((d) => d.key === key)) {
    return { error: 'that day is outside this week. pick a date from ' + WEEK_LABEL + '.' };
  }
  return { key };
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const cream = brand.backgroundColor;
  const accent = brand.accentColor;
  const muted = `color-mix(in srgb, ${ink} 76%, ${cream})`;
  const tint = `color-mix(in srgb, ${ink} 7%, ${cream})`;
  const tintStrong = `color-mix(in srgb, ${ink} 12%, ${cream})`;
  const accentTint = `color-mix(in srgb, ${accent} 20%, ${cream})`;
  const soft = `0 14px 32px -18px color-mix(in srgb, ${ink} 45%, transparent)`;
  const inset = `inset 0 1px 3px color-mix(in srgb, ${ink} 18%, transparent)`;
  const headingFont = { fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 500, color: ink };
  const arch = '50% 50% 24px 24px / 72px 72px 24px 24px';
  const tabular = { fontVariantNumeric: 'tabular-nums' };

  const [status] = React.useState('Draft');
  const locked = status === 'Submitted' || status === 'Approved';
  const [entries, setEntries] = React.useState(INITIAL_ENTRIES);
  const [nextId, setNextId] = React.useState(7);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState({ date: TODAY, projectId: '', taskId: '', hours: '', breakMin: '0', billable: true });
  const [errors, setErrors] = React.useState({});
  const [notice, setNotice] = React.useState(null);
  const formRef = React.useRef(null);

  const projectById = (id) => PROJECTS.find((p) => p.id === id);
  const taskName = (pid, tid) => {
    const p = projectById(pid);
    const t = p && p.tasks.find((x) => x.id === tid);
    return t ? t.name : '';
  };

  const sorted = React.useMemo(
    () =>
      [...entries].sort((a, b) => {
        const da = WEEK.findIndex((d) => d.key === a.date);
        const db = WEEK.findIndex((d) => d.key === b.date);
        return da - db || a.id - b.id;
      }),
    [entries]
  );

  const dayStats = React.useMemo(() => {
    return WEEK.map((d) => {
      const list = entries.filter((e) => e.date === d.key);
      const total = list.reduce((s, e) => s + e.minutes, 0);
      const brk = list.reduce((s, e) => s + e.breakMin, 0);
      return {
        ...d,
        total,
        overtime: total > LIMITS.daily,
        missedBreak: total > LIMITS.threshold && brk < LIMITS.minBreak,
      };
    });
  }, [entries]);
  const weekTotal = dayStats.reduce((s, d) => s + d.total, 0);
  const weekOvertime = weekTotal > LIMITS.weekly;

  const firstRowOfDay = {};
  sorted.forEach((e) => {
    if (firstRowOfDay[e.date] === undefined) firstRowOfDay[e.date] = e.id;
  });

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k === 'breakMin' ? 'brk' : k === 'projectId' ? 'project' : k === 'taskId' ? 'task' : k]: undefined }));
  };

  const onProject = (id) => {
    const p = projectById(id);
    setForm((f) => ({ ...f, projectId: id, taskId: '', billable: p ? p.billable : f.billable }));
    setErrors((er) => ({ ...er, project: undefined, task: undefined }));
  };

  const scrollToForm = () => {
    if (!formRef.current) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    formRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => {
      const el = document.getElementById('f-date');
      if (el) el.focus({ preventScroll: true });
    }, reduce ? 0 : 350);
  };

  const startNew = () => {
    setEditingId(null);
    setErrors({});
    setNotice(null);
    setForm({ date: TODAY, projectId: '', taskId: '', hours: '', breakMin: '0', billable: true });
    scrollToForm();
  };

  const startEdit = (e) => {
    if (locked) return;
    setEditingId(e.id);
    setErrors({});
    setNotice(null);
    setForm({
      date: e.date,
      projectId: e.projectId,
      taskId: e.taskId,
      hours: fmt(e.minutes).replace(/^0h$/, ''),
      breakMin: String(e.breakMin),
      billable: e.billable,
    });
    scrollToForm();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (locked) return;
    const er = {};
    const d = parseDate(form.date);
    if (d.error) er.date = d.error;
    if (!form.projectId) er.project = 'choose a project for this entry.';
    if (!form.taskId) er.task = form.projectId ? 'choose a task for this project.' : 'choose a project first, then its task.';
    const minutes = parseHours(form.hours);
    if (minutes === null) er.hours = 'enter hours worked, like 6:30, 6.5 or 6h 30m (up to 24h).';
    const brkRaw = String(form.breakMin).trim() === '' ? '0' : String(form.breakMin).trim();
    if (!/^\d+$/.test(brkRaw) || Number(brkRaw) > 600) er.brk = 'enter whole minutes, from 0 to 600.';
    if (Object.keys(er).length) {
      setErrors(er);
      setNotice(null);
      const order = ['date', 'project', 'task', 'hours', 'brk'];
      const firstKey = order.find((k) => er[k]);
      const el = document.getElementById('f-' + firstKey);
      if (el) el.focus();
      return;
    }
    const existing = entries.find((e) => e.id === editingId);
    const entry = {
      id: editingId || nextId,
      date: d.key,
      projectId: form.projectId,
      taskId: form.taskId,
      billable: form.billable,
      source: existing ? existing.source : 'manual',
      breakMin: Number(brkRaw),
      minutes,
    };
    const next = editingId ? entries.map((e) => (e.id === editingId ? entry : e)) : [...entries, entry];
    if (!editingId) setNextId(nextId + 1);
    setEntries(next);
    const dayList = next.filter((e) => e.date === d.key);
    const dayTotal = dayList.reduce((s, e) => s + e.minutes, 0);
    const dayBrk = dayList.reduce((s, e) => s + e.breakMin, 0);
    const flagged = dayTotal > LIMITS.daily || (dayTotal > LIMITS.threshold && dayBrk < LIMITS.minBreak);
    const wd = WEEK.find((w) => w.key === d.key);
    setNotice(
      (editingId ? 'entry updated. ' : 'entry saved. ') +
        wd.short + ' ' + wd.dm + ' now totals ' + fmt(dayTotal) + '.' +
        (flagged ? ' this day carries a flag — flags never stop you saving or submitting.' : '')
    );
    setEditingId(null);
    setErrors({});
    setForm({ date: d.key, projectId: '', taskId: '', hours: '', breakMin: '0', billable: true });
  };

  const fieldStyle = (bad) => ({
    borderRadius: 999,
    backgroundColor: cream,
    color: ink,
    border: 'none',
    boxShadow: bad ? `${inset}, 0 0 0 2px ${ink}` : inset,
    minHeight: 48,
    padding: '12px 24px',
    width: '100%',
    fontFamily: brand.fontBody,
    fontSize: 16,
  });

  const labelStyle = { display: 'block', marginBottom: 8, paddingLeft: 24, fontSize: 14, fontWeight: 600, color: ink, fontFamily: brand.fontBody };
  const helpStyle = { marginTop: 8, paddingLeft: 24, fontSize: 13, lineHeight: 1.5, color: muted };
  const errStyle = { marginTop: 8, paddingLeft: 24, fontSize: 13, lineHeight: 1.5, color: ink, fontWeight: 600, display: 'flex', gap: 8, alignItems: 'flex-start' };

  const errMsg = (id, text) =>
    text ? (
      <p id={id} style={errStyle}>
        <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{text}</span>
      </p>
    ) : null;

  const pill = (children, bg) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        borderRadius: 999,
        backgroundColor: bg,
        color: ink,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );

  const selectedProject = projectById(form.projectId);
  const errCount = Object.values(errors).filter(Boolean).length;

  const th = { padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: muted, fontFamily: brand.fontBody, letterSpacing: '0.02em' };
  const td = { padding: '16px', verticalAlign: 'top', color: ink, fontSize: 15, fontFamily: brand.fontBody };

  return (
    <div
      className="tt-root mx-auto w-full"
      style={{ backgroundColor: cream, color: ink, fontFamily: brand.fontBody, maxWidth: 1120, padding: '32px 16px 64px' }}
    >
      <style>{`
        .tt-root button:focus-visible, .tt-root input:focus-visible, .tt-root select:focus-visible, .tt-root a:focus-visible {
          outline: 3px solid ${accent}; outline-offset: 3px;
        }
        .tt-root button:not(:disabled) { transition: transform .18s ease, background-color .18s ease; cursor: pointer; }
        .tt-root button:not(:disabled):hover { transform: translateY(-1px); }
        .tt-root button:not(:disabled):active { transform: translateY(0); }
        .tt-root button:disabled, .tt-root input:disabled, .tt-root select:disabled { opacity: .55; cursor: not-allowed; }
        .tt-row { transition: background-color .25s ease; }
        .tt-row-new { animation: ttEnter .45s ease both; }
        .tt-notice { animation: ttEnter .35s ease both; }
        @keyframes ttEnter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .tt-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        @media (max-width: 639px) {
          .tt-table, .tt-table tbody, .tt-table tr, .tt-table td { display: block; width: 100%; }
          .tt-table thead tr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
          .tt-table tbody tr { padding: 16px 0; border-radius: 24px; margin-bottom: 8px; }
          .tt-table td { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 16px !important; text-align: right !important; }
          .tt-table td::before { content: attr(data-label); font-size: 13px; font-weight: 600; color: ${muted}; text-align: left; flex-shrink: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tt-root *, .tt-root *::before { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="flex flex-col" style={{ gap: 48 }}>
        {/* Row 1 */}
        <header className="grid grid-cols-1 md:grid-cols-12 items-center" style={{ gap: 16 }}>
          <div className="md:col-span-6">
            <h1 data-wf="b-0-0" style={{ ...headingFont, fontSize: 40, lineHeight: 1.15, margin: 0 }}>Timesheet</h1>
            <p style={{ margin: '8px 0 0', color: muted, fontSize: 15, lineHeight: 1.5 }}>
              week 45 · hours you clock show up here too, ready to edit.
            </p>
          </div>
          <div className="md:col-span-2">
            <Button
              data-wf="b-0-1"
              type="button"
              onClick={() => navigate('dashboard')}
              className="w-full md:w-auto"
              style={{ borderRadius: 999, minHeight: 44, padding: '10px 24px', backgroundColor: tint, color: ink, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600 }}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Dashboard</span>
            </Button>
          </div>
          <p data-wf="b-0-2" className="md:col-span-4 md:text-right" style={{ margin: 0, fontSize: 15, ...tabular }}>
            <span>{WEEK_LABEL}</span>
            <span aria-hidden="true"> · </span>
            <span className="tt-sr">, status: </span>
            <span style={{ fontWeight: 700, padding: '4px 12px', borderRadius: 999, backgroundColor: accentTint, whiteSpace: 'nowrap' }}>{status}</span>
          </p>
        </header>

        {locked && (
          <div role="status" style={{ backgroundColor: tint, borderRadius: 24, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <Clock size={20} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, lineHeight: 1.5 }}>this week is {status.toLowerCase()} and locked for editing. a payroll admin can unlock it if something needs correcting.</p>
          </div>
        )}

        {/* Row 2 */}
        <section data-wf="b-1-0" aria-labelledby="entries-h" style={{ backgroundColor: tint, borderRadius: arch, boxShadow: soft, padding: '64px 16px 24px' }} className="sm:px-6">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 id="entries-h" style={{ ...headingFont, fontSize: 28, lineHeight: 1.2, margin: 0 }}>Entries</h2>
            <p style={{ margin: '8px 0 0', color: muted, fontSize: 14 }}>
              {entries.length === 0 ? 'nothing logged yet' : entries.length + (entries.length === 1 ? ' entry' : ' entries') + ' this week · tap a day to edit'}
            </p>
          </div>

          {sorted.length === 0 ? (
            <Empty
              title="a clear week so far"
              description="no hours logged between 02/11/2026 and 08/11/2026. add your first entry below, or clock in from the dashboard and it will appear here."
            />
          ) : (
            <Table className="tt-table w-full" style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', ...tabular }}>
              <THead>
                <TR>
                  <TH data-wf="i-1-0-0" style={th}>Day</TH>
                  <TH data-wf="i-1-0-1" style={th}>Project</TH>
                  <TH data-wf="i-1-0-2" style={th}>Task</TH>
                  <TH data-wf="i-1-0-3" style={th}>Billable</TH>
                  <TH data-wf="i-1-0-4" style={{ ...th, textAlign: 'right' }}>Break (min)</TH>
                  <TH data-wf="i-1-0-5" style={{ ...th, textAlign: 'right' }}>Hours</TH>
                  <TH data-wf="i-1-0-6" style={th}>Flags</TH>
                </TR>
              </THead>
              <TBody>
                {sorted.map((e) => {
                  const wd = WEEK.find((w) => w.key === e.date);
                  const ds = dayStats.find((d) => d.key === e.date);
                  const p = projectById(e.projectId);
                  const showFlags = firstRowOfDay[e.date] === e.id;
                  const isEditing = editingId === e.id;
                  return (
                    <TR key={e.id} className={'tt-row' + (e.id >= 7 ? ' tt-row-new' : '')} style={{ backgroundColor: isEditing ? accentTint : 'transparent', borderRadius: 24 }}>
                      <TD data-label="Day" style={{ ...td, textAlign: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }} className="max-sm:items-end">
                          <button
                            type="button"
                            onClick={() => startEdit(e)}
                            disabled={locked}
                            aria-label={'Edit entry: ' + wd.long + ' ' + e.date + ', ' + (p ? p.name : '') + ', ' + taskName(e.projectId, e.taskId)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '8px 16px', borderRadius: 999, backgroundColor: isEditing ? cream : tintStrong, color: ink, border: 'none', fontWeight: 600, fontSize: 15, ...tabular }}
                          >
                            <Edit size={14} aria-hidden="true" />
                            <span>{wd.short} {wd.dm}</span>
                          </button>
                          {e.source === 'clock' && (
                            <span style={{ fontSize: 13, color: muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Clock size={13} aria-hidden="true" /> clocked in browser
                            </span>
                          )}
                        </div>
                      </TD>
                      <TD data-label="Project" style={td}>
                        <div style={{ fontWeight: 600 }}>{p ? p.name : '—'}</div>
                        <div style={{ fontSize: 13, color: muted }}>{p ? p.client : ''}</div>
                      </TD>
                      <TD data-label="Task" style={td}>{taskName(e.projectId, e.taskId)}</TD>
                      <TD data-label="Billable" style={td}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          {e.billable ? <CheckCircle size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}
                          {e.billable ? 'Billable' : 'Non-billable'}
                        </span>
                      </TD>
                      <TD data-label="Break (min)" style={{ ...td, textAlign: 'right', ...tabular }}>{e.breakMin}</TD>
                      <TD data-label="Hours" style={{ ...td, textAlign: 'right', fontWeight: 600, ...tabular }}>{fmt(e.minutes)}</TD>
                      <TD data-label="Flags" style={td}>
                        {showFlags && (ds.overtime || ds.missedBreak) ? (
                          <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
                            {ds.overtime && pill(<><AlertCircle size={14} aria-hidden="true" />Overtime</>, accentTint)}
                            {ds.missedBreak && pill(<><AlertCircle size={14} aria-hidden="true" />Missed break</>, accentTint)}
                          </span>
                        ) : (
                          <span style={{ color: muted }}>
                            <span aria-hidden="true">—</span>
                            <span className="tt-sr">no flags</span>
                          </span>
                        )}
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          )}
        </section>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start" style={{ gap: 24 }}>
          <Button
            data-wf="b-2-0"
            type="button"
            onClick={startNew}
            disabled={locked}
            className="md:col-span-4 w-full"
            style={{ borderRadius: 999, minHeight: 48, padding: '12px 24px', backgroundColor: tintStrong, color: ink, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 16 }}
          >
            <Plus size={18} aria-hidden="true" />
            <span>Add entry</span>
          </Button>
          <div data-wf="b-2-1" className="md:col-span-8">
            <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.5, ...tabular }}>
              Daily totals Mon–Sun · Week total <strong style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontSize: 20 }}>{fmt(weekTotal)}</strong>
              {weekOvertime && <span style={{ marginLeft: 8 }}>{pill(<><AlertCircle size={14} aria-hidden="true" />Weekly overtime</>, accentTint)}</span>}
            </p>
            <ul className="grid grid-cols-4 sm:grid-cols-7" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 8 }}>
              {dayStats.map((d) => {
                const isToday = d.key === TODAY;
                return (
                  <li
                    key={d.key}
                    style={{
                      backgroundColor: tint,
                      borderRadius: 24,
                      padding: '12px 8px',
                      textAlign: 'center',
                      boxShadow: isToday ? `inset 0 -4px 0 ${accent}` : 'none',
                      ...tabular,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: muted }}>
                      {d.short} {d.dm.slice(0, 2)}{isToday && <span className="tt-sr"> (today)</span>}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{d.total ? fmt(d.total) : <><span aria-hidden="true">–</span><span className="tt-sr">0h</span></>}</div>
                    <div style={{ fontSize: 12, minHeight: 18, marginTop: 4, color: ink, fontWeight: 600 }}>
                      {d.overtime && <div>overtime</div>}
                      {d.missedBreak && <div>missed break</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: muted, lineHeight: 1.5 }}>
              limits: {fmt(LIMITS.daily)} a day, {fmt(LIMITS.weekly)} a week, {LIMITS.minBreak} min break after {fmt(LIMITS.threshold)}. flags are a heads-up, never a block.
            </p>
          </div>
        </div>

        {/* Row 4 */}
        <form
          id="entry-form"
          ref={formRef}
          data-wf="b-3-0"
          noValidate
          onSubmit={onSubmit}
          aria-labelledby="entry-h"
          style={{ backgroundColor: tint, borderRadius: arch, boxShadow: soft, padding: '64px 16px 32px', scrollMarginTop: 16 }}
          className="sm:px-8"
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 id="entry-h" style={{ ...headingFont, fontSize: 28, lineHeight: 1.2, margin: 0 }}>Entry</h2>
            <p style={{ margin: '8px 0 0', color: muted, fontSize: 14 }}>
              {editingId ? 'editing an entry — change what you need, then save' : 'a new entry for this week'}
            </p>
          </div>

          {errCount > 0 && (
            <div role="alert" style={{ backgroundColor: accentTint, borderRadius: 24, padding: '16px 24px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <AlertCircle size={20} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, lineHeight: 1.5 }}>
                this entry isn't saved yet — {errCount === 1 ? 'one field needs' : errCount + ' fields need'} a look. what you typed is still here.
              </p>
            </div>
          )}

          {notice && !errCount && (
            <div role="status" className="tt-notice" style={{ backgroundColor: accentTint, borderRadius: 24, padding: '16px 24px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircle size={20} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, lineHeight: 1.5, ...tabular }}>{notice}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
            <div>
              <Label htmlFor="f-date" style={labelStyle}>Date (dd/mm/yyyy)</Label>
              <Input
                id="f-date"
                data-wf="i-3-0-0"
                inputMode="numeric"
                autoComplete="off"
                placeholder="04/11/2026"
                value={form.date}
                disabled={locked}
                onChange={(e) => setField('date', e.target.value)}
                aria-invalid={errors.date ? 'true' : 'false'}
                aria-describedby={errors.date ? 'e-date' : 'h-date'}
                style={{ ...fieldStyle(errors.date), ...tabular }}
              />
              {errors.date ? errMsg('e-date', errors.date) : <p id="h-date" style={helpStyle}>any day from Monday 02/11 to Sunday 08/11.</p>}
            </div>

            <div>
              <Label htmlFor="f-project" style={labelStyle}>Project</Label>
              <Select
                id="f-project"
                data-wf="i-3-0-1"
                value={form.projectId}
                disabled={locked}
                onChange={(e) => onProject(e.target.value)}
                aria-invalid={errors.project ? 'true' : 'false'}
                aria-describedby={errors.project ? 'e-project' : undefined}
                style={fieldStyle(errors.project)}
              >
                <option value="">choose a project</option>
                {PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {p.client}</option>
                ))}
              </Select>
              {errMsg('e-project', errors.project)}
            </div>

            <div>
              <Label htmlFor="f-task" style={labelStyle}>Task</Label>
              <Select
                id="f-task"
                data-wf="i-3-0-2"
                value={form.taskId}
                disabled={locked || !selectedProject}
                onChange={(e) => setField('taskId', e.target.value)}
                aria-invalid={errors.task ? 'true' : 'false'}
                aria-describedby={errors.task ? 'e-task' : 'h-task'}
                style={fieldStyle(errors.task)}
              >
                <option value="">{selectedProject ? 'choose a task' : 'pick a project first'}</option>
                {(selectedProject ? selectedProject.tasks : []).map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Select>
              {errors.task ? errMsg('e-task', errors.task) : <p id="h-task" style={helpStyle}>only tasks of the chosen project are offered.</p>}
            </div>

            <div>
              <Label htmlFor="f-hours" style={labelStyle}>Hours</Label>
              <Input
                id="f-hours"
                data-wf="i-3-0-3"
                inputMode="decimal"
                autoComplete="off"
                placeholder="6:30"
                value={form.hours}
                disabled={locked}
                onChange={(e) => setField('hours', e.target.value)}
                aria-invalid={errors.hours ? 'true' : 'false'}
                aria-describedby={errors.hours ? 'e-hours' : 'h-hours'}
                style={{ ...fieldStyle(errors.hours), ...tabular }}
              />
              {errors.hours ? errMsg('e-hours', errors.hours) : <p id="h-hours" style={helpStyle}>time worked, without the break. 6:30, 6.5 or 6h 30m.</p>}
            </div>

            <div>
              <Label htmlFor="f-brk" style={labelStyle}>Break minutes</Label>
              <Input
                id="f-brk"
                data-wf="i-3-0-4"
                inputMode="numeric"
                autoComplete="off"
                value={form.breakMin}
                disabled={locked}
                onChange={(e) => setField('breakMin', e.target.value)}
                aria-invalid={errors.brk ? 'true' : 'false'}
                aria-describedby={errors.brk ? 'e-brk' : 'h-brk'}
                style={{ ...fieldStyle(errors.brk), ...tabular }}
              />
              {errors.brk ? errMsg('e-brk', errors.brk) : <p id="h-brk" style={helpStyle}>a {LIMITS.minBreak}-minute break is expected after {fmt(LIMITS.threshold)}.</p>}
            </div>

            <div>
              <span style={{ ...labelStyle }} id="l-billable">Billable</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, padding: '0 24px', borderRadius: 999, backgroundColor: cream, boxShadow: inset }}>
                <Checkbox
                  id="f-billable"
                  data-wf="i-3-0-5"
                  checked={form.billable}
                  disabled={locked}
                  onChange={(e) => setField('billable', e.target.checked)}
                  style={{ width: 22, height: 22, accentColor: ink }}
                />
                <Label htmlFor="f-billable" style={{ fontSize: 15, color: ink, margin: 0 }}>
                  {form.billable ? 'billable work' : 'non-billable work'}
                </Label>
              </div>
              <p style={helpStyle}>feeds the billable versus non-billable reports.</p>
            </div>
          </div>
        </form>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          <Button
            data-wf="b-4-0"
            type="submit"
            form="entry-form"
            disabled={locked}
            className="md:col-span-4 w-full"
            style={{ borderRadius: 999, minHeight: 52, padding: '14px 24px', backgroundColor: ink, color: cream, border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: 16, boxShadow: soft }}
          >
            <Check size={18} aria-hidden="true" style={{ color: accent }} />
            <span>Save entry</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
