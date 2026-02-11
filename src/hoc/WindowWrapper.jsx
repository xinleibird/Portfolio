import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

/**
 * A Higher Order Component that wraps a component in a window-like element
 * @param {React.ComponentType} Component - The component to wrap
 * @param {string} key - The key to identify the window
 * @returns {React.FC} - The wrapped component
 */
const WindowWrapper = (Component, key) => {
  /**
   * @param {Object} props - Component props
   * @returns {import("react").JSX.Element} - Rendered component
   */
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { zIndex, isOpen } = windows[key];
    const ref = useRef(null);

    useGSAP(() => {
      /** `@type` {HTMLElement} */
      const element = ref.current;
      if (!element) return;
      if (!isOpen) return;
      element.hidden = false;
      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      /** @type {HTMLElement} */
      const element = ref.current;
      if (!element) return;

      const [instance] = Draggable.create(element, {
        onPress: () => {
          focusWindow(windows[key]);
        },
      });

      return instance.kill;
    }, []);

    useLayoutEffect(() => {
      /** @type {HTMLElement} */
      const element = ref.current;
      if (!element) {
        return;
      }
      element.hidden = isOpen ? false : true;
    }, [isOpen]);

    return (
      <section id={key} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
