"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  capacities,
  eligibleRoles,
  emptyIntake,
  roles,
  treatments,
  validateStep,
  type Intake,
} from "@/lib/intake";
import { Icon } from "./brand";

const bookingUrl =
  "https://api.leadconnectorhq.com/widget/booking/TasPmDDRY7qHE4Wj1MVn";
const titles = [
  "What is your clinic ZIP code?",
  "What is your role?",
  "Which treatments do you want to grow?",
  "How many more consultations can you handle?",
  "Last step — how can we reach you?",
];
const hints = [
  "That is all we need to check your 8-mile radius against current clinic partnerships. About 60 seconds total.",
  "The audit is designed for the people who decide how their clinic grows.",
  "Select all that apply. We will use these to prepare your audit.",
  "Choose the additional appointments your clinic could take each month.",
  "Share your clinic details so our team can prepare your local audit and review your territory.",
];

function Calendar() {
  const frame = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  useEffect(() => {
    function confirmed(e: MessageEvent) {
      if (
        e.origin !== new URL(bookingUrl).origin ||
        e.source !== frame.current?.contentWindow
      )
        return;
      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      const booked = Array.isArray(data)
        ? data[0] === "msgsndr-booking-complete"
        : data &&
          (data.action === "bookingConfirmed" ||
            data.event === "booking_success" ||
            data.eventName === "calendar-booked");
      if (booked) router.replace("/booking-confirmed");
    }
    window.addEventListener("message", confirmed);
    return () => window.removeEventListener("message", confirmed);
  }, [router]);
  return (
    <div className="booking-panel calendar-panel">
      <p className="eyebrow">Territory request received</p>
      <h1>Choose your growth call time.</h1>
      <p>
        Your ZIP code is under review. Pick a time below to complete your
        booking.
      </p>
      <iframe
        ref={frame}
        title="Ads That Converts growth call calendar"
        src={bookingUrl}
        className="booking-frame"
      />
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        Open the calendar in a new tab
      </a>
    </div>
  );
}
export default function TerritoryFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Intake>(emptyIntake);
  const [screen, setScreen] = useState<"form" | "resource" | "calendar">(
    "form",
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const id = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previous = useRef({ step, screen });
  useEffect(() => {
    if (previous.current.step !== step || previous.current.screen !== screen) {
      previous.current = { step, screen };
      if (heading.current) heading.current.focus();
      else document.getElementById("main")?.focus();
    }
  }, [step, screen]);

  function update<K extends keyof Intake>(key: K, value: Intake[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
    setError("");
  }
  async function advance(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const message = validateStep(data, step);
    if (message) {
      setError(message);
      return;
    }
    if (step === 1 && !eligibleRoles.includes(data.role)) {
      setScreen("resource");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      if (!id.current) id.current = crypto.randomUUID();
      const result = await fetch("/api/territory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id.current, clinic: data }),
      });
      if (!result.ok) {
        const response = await result.json();
        throw new Error(response.error || "Please try again.");
      }
      setScreen("calendar");
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Couldn’t reach the server. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (screen === "calendar") return <Calendar />;
  if (screen === "resource")
    return (
      <div className="booking-panel">
        <p className="eyebrow">Clinic resources</p>
        <h1 ref={heading} tabIndex={-1}>
          A guide for your team.
        </h1>
        <p>
          This call is for decision makers at an established MedSpa. Share the
          walkthrough with your clinic owner or medical director so they can
          request a territory review.
        </p>
        <div className="form-actions">
          <Link className="action" href="/">
            View the walkthrough
          </Link>
          <button className="text-link" onClick={() => setScreen("form")}>
            Change my role
          </button>
        </div>
      </div>
    );

  function field(
    key: Exclude<keyof Intake, "treatments">,
    label: string,
    type = "text",
    placeholder = "",
    autoComplete?: string,
  ) {
    return (
      <label className="text-field" key={key}>
        <span>{label}</span>
        <input
          type={type}
          name={key}
          required
          value={data[key]}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={key === "zip" ? 5 : 300}
          inputMode={key === "zip" ? "numeric" : undefined}
          pattern={key === "zip" ? "[0-9]{5}" : undefined}
          onChange={(e) => update(key, e.target.value)}
        />
      </label>
    );
  }
  function options(values: string[], key: "role" | "treatments" | "capacity") {
    return (
      <div className="options" role="group" aria-labelledby="question">
        {values.map((v) => (
          <label key={v}>
            <input
              type={key === "treatments" ? "checkbox" : "radio"}
              name={key}
              checked={
                key === "treatments"
                  ? data.treatments.includes(v)
                  : data[key] === v
              }
              onChange={(e) => {
                if (key === "treatments")
                  update(
                    key,
                    e.target.checked
                      ? [...data.treatments, v]
                      : data.treatments.filter((t) => t !== v),
                  );
                else update(key, v);
              }}
            />
            <span>{v}</span>
          </label>
        ))}
      </div>
    );
  }
  return (
    <div className="booking-panel">
      <div className="form-kicker">
        <p className="eyebrow">Territory review</p>
        <span>Step {step + 1} of 5 · About 60 seconds</span>
      </div>
      <div className="progress-track" aria-hidden="true">
        {titles.map((t, i) => (
          <i key={t} className={i <= step ? "done" : ""} />
        ))}
      </div>
      <h1 id="question" tabIndex={-1} ref={heading}>
        {titles[step]}
      </h1>
      <p>{hints[step]}</p>
      <form onSubmit={advance}>
        {step === 0 && (
          <div className="fields">
            {field("zip", "Clinic ZIP code", "text", "e.g. 59901", "postal-code")}
          </div>
        )}
        {step === 1 && options(roles, "role")}
        {step === 2 && options(treatments, "treatments")}
        {step === 3 && options(capacities, "capacity")}
        {step === 4 && (
          <div className="fields">
            <p className="form-summary">
              Checking territory for ZIP {data.zip || "—"}
              {data.treatments.length
                ? ` · ${data.treatments.join(", ")}`
                : ""}
              {data.capacity ? ` · ${data.capacity} a month` : ""}
            </p>
            {field("name", "Full name", "text", "", "name")}
            {field("clinic", "MedSpa name", "text", "", "organization")}
            {field(
              "website",
              "Clinic website",
              "text",
              "yourclinic.com",
              "url",
            )}
            {field("email", "Work email", "email", "", "email")}
            {field("phone", "Phone number", "tel", "", "tel")}
          </div>
        )}
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="form-actions">
          {step > 0 && (
            <button
              type="button"
              className="text-link"
              disabled={busy}
              onClick={() => {
                setStep(step - 1);
                setError("");
              }}
            >
              <Icon name="back" size={16} />
              Back
            </button>
          )}
          <button type="submit" className="action" disabled={busy}>
            {busy
              ? "Saving request…"
              : step === 4
                ? "Send request & pick a time"
                : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
