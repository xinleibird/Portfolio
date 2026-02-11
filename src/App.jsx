import { Dock, NavBar, Windows, Welcome } from "#components";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

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
