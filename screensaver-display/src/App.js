import TempSettings from "./pages/TempSettings";
 // Use HashRouter (as opposed to BrowserRouter) because it works better with file-based Electron
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Route path="/" component={TempSettings} exact /> */}
      <Route path="/temp_settings" component={TempSettings} exact />
    </Router>
  );
}

export default App;
