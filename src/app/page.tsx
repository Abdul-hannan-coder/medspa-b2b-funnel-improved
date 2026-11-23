import Link from "next/link";
import {
  BookLink,
  Footer,
  Header,
  Icon,
  type IconName,
} from "@/components/brand";
import Walkthrough from "@/components/walkthrough";
import Engine from "@/components/engine";
import Reveal from "@/components/reveal";
import { landingCopy as copy } from "@/lib/landing-copy";
import "./landing.css";

const problemIcons: IconName[] = ["chat", "tag", "calendar", "target"];
const termIcons: IconName[] = ["clock", "pin", "calendar"];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        {/* 1-2. HERO — the clinic owner is the hero, one clear desire, one direct CTA */}
        <section className="hero">
          <div className="container">
            <p className="hero-eyebrow">{copy.eyebrow}</p>
            <p className="hero-lead">{copy.headlineLead}</p>
            <h1 className="hero-title">{copy.headline}</h1>
            <p className="hero-sub">{copy.description}</p>
            <div className="hero-actions">
              <BookLink>{copy.primary}</BookLink>
              <a className="action action-outline hero-secondary" href="#how-it-works">
                {copy.secondary}
              </a>
            </div>
            <p className="hero-micro">{copy.primarySub}</p>
            <Walkthrough />
            <p className="hero-reassurance">{copy.reassurance}</p>
          </div>
        </section>

        {/* 3. PROBLEM */}
        <section className="leaks section-space" aria-labelledby="problem-title">
          <div className="container">
            <Reveal>
              <h2 id="problem-title">{copy.problemTitle}</h2>
              <p className="section-intro">{copy.problemIntro}</p>
            </Reveal>
            <div className="problem-cards">
              {copy.problems.map((item, i) => (
                <article key={item.title}>
                  <div className="problem-icon">
                    <Icon name={problemIcons[i]} size={27} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GUIDE — empathy, then authority (the trust stats live here now) */}
        <section className="guide section-space" aria-labelledby="guide-title">
          <div className="container guide-grid">
            <Reveal>
              <p className="eyebrow">{copy.guideKicker}</p>
              <h2 id="guide-title">{copy.guideTitle}</h2>
              <p className="guide-body">{copy.guideBody}</p>
              <div className="hero-actions guide-actions">
                <BookLink>{copy.primary}</BookLink>
              </div>
            </Reveal>
            <ul className="guide-stats" aria-label="Agency experience and advertising partners">
              {copy.trust.map((item) => (
                <li key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. PLAN — 3 steps, the simplest section on the page */}
        <section className="plan section-space" aria-labelledby="plan-title">
          <div className="container">
            <Reveal>
              <p className="eyebrow centered">{copy.planKicker}</p>
              <h2 id="plan-title" className="plan-title">{copy.planTitle}</h2>
            </Reveal>
            <ol className="plan-steps">
              {copy.plan.map((step, i) => (
                <li key={step.title}>
                  <span className="plan-num" aria-hidden="true">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="centered-cta">
              <BookLink>{copy.planCta}</BookLink>
            </div>
          </div>
        </section>

        <div id="how-it-works">
          <Engine />
        </div>

        <section className="terms-section section-space" aria-labelledby="terms-title">
          <div className="container">
            <h2 id="terms-title">
              {copy.termsTitle}
              <br />
              <span>{copy.termsSub}</span>
            </h2>
            <div className="contract-cards">
              {copy.terms.map((item, i) => (
                <article
                  key={item.title}
                  className={i === 0 ? "contract-feature" : "contract-detail"}
                >
                  {i === 0 && <div className="contract-photo" aria-hidden="true" />}
                  <div className="contract-copy">
                    <div className="contract-mark">
                      <Icon name={termIcons[i]} size={23} />
                    </div>
                    {"note" in item && <p className="contract-note">{item.note}</p>}
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6-7. STAKES — failure vs success, side by side */}
        <section className="stakes section-space" aria-labelledby="stakes-title">
          <div className="container">
            <Reveal>
              <p className="eyebrow">{copy.stakesKicker}</p>
              <h2 id="stakes-title">{copy.stakesTitle}</h2>
            </Reveal>
            <div className="stakes-grid">
              <div className="stakes-card stakes-fail">
                <h3>{copy.stakesFailTitle}</h3>
                <ul>
                  {copy.stakesFail.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="stakes-card stakes-win">
                <h3>{copy.stakesWinTitle}</h3>
                <ul>
                  {copy.stakesWin.map((t) => (
                    <li key={t}>
                      <Icon name="check" size={17} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="audit section-space" aria-labelledby="audit-title">
          <div className="container audit-center-wrap">
            <p className="audit-kicker">{copy.agendaKicker}</p>
            <h2 id="audit-title" className="audit-heading">{copy.agendaTitle}</h2>
            <p className="audit-sub">{copy.agendaSub}</p>
            <div className="audit-agenda-container">
              <ol className="call-agenda-grid">
                {copy.agenda.map((item, idx) => (
                  <li key={item.title} className={`agenda-card agenda-card-${idx + 1}`}>
                    <div className="agenda-card-body">
                      <p className="agenda-time">Minutes {item.time}</p>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="audit-perks">
              <div className="audit-perk-item">
                <Icon name="shield" size={17} />
                <span>100% Free · No Obligation</span>
              </div>
              <div className="audit-perk-item">
                <Icon name="pin" size={17} />
                <span>Strictly 1 MedSpa Per 8 Miles</span>
              </div>
              <div className="audit-perk-item">
                <Icon name="growth" size={17} />
                <span>Free 72h Reactivation Blueprint Included</span>
              </div>
            </div>
            <div className="audit-cta">
              <BookLink>{copy.finalCta}</BookLink>
              <p className="audit-cta-guarantee">{copy.primarySub}</p>
            </div>
          </div>
        </section>

        <section className="faq section-space">
          <div className="container faq-grid">
            <div>
              <h2>{copy.faqTitle}</h2>
              <p className="faq-help">Still deciding? The territory check is free and takes about 60 seconds.</p>
              <BookLink>{copy.primary}</BookLink>
            </div>
            <div>
              {copy.faqs.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <Icon name="plus" size={17} />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Sticky mobile CTA — one action, always within thumb reach */}
      <div className="sticky-cta">
        <Link className="action sticky-cta-btn" href="/territory">
          <Icon name="pin" size={18} />
          {copy.primary}
        </Link>
        <span>{copy.primarySub}</span>
      </div>
    </>
  );
}
