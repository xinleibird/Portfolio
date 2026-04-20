import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

import WindowControls from "./WindowControls";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) {
    return null;
  }

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="space-y-6 bg-white p-5">
        {image && (
          <img src={image} alt={name} className="h-auto w-full rounded-2xl" />
        )}

        {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}

        {Array.isArray(description) && description.length > 0 && (
          <div className="space-y-3 text-base leading-relaxed text-gray-800">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const WrappedWindow = WindowWrapper(Text, "txtfile");

export default WrappedWindow;
