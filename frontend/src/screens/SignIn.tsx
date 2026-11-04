// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const PRODUCT = "TimeTrack Pro";
const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [mismatch, setMismatch] = React.useState(false);
  const pill = { borderRadius: 999, border: 0, backgroundColor: tint(8), color: brand.primaryColor };

  return (
    <div className="flex min-h-screen flex-col" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`.at-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }`}</style>
      <header className="px-10 py-5" style={{ backgroundColor: tint(10) }}>
        <p className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>{PRODUCT}</p>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <main className="w-full max-w-md px-9 pb-9 pt-16 text-center" style={{ backgroundColor: tint(6), borderRadius: "170px 170px 24px 24px" }}>
          <h1 data-wf="b-0-0" className="text-3xl italic" style={{ fontFamily: brand.fontHeading }}>{"Sign in to TimeTrack Pro"}</h1>
          <p className="mt-2 text-sm lowercase" style={{ color: brand.neutralColor }}>welcome back — it is good to see you</p>
          <form data-wf="b-1-0" aria-label="Sign in" className="mt-8 space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); navigate('dashboard'); }}>
            <div className="space-y-1">
              <label htmlFor="at-email" className="block pl-4 text-xs lowercase" style={{ color: brand.neutralColor }}>email</label>
              <input data-wf="i-1-0-0" id="at-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="at-focus h-12 w-full px-5 text-sm outline-none" style={pill} />
            </div>
            <div className="space-y-1">
              <label htmlFor="at-password" className="block pl-4 text-xs lowercase" style={{ color: brand.neutralColor }}>password</label>
              <input data-wf="i-1-0-1" id="at-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="at-focus h-12 w-full px-5 text-sm outline-none" style={pill} />
            </div>
            <button data-wf="b-2-0" type="submit" className="at-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90" style={{ borderRadius: 999, backgroundColor: brand.accentColor, color: brand.backgroundColor }}>
              Sign in
            </button>
          </form>

          <form
            data-wf="b-3-0"
            className="mt-10 space-y-4 text-left"
            noValidate={false}
            onSubmit={(e) => {
              e.preventDefault();
              if (newPassword !== confirmPassword) { setMismatch(true); return; }
              setMismatch(false);
              navigate('dashboard');
            }}
          >
            <h2 className="text-center text-lg italic" style={{ fontFamily: brand.fontHeading }}>Set your password (from invite link)</h2>
            <div className="space-y-1">
              <label htmlFor="at-new-password" className="block pl-4 text-xs lowercase" style={{ color: brand.neutralColor }}>new password</label>
              <input data-wf="i-3-0-0" id="at-new-password" type="password" autoComplete="new-password" required value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setMismatch(false); }} className="at-focus h-12 w-full px-5 text-sm outline-none" style={pill} />
            </div>
            <div className="space-y-1">
              <label htmlFor="at-confirm-password" className="block pl-4 text-xs lowercase" style={{ color: brand.neutralColor }}>confirm password</label>
              <input data-wf="i-3-0-1" id="at-confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setMismatch(false); }} aria-invalid={mismatch} aria-describedby={mismatch ? "at-mismatch" : undefined} className="at-focus h-12 w-full px-5 text-sm outline-none" style={pill} />
            </div>
            {mismatch && (
              <p id="at-mismatch" role="alert" className="pl-4 text-xs lowercase" style={{ color: brand.primaryColor }}>
                <span aria-hidden="true">! </span>the two passwords do not match yet — check them and try again
              </p>
            )}
            <button data-wf="b-4-0" type="submit" className="at-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90" style={{ borderRadius: 999, backgroundColor: tint(10), color: brand.primaryColor }}>
              Set password
            </button>
          </form>

          <p className="mt-7 text-xs lowercase" style={{ color: brand.neutralColor }}>
            new here? <button type="button" className="at-focus italic underline underline-offset-4" style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}>plant an account</button>
          </p>
        </main>
      </div>
    </div>
  );
}
