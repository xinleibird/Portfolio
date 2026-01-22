import { useRef } from "react";
import { dockApps } from "#constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  /** @type {React.RefObject<HTMLDivElement>} */
  const docRef = useRef(null);
  const toggleApp = (app) => {
    console.log(app);
  };

  useGSAP((context) => {
    const dock = docRef.current;
    if (!dock) {
      return () => {};
    }

    const icons = Array.from(dock.querySelectorAll(".dock-icon")).filter(
      (icon) => !icon.disabled,
    );

    const animateIcons = (distance) => {
      const { left: dockLeft } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } =
          icon.getBoundingClientRect();
        const edgeDistance = iconLeft - dockLeft + iconWidth / 2;
        const mouseXBoundary = Math.abs(distance - edgeDistance);
        const intensity = Math.exp(-(mouseXBoundary ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.25,
          ease: "power1.out",
        });
      });
    };

    /**
     *
     * @param {MouseEvent} e
     */
    const handleMouseMove = (e) => {
      const { left: dockLeft } = dock.getBoundingClientRect();
      const mouseXDistance = e.clientX - dockLeft;

      animateIcons(mouseXDistance);

      return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
      };
    };

    const handleMouseLeave = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "power1.out",
        });
      });

      return () => {
        dock.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    context.add(() => dock.addEventListener("mousemove", handleMouseMove));
    context.add(() => dock.addEventListener("mouseleave", handleMouseLeave));
  }, []);

  return (
    <section id="dock">
      <div ref={docRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-place="top"
              data-tooltip-delay-show="150"
              disabled={!canOpen}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-20"}
                onClick={() => {
                  toggleApp({ id, canOpen });
                }}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" />
      </div>
    </section>
  );
};

export default Dock;
