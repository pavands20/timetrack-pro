// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label, Select, Checkbox, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Users, Edit } = Icons;

const ROLES = ['Employee', 'Manager', 'Payroll Admin', 'System Admin'];

const VIEWER = { id: 1, name: 'Ingrid Halvorsen', roles: ['Payroll Admin', 'System Admin'] };

const SEED_USERS = [
  { id: 1, name: 'Ingrid Halvorsen', email: 'ingrid.halvorsen@marlowandfen.co.uk', roles: ['Payroll Admin', 'System Admin'], managerId: null, active: true, passwordSet: true },
  { id: 2, name: 'Tomás Ribeiro', email: 'tomas.ribeiro@marlowandfen.co.uk', roles: ['Manager'], managerId: null, active: true, passwordSet: true },
  { id: 3, name: 'Priya Venkataraman', email: 'priya.venkataraman@marlowandfen.co.uk', roles: ['Manager'], managerId: null, active: true, passwordSet: true },
  { id: 4, name: 'Hannah Okafor', email: 'hannah.okafor@marlowandfen.co.uk', roles: ['Payroll Admin'], managerId: null, active: true, passwordSet: true },
  { id: 5, name: 'Lucas Brandt', email: 'lucas.brandt@marlowandfen.co.uk', roles: ['Employee'], managerId: 2, active: true, passwordSet: true },
  { id: 6, name: 'Aoife Gallagher', email: 'aoife.gallagher@marlowandfen.co.uk', roles: ['Employee'], managerId: 2, active: true, passwordSet: true },
  { id: 7, name: 'Mateusz Nowak', email: 'mateusz.nowak@marlowandfen.co.uk', roles: ['Employee'], managerId: 3, active: true, passwordSet: true },
  { id: 8, name: 'Emily Whitcombe', email: 'emily.whitcombe@marlowandfen.co.uk', roles: ['Employee'], managerId: 3, active: true, passwordSet: true },
  { id: 9, name: 'Sofia Marchetti', email: 'sofia.marchetti@marlowandfen.co.uk', roles: ['Employee'], managerId: 3, active: true, passwordSet: false },
  { id: 10, name: 'Daniel Osei', email: 'daniel.osei@marlowandfen.co.uk', roles: ['Employee'], managerId: 2, active: true, passwordSet: false },
  { id: 11, name: 'Jonas Eriksen', email: 'jonas.eriksen@marlowandfen.co.uk', roles: ['Employee'], managerId: 2, active: false, passwordSet: true },
];

const BLANK_FORM = { name: '', email: '', roles: ['Employee'], managerId: '', active: true };

