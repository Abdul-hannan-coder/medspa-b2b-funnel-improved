import Image from "next/image";
import { Icon } from "./brand";

export default function Walkthrough() {
  return (
    <figure className="hero-media">
      <div className="video-cover">
        <Image
          src="/media/hero-walkthrough-thumb.jpg"
          alt="Preview of the MedSpa booking system walkthrough"
          fill
          sizes="(max-width: 900px) 96vw, 960px"
          priority
        />
        <span className="cover-play-wrap" aria-hidden="true">
          <span className="cover-play">
            <Icon name="play" size={24} />
          </span>
        </span>
      </div>
      <figcaption className="hero-caption">
        Watch: a lead becomes a booked, attended consultation. 2 minutes.
      </figcaption>
    </figure>
  );
}
