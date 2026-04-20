import clsx from "clsx";
import { Search } from "lucide-react";

import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";

import WindowControls from "./WindowControls";

const b = 2;

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  /**
   * @param {string} name
   * @param {any[]} items
   */
  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => {
          const { id, icon, name } = item;
          return (
            <li
              key={id}
              onClick={() => setActiveLocation(item)}
              className={clsx(
                id === activeLocation.id ? "active" : "not-active",
              )}
            >
              <img src={icon} alt={name} className="w-4" />
              <p className="truncate text-sm font-medium">{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  /**
   *
   * @param {import("#store/location").LocationItem} item
   */
  const openItem = (item) => {
    const { kind, fileType, href } = item;

    if (kind === "file") {
      if (fileType === "pdf") {
        openWindow("resume");
        return;
      }
      if (["fig", "url"].includes(fileType) && href) {
        window.open(href, "_blank");
        return;
      }
    }

    if (kind === "folder") {
      setActiveLocation(item);
      return;
    }

    openWindow(`${fileType}${kind}`, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="flex h-full bg-white">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("Projects", locations.work.children)}
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => {
            const { id, position, icon, name } = item;

            return (
              <li
                key={id}
                className={position}
                onClick={() => {
                  openItem(item);
                }}
              >
                <img src={icon} alt={name} />
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const WrappedWindow = WindowWrapper(Finder, "finder");

export default WrappedWindow;
