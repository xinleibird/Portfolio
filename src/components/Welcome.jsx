import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 *
 * @param {string} text ()
 * @param {string} className
 * @param {number} baseWeight
 * @returns
 */

const renderText = function renderText(text, className, baseWeight = 400) {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

/**
 *
 * @param {HTMLElement} container
 * @param {('title'|'subtitle')} type
 * @param {Function} contextSafe
 * @returns
 */

const setupTextHover = function setupTextHover(container, type, contextSafe) {
  if (!container) {
    return () => {};
  }

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHT[type];

  // Wrap the animation creation in contextSafe so GSAP tracks these animations
  const animateLetter = contextSafe((letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  });

  /**
   *
   * @param {MouseEvent} e
   */
  const handleMouseMove = (e) => {
    const { left: containerX } = container.getBoundingClientRect();
    const mouseX = e.clientX - containerX;

    letters.forEach((letter) => {
      const { left: letterX, width: letterWidth } =
        letter.getBoundingClientRect();
      const distance = Math.abs(
        mouseX - (letterX - containerX + letterWidth / 2),
      );
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef();
  const subtitleRef = useRef();

  useGSAP(
    (_, contextSafe) => {
      return setupTextHover(titleRef.current, "title", contextSafe);
    },
    { scope: titleRef },
  );

  useGSAP(
    (_, contextSafe) => {
      return setupTextHover(subtitleRef.current, "subtitle", contextSafe);
    },
    { scope: subtitleRef },
  );

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText("Hi, I'm Lei! Welcome to my", "text-3xl font-georama", 100)}
      </p>
      <h1 ref={titleRef}>
        {renderText("portfolio", "text-9xl font-georama italic")}
      </h1>

      <aside className="small-screen" role="alert">
        <p>
          {renderText(
            "This Portfolio is designed for desktop/tablet screens only.",
          )}
        </p>
      </aside>
    </section>
  );
};

export default Welcome;