const CSS = `
.tt-root{--ink:var(--tt-ink);--accent:var(--tt-accent);--bg:var(--tt-bg);
  --muted:color-mix(in srgb,var(--ink) 74%,var(--bg));
  --tint:color-mix(in srgb,var(--ink) 7%,transparent);
  --tint-strong:color-mix(in srgb,var(--ink) 12%,transparent);
  --hair:color-mix(in srgb,var(--ink) 11%,transparent);
  --clay:color-mix(in srgb,var(--accent) 45%,darkred);
  --lift:0 18px 40px -22px color-mix(in srgb,var(--ink) 55%,transparent);
  color:var(--ink);font-size:16px;line-height:1.5}
.tt-root *:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.tt-root .tt-h{font-style:italic;font-weight:500;letter-spacing:-0.01em}
.tt-root .tt-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 24px;border-radius:9999px;border:0;font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background-color .2s ease,transform .15s ease,opacity .2s ease;color:var(--ink);background:transparent}
.tt-root .tt-btn:active:not(:disabled){transform:scale(.97)}
.tt-root .tt-btn:disabled{opacity:.5;cursor:not-allowed}
.tt-root .tt-primary{background:var(--accent);color:color-mix(in srgb,var(--ink) 40%,black)}
.tt-root .tt-primary:hover:not(:disabled){background:color-mix(in srgb,var(--accent) 86%,black)}
.tt-root .tt-quiet{background:var(--tint-strong)}
.tt-root .tt-quiet:hover:not(:disabled){background:color-mix(in srgb,var(--ink) 18%,transparent)}
.tt-root .tt-ghost:hover:not(:disabled){background:var(--tint)}
.tt-root .tt-sm{min-height:40px;padding:0 16px;font-size:14px}
@media (pointer:coarse){.tt-root .tt-sm{min-height:44px}}
.tt-root .tt-field{width:100%;min-height:48px;border-radius:9999px;border:0;background:var(--tint);padding:0 20px;color:var(--ink);font-family:inherit;font-size:16px;box-shadow:none;transition:background-color .2s ease}
.tt-root .tt-field:hover{background:var(--tint-strong)}
.tt-root .tt-field[aria-invalid="true"]{box-shadow:inset 0 0 0 2px var(--clay)}
.tt-root .tt-field::placeholder{color:var(--muted);opacity:.8}
.tt-root .tt-label{display:block;font-size:14px;font-weight:600;margin:0 0 8px 20px;color:var(--ink)}
.tt-root .tt-hint{margin:8px 0 0 20px;font-size:13px;color:var(--muted)}
.tt-root .tt-err{margin:8px 0 0 20px;font-size:13px;font-weight:600;color:var(--clay);display:flex;gap:6px;align-items:flex-start}
.tt-root .tt-pill{display:inline-flex;align-items:center;gap:6px;padding:2px 12px;border-radius:9999px;font-size:13px;font-weight:600;line-height:1.6;white-space:nowrap}
.tt-root .tt-choice{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 20px 0 16px;border-radius:9999px;background:var(--tint);font-size:15px;cursor:pointer;transition:background-color .2s ease}
.tt-root .tt-choice:hover{background:var(--tint-strong)}
.tt-root .tt-choice:has(input:checked){background:color-mix(in srgb,var(--accent) 32%,transparent);font-weight:600}
.tt-root .tt-choice:has(input:focus-visible){outline:2px solid var(--ink);outline-offset:3px}
.tt-root .tt-choice input{accent-color:var(--ink);width:18px;height:18px}
.tt-root .tt-table{width:100%;min-width:780px;border-collapse:separate;border-spacing:0}
.tt-root .tt-th{text-align:left;padding:8px 16px 12px;font-size:13px;font-weight:600;color:var(--muted);letter-spacing:.02em;border:0}
.tt-root .tt-td{padding:16px;border:0;border-top:1px solid var(--hair);vertical-align:middle;font-size:15px}
.tt-root .tt-row{transition:background-color .2s ease}
.tt-root .tt-row:hover{background:var(--tint)}
.tt-root .tt-row-editing{background:color-mix(in srgb,var(--accent) 16%,transparent)}
.tt-root .tt-row-fresh{animation:tt-in .45s ease both,tt-glow 2.4s ease .2s both}
@keyframes tt-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes tt-glow{from{background:color-mix(in srgb,var(--accent) 34%,transparent)}to{background:transparent}}
.tt-root .tt-toast{animation:tt-in .3s ease both}
.tt-root .tt-panel{animation:tt-in .4s ease both}
@media (prefers-reduced-motion:reduce){.tt-root *,.tt-root *::before{animation:none!important;transition:none!important}}
`;

