import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock, NavBar, Welcome, Windows } from "#components";
import Desktop from "#components/Desktop";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Windows />
      <Desktop />
    </main>
  );
}

export default App;
