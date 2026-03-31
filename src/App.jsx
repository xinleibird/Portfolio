import gsap from "gsap";
import Draggable from "gsap/Draggable";

import { Dock, NavBar, Welcome, Windows } from "#components";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Windows />
    </main>
  );
}

export default App;
