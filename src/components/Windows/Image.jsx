import { SquarePlus } from "lucide-react";

import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

import WindowControls from "./WindowControls";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
        <SquarePlus />
      </div>

      <div className="space-y-6 bg-white p-5">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-auto max-h-3/4 w-full rounded-2xl object-contain"
          />
        )}
      </div>
    </>
  );
};

const WrappedWindow = WindowWrapper(Image, "imgfile");

export default WrappedWindow;
