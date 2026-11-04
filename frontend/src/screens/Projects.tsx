// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, X, Edit, AlertCircle, CheckCircle } = Icons;

const SEED_CLIENTS = [
  { id: 'c1', name: 'Acme Ltd' },
  { id: 'c2', name: 'Northwind GmbH' },
  { id: 'c3', name: 'Fernhill Garden Centre' },
];
const SEED_PROJECTS = [
  { id: 'p1', clientId: 'c1', name: 'Brand refresh 2026', rate: 95, active: true },
  { id: 'p2', clientId: 'c1', name: 'Customer portal', rate: 110, active: true },
  { id: 'p3', clientId: 'c1', name: 'Legacy intranet clean-up', rate: 70, active: false },
  { id: 'p4', clientId: 'c2', name: 'Warehouse dashboard', rate: 120, active: true },
  { id: 'p5', clientId: 'c2', name: 'Route planner', rate: 105, active: true },
];
const SEED_TASKS = [
  { id: 't1', projectId: 'p1', name: 'Design' },
  { id: 't2', projectId: 'p1', name: 'Development' },
  { id: 't3', projectId: 'p1', name: 'Testing' },
  { id: 't4', projectId: 'p2', name: 'Discovery' },
  { id: 't5', projectId: 'p2', name: 'Development' },
  { id: 't6', projectId: 'p2', name: 'Testing' },
  { id: 't7', projectId: 'p2', name: 'Release' },
  { id: 't8', projectId: 'p3', name: 'Archiving' },
  { id: 't9', projectId: 'p4', name: 'Data modelling' },
  { id: 't10', projectId: 'p4', name: 'Development' },
  { id: 't11', projectId: 'p5', name: 'Planning' },
  { id: 't12', projectId: 'p5', name: 'Development' },
];
const CURRENCIES = [
  { code: 'EUR', label: 'EUR — euro', symbol: '€' },
  { code: 'GBP', label: 'GBP — pound sterling', symbol: '£' },
];

