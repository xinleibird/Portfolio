import { useRef } from "react";
import { dockApps } from "#constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";

import useWindowStore from "#store/window";

const Dock = () => {
  const { openWindw, closeWindow, windows } = useWindowStore();

  const dockRef = useRef(null);

  const toggleApp = ({ id, canOpen }) => {
    if (!canOpen) {
      return;
    }

    const window = windows[id];

    if (window.isOpen) {
      closeWindow(id);
    } else {
      openWindw(id);
    }
  };

  useGSAP(
    (_, contextSafe) => {
      const dock = dockRef.current;
      if (!dock) {
        return () => {};
      }

      const icons = Array.from(dock.querySelectorAll(".dock-icon")).filter(
        (icon) => !icon.disabled,
      );

      const animateIcons = (distance = 0) => {
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

      const handleMouseMove = contextSafe(
        /** @param {MouseEvent} e */
        (e) => {
          const { left: dockLeft } = dock.getBoundingClientRect();
          const mouseXDistance = e.clientX - dockLeft;

          animateIcons(mouseXDistance);
        },
      );

      const handleMouseLeave = contextSafe(() => {
        icons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        });
      });

      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: dockRef },
  );

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-place="top"
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => {
                toggleApp({ id, canOpen });
              }}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-20"}
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
