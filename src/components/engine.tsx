import Image from "next/image";
import { BookLink } from "./brand";
import { landingCopy as copy } from "@/lib/landing-copy";


function Comparison() {
  return (
    <figure className="case-comparison-two-images">
      <div className="case-two-grid">
        {/* BEFORE CARD */}
        <div className="compare-card compare-card-before">
          <div className="compare-card-head">
            <span className="compare-label">Before</span>
            <h3>Glamour MedSpa</h3>
            <p>Raw lead spreadsheets & slow front-desk decay</p>
          </div>
          <div className="compare-img-wrap">
            <Image
              src="/media/lead-review.jpg"
              alt="Receptionist reviewing a lead spreadsheet beside an empty consultation chair"
              className="compare-img"
              width={1086}
              height={724}
              sizes="(max-width: 680px) 95vw, (max-width: 1100px) 45vw, 490px"
            />
          </div>
          <div className="compare-card-stat stat-before">
            <strong>38% No-Show Rate</strong>
            <span>Empty treatment chairs during the week</span>
          </div>
        </div>


        {/* AFTER CARD */}
        <div className="compare-card compare-card-after">
          <div className="compare-card-head">
            <span className="compare-label label-after">After</span>
            <h3>GlowMedSpa</h3>
            <p>Booked & attended high-ticket consultations</p>
          </div>
          <div className="compare-img-wrap">
            <Image
              src="/media/attended-consultation.jpg"
              alt="Clinician and patient reviewing a tablet during a consultation"
              className="compare-img"
              width={1086}
              height={724}
              sizes="(max-width: 680px) 95vw, (max-width: 1100px) 45vw, 490px"
            />
          </div>
          <div className="compare-card-stat stat-after">
            <strong>85%+ Show Rate</strong>
            <span>15–30+ Booked consultations every month</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function Engine() {
  return (
    <>
      <section className="comparison-section section-space" aria-labelledby="comparison-title">
        <div className="container">
          <div className="section-head">
            <h2 id="comparison-title">{copy.comparison}</h2>
            <p className="section-side">Two clinics, same city. The difference is not the ads. It is what happens in the first 60 seconds after someone enquires.</p>
          </div>
          <Comparison />
        </div>
      </section>

      <section className="journey-section section-space" aria-labelledby="engine-title">
        <div className="container">
          <div className="section-head">
            <h2 id="engine-title">{copy.engineTitle}</h2>
            <p className="section-side">Four parts, installed in order. Nothing here needs your front desk to work harder.</p>
          </div>
          <ol className="engine-steps">
            {copy.stages.map((stage, i) => (
              <li key={stage.title} className="engine-step">
                <span className="engine-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
          <div className="mid-cta">
            <BookLink>{copy.midCta}</BookLink>
          </div>
        </div>
      </section>
    </>
  );
}