export default function Screen() {
  const navigate = useNavigate();
  const { Input, Label, Select, Checkbox, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
  const mix = (c, p) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

  const [users, setUsers] = React.useState(SEED_USERS);
  const [form, setForm] = React.useState(BLANK_FORM);
  const [editId, setEditId] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [resetting, setResetting] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [confirmId, setConfirmId] = React.useState(null);
  const [touchedId, setTouchedId] = React.useState(null);
  const timer = React.useRef(null);

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const canAdmin = VIEWER.roles.includes('Payroll Admin') || VIEWER.roles.includes('System Admin');

  if (!canAdmin) {
    return (
      <div className="tt-root" style={{ '--tt-ink': brand.primaryColor, '--tt-accent': brand.accentColor, '--tt-bg': brand.backgroundColor, fontFamily: brand.fontBody }}>
        <style>{CSS}</style>
        <div className="mx-auto max-w-xl py-16 px-4">
          <Empty
            title="user administration is for admins"
            description="only a Payroll Admin or System Admin can add or change accounts. ask one of them to make the change, or to give you the role."
            action={<button type="button" className="tt-btn tt-primary" onClick={() => navigate('dashboard')}>Back to your dashboard</button>}
          />
        </div>
      </div>
    );
  }

  const byId = (id) => users.find((u) => u.id === id);
  const reportsOf = (id) => users.filter((u) => u.managerId === id && u.active);
  const statusOf = (u) => (!u.active ? 'Deactivated' : !u.passwordSet ? 'Invited' : 'Active');
  const managers = users.filter((u) => u.active && u.roles.includes('Manager') && u.id !== editId);
  const editing = editId ? byId(editId) : null;
  const activeCount = users.filter((u) => u.active).length;

  const focusId = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
    }, 30);
  };

  const showToast = (kind, text) => setToast({ kind, text, at: Date.now() });

  const startNew = () => {
    setEditId(null);
    setForm(BLANK_FORM);
    setErrors({});
    setConfirmId(null);
    focusId('f-name');
  };

  const startEdit = (u) => {
    setEditId(u.id);
    setForm({ name: u.name, email: u.email, roles: u.roles, managerId: u.managerId ? String(u.managerId) : '', active: u.active });
    setErrors({});
    setConfirmId(null);
    focusId('f-name');
  };

  const toggleRole = (r) => {
    setForm((f) => ({ ...f, roles: f.roles.includes(r) ? f.roles.filter((x) => x !== r) : [...f.roles, r] }));
    setErrors((e) => ({ ...e, roles: undefined }));
  };

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined, ...(k === 'active' ? { active: undefined } : {}) }));
  };

  const validate = () => {
    const e = {};
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    if (!name) e.name = 'enter their full name so managers recognise them.';
    if (!email) e.email = 'enter an email address — the invite link is sent here.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'that doesn’t look like an email address yet.';
    else {
      const clash = users.find((u) => u.email.toLowerCase() === email && u.id !== editId);
      if (clash) e.email = `${clash.name} already uses this email. use a different address, or edit that account instead.`;
    }
    if (form.roles.length === 0) e.roles = 'choose at least one role.';
    if (form.roles.includes('Employee') && !form.managerId) e.managerId = 'an employee needs a manager, so approvals have somewhere to go.';
    if (editId) {
      const n = reportsOf(editId).length;
      if (n > 0 && !form.roles.includes('Manager')) e.roles = `${name || 'this person'} still manages ${n} active ${n === 1 ? 'person' : 'people'}. move them to another manager first.`;
      if (!form.active && n > 0) e.active = `${name || 'this person'} still manages ${n} active ${n === 1 ? 'person' : 'people'}. reassign them before deactivating.`;
      if (!form.active && editId === VIEWER.id) e.active = 'you can’t deactivate the account you’re signed in with.';
    }
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (saving) return;
    const e = validate();
    setErrors(e);
    const order = [['name', 'f-name'], ['email', 'f-email'], ['roles', 'f-role-Employee'], ['managerId', 'f-manager'], ['active', 'f-active']];
    const first = order.find(([k]) => e[k]);
    if (first) { focusId(first[1]); return; }

    setSaving(true);
    const snapshot = { ...form, name: form.name.trim(), email: form.email.trim() };
    const wasEditing = editId;
    timer.current = setTimeout(() => {
      const managerId = snapshot.managerId ? Number(snapshot.managerId) : null;
      if (wasEditing) {
        const old = users.find((u) => u.id === wasEditing);
        setUsers((list) => list.map((u) => (u.id === wasEditing ? { ...u, name: snapshot.name, email: snapshot.email, roles: snapshot.roles, managerId, active: snapshot.active } : u)));
        setTouchedId(wasEditing);
        const mgr = users.find((u) => u.id === managerId);
        if (old && old.managerId !== managerId && mgr) showToast('ok', `${snapshot.name} now reports to ${mgr.name}. future timesheets and leave requests go to them.`);
        else if (old && old.active && !snapshot.active) showToast('ok', `${snapshot.name} is deactivated and can no longer sign in.`);
        else showToast('ok', `changes to ${snapshot.name} are saved.`);
      } else {
        const id = Math.max(...users.map((u) => u.id)) + 1;
        setUsers((list) => [...list, { id, name: snapshot.name, email: snapshot.email, roles: snapshot.roles, managerId, active: snapshot.active, passwordSet: false }]);
        setTouchedId(id);
        showToast('ok', `invite link sent to ${snapshot.email}. ${snapshot.name} can set a password from it.`);
      }
      setEditId(null);
      setForm(BLANK_FORM);
      setSaving(false);
    }, 700);
  };

  const sendReset = () => {
    if (!editing || resetting) return;
    setResetting(true);
    timer.current = setTimeout(() => {
      setResetting(false);
      showToast('ok', `reset link sent to ${editing.email}. it works once and expires in 60 minutes.`);
    }, 600);
  };

  const askDeactivate = (u) => {
    if (u.id === VIEWER.id) { showToast('error', 'you can’t deactivate the account you’re signed in with.'); return; }
    const n = reportsOf(u.id).length;
    if (n > 0) { showToast('error', `${u.name} still manages ${n} active ${n === 1 ? 'person' : 'people'}. reassign them first, then deactivate.`); return; }
    setConfirmId(u.id);
  };

  const setActive = (u, active) => {
    setUsers((list) => list.map((x) => (x.id === u.id ? { ...x, active } : x)));
    setTouchedId(u.id);
    setConfirmId(null);
    if (editId === u.id) setForm((f) => ({ ...f, active }));
    showToast('ok', active ? `${u.name} is active again and can sign in.` : `${u.name} is deactivated and can no longer sign in.`);
  };

  const StatusTag = ({ s }) => {
    const map = {
      Active: { bg: mix(brand.primaryColor, 12), Icon: Icons.CheckCircle },
      Invited: { bg: mix(brand.accentColor, 32), Icon: Icons.Clock },
      Deactivated: { bg: mix(brand.neutralColor, 26), Icon: Icons.X },
    }[s];
    return (
      <span className="tt-pill" style={{ background: map.bg, color: brand.primaryColor }}>
        <map.Icon className="w-3.5 h-3.5" aria-hidden="true" />
        {s}
      </span>
    );
  };

  const errorLine = (id, msg) =>
    msg ? (
      <p className="tt-err" id={id}>
        <Icons.AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>{msg}</span>
      </p>
    ) : null;

  const errorCount = Object.values(errors).filter(Boolean).length;
  const panelRadius = 'clamp(56px, 18vw, 180px)';

  return (
    <div
      className="tt-root"
      style={{ '--tt-ink': brand.primaryColor, '--tt-accent': brand.accentColor, '--tt-bg': brand.backgroundColor, fontFamily: brand.fontBody, background: brand.backgroundColor }}
    >
      <style>{CSS}</style>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12 flex flex-col gap-12">

        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-8" data-wf="b-0-0">
            <h1 className="tt-h m-0" style={{ fontFamily: brand.fontHeading, fontSize: 'clamp(36px, 6vw, 48px)', lineHeight: 1.1 }}>Users</h1>
            <p className="m-0 mt-3" style={{ color: 'var(--muted)', maxWidth: '52ch' }}>
              who can sign in, what they can do, and who approves their hours. {users.length} accounts, {activeCount} active.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <button type="button" className="tt-btn tt-primary" data-wf="b-0-1" onClick={startNew}>
              <Icons.Plus className="w-4 h-4" aria-hidden="true" />
              Add user
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <section data-wf="b-1-0" aria-labelledby="users-list-title" style={{ background: mix(brand.primaryColor, 6), borderRadius: brand.radius, padding: '24px 8px 16px', boxShadow: 'var(--lift)' }}>
          <h2 id="users-list-title" className="tt-h m-0 px-4 pb-4" style={{ fontFamily: brand.fontHeading, fontSize: 24 }}>everyone with an account</h2>
          {users.length === 0 ? (
            <div className="px-4 pb-6">
              <Empty
                title="no accounts yet"
                description="add the first person and they’ll get an invite link to set their own password."
                action={<button type="button" className="tt-btn tt-primary" onClick={startNew}>Add the first user</button>}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="tt-table" aria-label="Users">
                <THead>
                  <TR>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-0">Name</TH>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-1">Email</TH>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-2">Role</TH>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-3">Manager</TH>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-4">Status</TH>
                    <TH className="tt-th" scope="col" data-wf="i-1-0-5">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {users.map((u) => {
                    const mgr = u.managerId ? byId(u.managerId) : null;
                    const s = statusOf(u);
                    const cls = ['tt-row', editId === u.id ? 'tt-row-editing' : '', touchedId === u.id ? 'tt-row-fresh' : ''].join(' ');
                    return (
                      <TR key={u.id} className={cls}>
                        <TD className="tt-td">
                          <div className="flex items-center gap-3" style={{ opacity: u.active ? 1 : 0.7 }}>
                            <Avatar name={u.name} />
                            <span style={{ fontWeight: 600 }}>{u.name}</span>
                          </div>
                        </TD>
                        <TD className="tt-td" style={{ color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{u.email}</TD>
                        <TD className="tt-td">
                          <div className="flex flex-wrap gap-2">
                            {u.roles.map((r) => (
                              <span key={r} className="tt-pill" style={{ background: mix(brand.primaryColor, 9), color: brand.primaryColor }}>{r}</span>
                            ))}
                          </div>
                        </TD>
                        <TD className="tt-td">
                          {mgr ? mgr.name : (<><span aria-hidden="true">—</span><span className="sr-only">no manager</span></>)}
                        </TD>
                        <TD className="tt-td"><StatusTag s={s} /></TD>
                        <TD className="tt-td">
                          {confirmId === u.id ? (
                            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`Confirm deactivating ${u.name}`}>
                              <span style={{ fontSize: 14 }}>deactivate {u.name.split(' ')[0]}?</span>
                              <button type="button" className="tt-btn tt-sm tt-primary" onClick={() => setActive(u, false)}>Yes, deactivate</button>
                              <button type="button" className="tt-btn tt-sm tt-quiet" autoFocus onClick={() => setConfirmId(null)}>Keep active</button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              <button type="button" className="tt-btn tt-sm tt-quiet" aria-label={`Edit ${u.name}`} onClick={() => startEdit(u)}>
                                <Icons.Edit className="w-4 h-4" aria-hidden="true" />
                                Edit
                              </button>
                              {u.active ? (
                                <button type="button" className="tt-btn tt-sm tt-ghost" aria-label={`Deactivate ${u.name}`} onClick={() => askDeactivate(u)}>Deactivate</button>
                              ) : (
                                <button type="button" className="tt-btn tt-sm tt-ghost" aria-label={`Reactivate ${u.name}`} onClick={() => setActive(u, true)}>Reactivate</button>
                              )}
                            </div>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          )}
        </section>

        {/* Row 3 */}
        <form
          id="user-form"
          data-wf="b-2-0"
          onSubmit={submit}
          noValidate
          aria-labelledby="user-form-title"
          className="tt-panel"
          style={{
            background: mix(brand.primaryColor, 8),
            borderRadius: `${panelRadius} ${panelRadius} ${brand.radius} ${brand.radius}`,
            padding: `clamp(48px, 9vw, 96px) clamp(20px, 6vw, 64px) 40px`,
            boxShadow: 'var(--lift)',
          }}
        >
          <div className="mx-auto" style={{ maxWidth: 720 }}>
            <h2 id="user-form-title" className="tt-h m-0 text-center md:text-left" style={{ fontFamily: brand.fontHeading, fontSize: 28 }}>New / edit user</h2>
            <p className="m-0 mt-2 text-center md:text-left" style={{ color: 'var(--muted)' }} aria-live="polite">
              {editing
                ? `editing ${editing.name}. a new manager takes over future timesheets and leave requests.`
                : 'a new account gets an invite link by email, so they set their own password.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mt-8">
              <div>
                <Label htmlFor="f-name" className="tt-label">Full name</Label>
                <Input
                  id="f-name" data-wf="i-2-0-0" className="tt-field" autoComplete="off"
                  value={form.name} onChange={(e) => setField('name', e.target.value)}
                  placeholder="e.g. Marta Lindqvist"
                  aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'e-name' : undefined}
                />
                {errorLine('e-name', errors.name)}
              </div>
              <div>
                <Label htmlFor="f-email" className="tt-label">Email</Label>
                <Input
                  id="f-email" data-wf="i-2-0-1" className="tt-field" type="email" autoComplete="off"
                  value={form.email} onChange={(e) => setField('email', e.target.value)}
                  placeholder="name@marlowandfen.co.uk"
                  aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'e-email' : 'h-email'}
                />
                {errors.email ? errorLine('e-email', errors.email) : <p className="tt-hint" id="h-email">used only for invite and password-reset links.</p>}
              </div>

              <fieldset className="md:col-span-2 m-0 p-0 border-0" data-wf="i-2-0-2" aria-describedby={errors.roles ? 'e-roles' : 'h-roles'}>
                <legend className="tt-label" style={{ padding: 0 }}>Role</legend>
                <div className="flex flex-wrap gap-3">
                  {ROLES.map((r) => (
                    <label key={r} className="tt-choice" htmlFor={`f-role-${r.replace(/ /g, '-')}`}>
                      <Checkbox
                        id={`f-role-${r.replace(/ /g, '-')}`}
                        checked={form.roles.includes(r)}
                        onChange={() => toggleRole(r)}
                        aria-invalid={errors.roles ? 'true' : 'false'}
                      />
                      {r}
                    </label>
                  ))}
                </div>
                {errors.roles ? errorLine('e-roles', errors.roles) : <p className="tt-hint" id="h-roles">tick more than one if someone covers both admin duties. they get the permissions of each.</p>}
              </fieldset>

              <div>
                <Label htmlFor="f-manager" className="tt-label">Manager</Label>
                <Select
                  id="f-manager" data-wf="i-2-0-3" className="tt-field"
                  value={form.managerId} onChange={(e) => setField('managerId', e.target.value)}
                  aria-invalid={errors.managerId ? 'true' : 'false'} aria-describedby={errors.managerId ? 'e-manager' : 'h-manager'}
                >
                  <option value="">No manager</option>
                  {managers.map((m) => (<option key={m.id} value={String(m.id)}>{m.name}</option>))}
                </Select>
                {errors.managerId ? errorLine('e-manager', errors.managerId) : <p className="tt-hint" id="h-manager">required for employees. timesheets and leave go here for approval.</p>}
              </div>

              <div>
                <span className="tt-label" aria-hidden="true">Account</span>
                <label className="tt-choice" htmlFor="f-active">
                  <Checkbox
                    id="f-active" data-wf="i-2-0-4"
                    checked={form.active} onChange={(e) => setField('active', e.target.checked)}
                    aria-invalid={errors.active ? 'true' : 'false'} aria-describedby={errors.active ? 'e-active' : 'h-active'}
                  />
                  Active
                </label>
                {errors.active ? errorLine('e-active', errors.active) : <p className="tt-hint" id="h-active">untick to stop them signing in. their history stays.</p>}
              </div>
            </div>
          </div>
        </form>

        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-4 -mt-6">
          <div className="col-span-12 md:col-span-4 flex">
            <button type="submit" form="user-form" className="tt-btn tt-primary w-full" data-wf="b-3-0" disabled={saving} aria-busy={saving}>
              <Icons.Check className="w-4 h-4" aria-hidden="true" />
              {saving ? 'Sending invite…' : 'Save and send invite'}
            </button>
          </div>
          <div className="col-span-12 md:col-span-4 flex">
            <button
              type="button" className="tt-btn tt-quiet w-full" data-wf="b-3-1"
              disabled={!editing || !editing.active || resetting}
              onClick={sendReset} aria-describedby="h-reset" aria-busy={resetting}
            >
              {resetting ? 'Sending link…' : 'Send password reset'}
            </button>
          </div>
          <div className="col-span-12 md:col-span-4 flex items-center">
            <p id="h-reset" className="m-0" style={{ fontSize: 13, color: 'var(--muted)' }} aria-live="polite">
              {errorCount > 0
                ? `${errorCount} ${errorCount === 1 ? 'thing needs' : 'things need'} a look above. nothing you typed is lost.`
                : !editing
                ? 'password reset opens up once you pick someone to edit. saving changes to an existing user doesn’t send another invite.'
                : !editing.active
                ? `${editing.name} is deactivated. reactivate them to send a reset link.`
                : 'sends a single-use link that expires in 60 minutes.'}
            </p>
          </div>
        </div>
      </div>

      {/* feedback toast */}
      <div className="fixed left-0 right-0 bottom-6 flex justify-center px-4 pointer-events-none" role="status" aria-live="polite">
        {toast && (
          <div
            key={toast.at}
            className="tt-toast pointer-events-auto flex items-start gap-3"
            style={{ background: brand.backgroundColor, color: brand.primaryColor, borderRadius: 24, padding: '16px 16px 16px 20px', maxWidth: 480, boxShadow: '0 20px 48px -12px color-mix(in srgb, var(--tt-ink) 45%, transparent)' }}
          >
            {toast.kind === 'error'
              ? <Icons.AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--clay)' }} aria-hidden="true" />
              : <Icons.CheckCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />}
            <p className="m-0" style={{ fontSize: 15 }}>
              <strong style={{ fontWeight: 700 }}>{toast.kind === 'error' ? 'not done: ' : 'done: '}</strong>
              {toast.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
