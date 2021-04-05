import TempSettings from "./pages/TempSettings";
import Auth from "./pages/Auth";
 // Use HashRouter (as opposed to BrowserRouter) because it works better with file-based Electron
import { HashRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const { ipcRenderer } = window.require("electron");

function App() {
  return (
    <Router>
      <Route path="/" component={TempIndex} exact />
      <Route path="/temp_settings" component={TempSettings} exact />
      <Route path="/auth" component={Auth} />
    </Router>
  );
}

function TempIndex() {
  const [postsInfo, setPostsInfo] = useState([]);
  const [postIndex, setPostIndex] = useState(0);

  useEffect(() => {
    const existingInfo = ipcRenderer.sendSync("read-posts-info");
    if (existingInfo === null) {
      return;
    }

    console.log(existingInfo);
    setPostsInfo(existingInfo);

    const interval = setInterval(() => {
      if (postIndex >= postsInfo.length - 1) {
        setPostIndex(0);
        // console.log("Reset postIndex to 0.");
      } else {
        setPostIndex(postIndex + 1);
        // console.log("Incremented postIndex!");
      }

      // console.log("postIndex was most recently: " + postIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [postIndex, postsInfo.length]);

  console.log(postsInfo);

  const currentImage = postsInfo.length > 0 ? (
    <img src={postsInfo[postIndex].media_url} alt=""></img>
  ) : (
    <h1>Oops! You don't have any images available. Try logging in with the settings app.</h1>
  );

  return (
    <div>
      {currentImage}
    </div>
  )
}

export default App;
