import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";

import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";

const Desktop = () => {
  useGSAP(
    () => {
      Draggable.create(".folder");
    },
    { dependencies: [] },
  );

  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  return (
    <section id="desktop">
      <ul>
        {locations.work.children.map((project) => {
          const { id, windowPosition, name } = project;
          return (
            <li
              key={id}
              className={clsx("group folder", windowPosition)}
              onClick={() => {
                setActiveLocation(project);
                openWindow("finder");
              }}
            >
              <img src="/images/folder.png" alt={name} />
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Desktop;
