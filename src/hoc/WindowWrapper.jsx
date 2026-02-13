import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

/**
 * A Higher Order Component that wraps a component in a window-like element
 * @param {React.ComponentType} Component - The component to wrap
 * @param {"finder"|"contact"|"resume"|"safari"|"photos"| "terminal"|"txtfile"|"imgfile"} windowKey - The key to identify the window
 * @returns {React.FC} - The wrapped component
 */
const WindowWrapper = (Component, windowKey) => {
  /**
   * @param {Object} props - Component props
   * @returns {import("react").JSX.Element} - Rendered component
   */
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { zIndex, isOpen } = windows?.[windowKey] || {};
    const ref = useRef(null);

    useGSAP(
      () => {
        /** @type {HTMLElement} */
        const element = ref.current;
        if (!element) {
          return;
        }
        gsap.fromTo(
          element,
          { scale: 0.8, opacity: 0, y: 100 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      },
      { dependencies: [isOpen], scope: ref },
    );

    useGSAP(
      () => {
        /** @type {HTMLElement} */
        const element = ref.current;
        if (!element) {
          return;
        }

        const [instance] = Draggable.create(element, {
          onPress: () => {
            focusWindow(windowKey);
          },
        });

        return () => {
          instance.kill();
        };
      },
      { dependencies: [], scope: ref },
    );

    useLayoutEffect(() => {
      /** @type {HTMLElement} */
      const element = ref.current;
      if (!element) {
        return;
      }

      element.hidden = isOpen ? false : true;
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
