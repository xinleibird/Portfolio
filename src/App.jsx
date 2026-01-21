import { NavBar } from "#components";

/**
 * Root application component that renders the main layout containing the navigation bar.
 *
 * Renders a `<main>` element with a single `<NavBar />` child.
 * @returns {JSX.Element} The component's JSX element.
 */
function App() {
  return (
    <main>
      <NavBar />
    </main>
  );
}

export default App;