import "./App.css";
import Header from "./components/layout/header";
import PasswordGenerator from "./components/passwordGenerator/passwordGenerator";
function App() {
  return (
    <>
      <Header />
      <main>
        <PasswordGenerator />
      </main>
    </>
  );
}

export default App;
