import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

import WindowControls from "./WindowControls";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>
      <div className="space-y-6 p-5">
        <img
          src="/images/adrian.jpg"
          alt="Adrian"
          className="w-20 rounded-full"
        />

        <h3>Let's Contact</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in. </p>
        <ul>
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const WrappedWindow = WindowWrapper(Contact, "contact");

export default WrappedWindow;