export default function Screen() {
  const ink = brand.primaryColor;
  const bg = brand.backgroundColor;
  const gold = brand.accentColor;
  const tint = (p) => `color-mix(in srgb, ${ink} ${p}%, ${bg})`;
  const soft = `color-mix(in srgb, ${ink} 78%, ${bg})`;
  const shadow = `0 12px 32px color-mix(in srgb, ${ink} 10%, transparent)`;
  const fieldBg = `color-mix(in srgb, ${bg} 55%, white)`;
  const fieldRing = `inset 0 0 0 1px color-mix(in srgb, ${ink} 40%, transparent)`;
  const selectedBg = `color-mix(in srgb, ${gold} 28%, ${bg})`;

  const [currency, setCurrency] = React.useState('EUR');
  const [currencyMsg, setCurrencyMsg] = React.useState('');
  const [clients, setClients] = React.useState(SEED_CLIENTS);
  const [projects, setProjects] = React.useState(SEED_PROJECTS);
  const [tasks, setTasks] = React.useState(SEED_TASKS);
  const [clientId, setClientId] = React.useState('c1');
  const [projectId, setProjectId] = React.useState('p1');
  const [form, setForm] = React.useState({ id: 'p1', clientId: 'c1', name: 'Brand refresh 2026', rate: '95.00', active: true });
  const [errors, setErrors] = React.useState({});
  const [msg, setMsg] = React.useState(null);
  const [addingClient, setAddingClient] = React.useState(false);
  const [addingTask, setAddingTask] = React.useState(false);
  const [newClient, setNewClient] = React.useState('');
  const [newTask, setNewTask] = React.useState('');
  const [clientErr, setClientErr] = React.useState('');
  const [taskErr, setTaskErr] = React.useState('');
  const [justAdded, setJustAdded] = React.useState(null);
  const counter = React.useRef(100);
  const clientInputRef = React.useRef(null);
  const taskInputRef = React.useRef(null);
  const nameRef = React.useRef(null);

  const symbol = CURRENCIES.find((c) => c.code === currency).symbol;
  const money = (n) => `${symbol}${Number(n).toFixed(2)}`;
  const client = clients.find((c) => c.id === clientId);
  const clientProjects = projects.filter((p) => p.clientId === clientId);
  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  React.useEffect(() => { if (addingClient && clientInputRef.current) clientInputRef.current.focus(); }, [addingClient]);
  React.useEffect(() => { if (addingTask && taskInputRef.current) taskInputRef.current.focus(); }, [addingTask]);

  const loadProject = (p) => {
    setProjectId(p.id);
    setForm({ id: p.id, clientId: p.clientId, name: p.name, rate: Number(p.rate).toFixed(2), active: p.active });
    setErrors({});
    setMsg(null);
    setAddingTask(false);
  };

  const pickClient = (c) => {
    setClientId(c.id);
    setAddingTask(false);
    setMsg(null);
    setErrors({});
    const first = projects.find((p) => p.clientId === c.id);
    if (first) loadProject(first);
    else {
      setProjectId(null);
      setForm({ id: null, clientId: c.id, name: '', rate: '', active: true });
    }
  };

  const startNewProject = () => {
    setProjectId(null);
    setForm({ id: null, clientId: clientId || '', name: '', rate: '', active: true });
    setErrors({});
    setMsg(null);
    setTimeout(() => { if (nameRef.current) nameRef.current.focus(); }, 0);
  };

  const changeCurrency = (e) => {
    const code = e.target.value;
    setCurrency(code);
    setCurrencyMsg(`saved. every bill rate and billable value now shows in ${code}.`);
  };

  const submitClient = (e) => {
    e.preventDefault();
    const name = newClient.trim();
    if (!name) { setClientErr('give the client a name first.'); return; }
    if (clients.some((c) => c.name.toLowerCase() === name.toLowerCase())) { setClientErr(`"${name}" is already on the list.`); return; }
    const id = 'c' + counter.current++;
    setClients([...clients, { id, name }]);
    setNewClient(''); setClientErr(''); setAddingClient(false);
    setJustAdded(id);
    setClientId(id); setProjectId(null);
    setForm({ id: null, clientId: id, name: '', rate: '', active: true });
    setMsg({ kind: 'ok', text: `${name} added. add its first project below.` });
  };

  const submitTask = (e) => {
    e.preventDefault();
    const name = newTask.trim();
    if (!name) { setTaskErr('give the task a name first.'); return; }
    if (projectTasks.some((t) => t.name.toLowerCase() === name.toLowerCase())) { setTaskErr(`"${name}" already exists on this project.`); return; }
    const id = 't' + counter.current++;
    setTasks([...tasks, { id, projectId, name }]);
    setNewTask(''); setTaskErr(''); setAddingTask(false);
    setJustAdded(id);
    setMsg({ kind: 'ok', text: `task "${name}" added to ${project.name}. employees can pick it now.` });
  };

  const saveProject = (e) => {
    e.preventDefault();
    const errs = {};
    const name = form.name.trim();
    const rateNum = Number(String(form.rate).replace(',', '.'));
    if (!form.clientId) errs.client = 'choose the client this project belongs to.';
    if (!name) errs.name = 'give the project a name.';
    if (String(form.rate).trim() === '' || Number.isNaN(rateNum)) errs.rate = 'enter an hourly rate, for example 95.00.';
    else if (rateNum < 0) errs.rate = 'the rate can’t be negative.';
    if (!errs.name && projects.some((p) => p.clientId === form.clientId && p.id !== form.id && p.name.toLowerCase() === name.toLowerCase())) errs.name = 'this client already has a project with that name.';
    setErrors(errs);
    if (Object.keys(errs).length) { setMsg({ kind: 'err', text: 'nothing saved yet — check the highlighted fields. what you typed is still here.' }); return; }
    if (form.id) {
      setProjects(projects.map((p) => (p.id === form.id ? { ...p, clientId: form.clientId, name, rate: rateNum, active: form.active } : p)));
      setClientId(form.clientId);
      setJustAdded(form.id);
      setMsg({ kind: 'ok', text: `${name} saved. existing time entries keep their link and show the new name.` });
    } else {
      const id = 'p' + counter.current++;
      setProjects([...projects, { id, clientId: form.clientId, name, rate: rateNum, active: form.active }]);
      setClientId(form.clientId);
      setProjectId(id);
      setForm({ ...form, id, name, rate: rateNum.toFixed(2) });
      setJustAdded(id);
      setMsg({ kind: 'ok', text: `${name} added at ${money(rateNum)} an hour. it now appears in employees’ project lists.` });
    }
    setForm((f) => ({ ...f, name, rate: rateNum.toFixed(2) }));
  };

  const pill = { borderRadius: 999 };
  const inputStyle = { ...pill, backgroundColor: fieldBg, boxShadow: fieldRing, border: 'none', color: ink, minHeight: 48, padding: '0 20px', width: '100%', fontFamily: brand.fontBody, fontSize: 16 };
  const labelStyle = { display: 'block', fontSize: 13, color: soft, marginBottom: 8, paddingLeft: 8, letterSpacing: '0.02em' };
  const errStyle = { color: ink, fontSize: 13, marginTop: 8, paddingLeft: 8, display: 'flex', gap: 6, alignItems: 'flex-start' };
  const softBtn = { ...pill, backgroundColor: tint(10), color: ink, minHeight: 52, width: '100%', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none' };
  const archPanel = {
    backgroundColor: tint(7),
    borderRadius: '50% 50% 24px 24px / 88px 88px 24px 24px',
    boxShadow: shadow,
    padding: '72px 24px 32px',
    minHeight: 420,
    display: 'flex',
    flexDirection: 'column',
  };
  const h2Style = { fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 600, fontSize: 26, lineHeight: 1.2, textAlign: 'center', color: ink, margin: 0 };
  const subStyle = { textAlign: 'center', fontSize: 13, color: soft, margin: '8px 0 24px' };
  const rowBtn = (selected) => ({
    width: '100%', textAlign: 'left', ...pill, padding: '12px 20px', minHeight: 48,
    backgroundColor: selected ? selectedBg : 'transparent', color: ink, border: 'none',
    fontWeight: selected ? 700 : 500, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
  });
  const nums = { fontVariantNumeric: 'tabular-nums' };

  const clientDataWf = (i) => (i < 2 ? { 'data-wf': `i-1-0-${i}` } : {});
  const taskDataWf = (i) => (i < 3 ? { 'data-wf': `i-1-2-${i}` } : {});

  return (
    <div style={{ backgroundColor: bg, color: ink, fontFamily: brand.fontBody, fontSize: 16, lineHeight: 1.5, padding: '32px 16px 64px' }}>
      <style>{`
        .at-f:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .at-btn { transition: background-color .2s ease, transform .2s ease, opacity .2s ease; cursor: pointer; }
        .at-btn:hover:not(:disabled) { filter: brightness(0.96); transform: translateY(-1px); }
        .at-btn:active:not(:disabled) { transform: translateY(0); }
        .at-btn:disabled { opacity: .55; cursor: not-allowed; }
        .at-row:hover { background-color: ${tint(10)} !important; }
        @keyframes at-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .at-in { animation: at-in .4s ease both; }
        @media (prefers-reduced-motion: reduce) { .at-in { animation: none; } .at-btn { transition: none; } .at-btn:hover:not(:disabled) { transform: none; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end" style={{ marginBottom: 48 }}>
          <div className="lg:col-span-8" data-wf="b-0-0">
            <p style={{ fontSize: 13, color: soft, margin: '0 0 8px', letterSpacing: '0.04em' }}>admin · what time is charged to</p>
            <h1 style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', fontWeight: 700, fontSize: 40, lineHeight: 1.15, margin: 0, color: ink }}>Clients, projects and tasks</h1>
            <p style={{ margin: '12px 0 0', color: soft, maxWidth: 560 }}>keep the structure employees charge their hours to. bill rates are for reports only — no invoices or payroll amounts are produced.</p>
          </div>
          <div className="lg:col-span-4" data-wf="b-0-1">
            <Label htmlFor="currency" style={labelStyle}>{`Currency (${currency})`}</Label>
            <Select id="currency" value={currency} onChange={changeCurrency} className="at-f" style={inputStyle} data-wf="b-0-1">
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
            </Select>
            <p role="status" aria-live="polite" style={{ fontSize: 13, color: soft, margin: '8px 0 0', paddingLeft: 8, minHeight: 20 }}>
              {currencyMsg || 'applies to every project’s bill rate.'}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ marginBottom: 24 }}>
          <section className="lg:col-span-4" data-wf="b-1-0" aria-labelledby="clients-h" style={archPanel}>
            <h2 id="clients-h" style={h2Style}>Clients</h2>
            <p style={subStyle}>{clients.length} on the books</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {clients.map((c, i) => {
                const count = projects.filter((p) => p.clientId === c.id).length;
                const sel = c.id === clientId;
                return (
                  <li key={c.id} className={justAdded === c.id ? 'at-in' : ''}>
                    <button type="button" className="at-f at-btn at-row" aria-current={sel ? 'true' : undefined} onClick={() => pickClient(c)} style={rowBtn(sel)} {...clientDataWf(i)}>
                      <span>{c.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: soft, ...nums }}>{count} {count === 1 ? 'project' : 'projects'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {addingClient && (
              <form onSubmit={submitClient} className="at-in" style={{ marginTop: 24 }} noValidate>
                <Label htmlFor="new-client" style={labelStyle}>New client name</Label>
                <Input id="new-client" ref={clientInputRef} value={newClient} onChange={(e) => { setNewClient(e.target.value); setClientErr(''); }} aria-invalid={clientErr ? 'true' : undefined} aria-describedby={clientErr ? 'new-client-err' : undefined} className="at-f" style={inputStyle} />
                {clientErr && <p id="new-client-err" style={errStyle}><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{clientErr}</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Button type="submit" className="at-f at-btn" style={{ ...pill, backgroundColor: ink, color: bg, minHeight: 44, padding: '0 20px', border: 'none', fontWeight: 600 }}>Save client</Button>
                  <Button type="button" onClick={() => { setAddingClient(false); setClientErr(''); setNewClient(''); }} className="at-f at-btn" style={{ ...pill, backgroundColor: 'transparent', color: ink, minHeight: 44, padding: '0 16px', border: 'none', fontWeight: 600 }}>Cancel</Button>
                </div>
              </form>
            )}
          </section>

          <section className="lg:col-span-4" data-wf="b-1-1" aria-labelledby="projects-h" style={archPanel}>
            <h2 id="projects-h" style={h2Style}>Projects</h2>
            <p style={subStyle}>{client ? `for ${client.name}` : 'choose a client'}</p>
            {clientProjects.length === 0 ? (
              <div className="at-in" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Empty title={client ? `${client.name} has no projects yet` : 'no client chosen'} description="add a project with the form below and it will show up here, ready for employees to charge time to." />
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <Table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <THead>
                    <TR>
                      <TH data-wf="i-1-1-0" scope="col" style={{ textAlign: 'left', fontSize: 12, color: soft, fontWeight: 600, padding: '0 8px 8px' }}>Project</TH>
                      <TH data-wf="i-1-1-1" scope="col" style={{ textAlign: 'right', fontSize: 12, color: soft, fontWeight: 600, padding: '0 8px 8px' }}>Hourly bill rate</TH>
                      <TH data-wf="i-1-1-2" scope="col" style={{ textAlign: 'left', fontSize: 12, color: soft, fontWeight: 600, padding: '0 8px 8px 12px' }}>Status</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {clientProjects.map((p) => {
                      const sel = p.id === projectId;
                      return (
                        <TR key={p.id} className={`at-row ${justAdded === p.id ? 'at-in' : ''}`} style={{ backgroundColor: sel ? selectedBg : 'transparent' }}>
                          <TD style={{ padding: '4px 4px', borderTopLeftRadius: 999, borderBottomLeftRadius: 999 }}>
                            <button type="button" className="at-f at-btn" aria-current={sel ? 'true' : undefined} aria-label={`Edit ${p.name}`} onClick={() => loadProject(p)} style={{ background: 'none', border: 'none', color: ink, textAlign: 'left', padding: '10px 8px', minHeight: 44, fontWeight: sel ? 700 : 500, fontSize: 15, borderRadius: 999 }}>{p.name}</button>
                          </TD>
                          <TD style={{ padding: '4px 8px', textAlign: 'right', fontSize: 15, ...nums, whiteSpace: 'nowrap' }}>{money(p.rate)}<span style={{ color: soft, fontSize: 12 }}> /h</span></TD>
                          <TD style={{ padding: '4px 12px 4px 12px', borderTopRightRadius: 999, borderBottomRightRadius: 999 }}>
                            <span style={{ ...pill, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 10px', fontSize: 12, fontWeight: 600, backgroundColor: p.active ? tint(12) : 'transparent', boxShadow: p.active ? 'none' : fieldRing, color: ink, whiteSpace: 'nowrap' }}>
                              {p.active ? <CheckCircle className="w-3 h-3" aria-hidden="true" /> : <X className="w-3 h-3" aria-hidden="true" />}
                              {p.active ? 'Active' : 'Inactive'}
                            </span>
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            )}
          </section>

          <section className="lg:col-span-4" data-wf="b-1-2" aria-labelledby="tasks-h" style={archPanel}>
            <h2 id="tasks-h" style={h2Style}>Tasks</h2>
            <p style={subStyle}>{project ? `on ${project.name}` : 'choose a project'}</p>
            {!project ? (
              <div className="at-in" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Empty title="no project chosen" description="pick a project in the middle column to see the tasks employees can charge to it." />
              </div>
            ) : projectTasks.length === 0 ? (
              <div className="at-in" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Empty title="no tasks on this project" description="use add task below. employees can only pick tasks that belong to the project they chose." />
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {projectTasks.map((t, i) => (
                  <li key={t.id} className={justAdded === t.id ? 'at-in' : ''} {...taskDataWf(i)} style={{ ...pill, padding: '12px 20px', minHeight: 48, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: tint(5), fontSize: 15 }}>
                    <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: gold, flexShrink: 0 }} />
                    {t.name}
                  </li>
                ))}
              </ul>
            )}
            {addingTask && project && (
              <form onSubmit={submitTask} className="at-in" style={{ marginTop: 24 }} noValidate>
                <Label htmlFor="new-task" style={labelStyle}>New task name</Label>
                <Input id="new-task" ref={taskInputRef} value={newTask} onChange={(e) => { setNewTask(e.target.value); setTaskErr(''); }} aria-invalid={taskErr ? 'true' : undefined} aria-describedby={taskErr ? 'new-task-err' : undefined} className="at-f" style={inputStyle} />
                {taskErr && <p id="new-task-err" style={errStyle}><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{taskErr}</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Button type="submit" className="at-f at-btn" style={{ ...pill, backgroundColor: ink, color: bg, minHeight: 44, padding: '0 20px', border: 'none', fontWeight: 600 }}>Save task</Button>
                  <Button type="button" onClick={() => { setAddingTask(false); setTaskErr(''); setNewTask(''); }} className="at-f at-btn" style={{ ...pill, backgroundColor: 'transparent', color: ink, minHeight: 44, padding: '0 16px', border: 'none', fontWeight: 600 }}>Cancel</Button>
                </div>
              </form>
            )}
          </section>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ marginBottom: 48 }}>
          <div className="lg:col-span-4">
            <Button type="button" data-wf="b-2-0" className="at-f at-btn" aria-expanded={addingClient} onClick={() => { setAddingClient(true); setAddingTask(false); }} style={softBtn}>
              <Plus className="w-4 h-4" aria-hidden="true" />Add client
            </Button>
          </div>
          <div className="lg:col-span-4">
            <Button type="button" data-wf="b-2-1" className="at-f at-btn" onClick={startNewProject} style={softBtn}>
              <Plus className="w-4 h-4" aria-hidden="true" />Add project
            </Button>
          </div>
          <div className="lg:col-span-4">
            <Button type="button" data-wf="b-2-2" className="at-f at-btn" disabled={!project} aria-expanded={addingTask} onClick={() => { setAddingTask(true); setAddingClient(false); }} style={softBtn}>
              <Plus className="w-4 h-4" aria-hidden="true" />Add task
            </Button>
          </div>
        </div>

        {/* Row 4 */}
        <form id="project-form" data-wf="b-3-0" onSubmit={saveProject} noValidate aria-labelledby="project-h" style={{ backgroundColor: tint(7), borderRadius: 24, boxShadow: shadow, padding: '32px 32px 32px', marginBottom: 24 }}>
          <h2 id="project-h" style={{ ...h2Style, textAlign: 'left' }}>Project</h2>
          <p style={{ color: soft, fontSize: 14, margin: '8px 0 32px' }}>
            {form.id ? `editing ${project ? project.name : 'project'} — renaming keeps every existing time entry linked.` : 'a new project — it joins employees’ selection lists once saved.'}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-3">
              <Label htmlFor="f-client" style={labelStyle}>Client</Label>
              <Select id="f-client" data-wf="i-3-0-0" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} aria-invalid={errors.client ? 'true' : undefined} aria-describedby={errors.client ? 'f-client-err' : undefined} className="at-f" style={inputStyle}>
                <option value="">choose a client</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              {errors.client && <p id="f-client-err" style={errStyle}><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{errors.client}</p>}
            </div>
            <div className="lg:col-span-4">
              <Label htmlFor="f-name" style={labelStyle}>Project name</Label>
              <Input id="f-name" ref={nameRef} data-wf="i-3-0-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'f-name-err' : undefined} className="at-f" style={inputStyle} />
              {errors.name && <p id="f-name-err" style={errStyle}><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{errors.name}</p>}
            </div>
            <div className="lg:col-span-3">
              <Label htmlFor="f-rate" style={labelStyle}>Hourly bill rate</Label>
              <div style={{ position: 'relative' }}>
                <span aria-hidden="true" style={{ position: 'absolute', left: 20, top: 0, bottom: 0, display: 'flex', alignItems: 'center', color: soft, ...nums }}>{symbol}</span>
                <Input id="f-rate" data-wf="i-3-0-2" inputMode="decimal" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} aria-invalid={errors.rate ? 'true' : undefined} aria-describedby={errors.rate ? 'f-rate-err f-rate-help' : 'f-rate-help'} className="at-f" style={{ ...inputStyle, paddingLeft: 40, ...nums }} />
              </div>
              <p id="f-rate-help" style={{ fontSize: 12, color: soft, margin: '8px 0 0', paddingLeft: 8 }}>per hour, in {currency}. reports only.</p>
              {errors.rate && <p id="f-rate-err" style={errStyle}><AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{errors.rate}</p>}
            </div>
            <div className="lg:col-span-2" style={{ paddingTop: 28 }}>
              <label htmlFor="f-active" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minHeight: 48, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                <Checkbox id="f-active" data-wf="i-3-0-3" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="at-f" />
                Active
              </label>
            </div>
          </div>
        </form>

        {/* Row 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4">
            <Button type="submit" form="project-form" data-wf="b-4-0" className="at-f at-btn" style={{ ...pill, backgroundColor: ink, color: bg, minHeight: 56, width: '100%', fontSize: 16, fontWeight: 700, border: 'none' }}>Save</Button>
          </div>
          <div className="lg:col-span-8" role="status" aria-live="polite" style={{ minHeight: 24 }}>
            {msg && (
              <p key={msg.text} className="at-in" style={{ margin: 0, display: 'flex', gap: 8, alignItems: 'flex-start', color: ink, fontSize: 15, ...pill, borderRadius: 24, padding: '8px 16px', backgroundColor: msg.kind === 'ok' ? selectedBg : tint(10) }}>
                {msg.kind === 'ok' ? <CheckCircle className="w-5 h-5 shrink-0" aria-hidden="true" /> : <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />}
                <span>{msg.text}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
