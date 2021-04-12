// This page should probably never be navigated to, except by redirect from the Instagram authorization request

import { useEffect, useState } from "react";
import ky from "ky";
import { Redirect } from "react-router";

const { ipcRenderer } = window.require("electron");

const Auth = () => {
  const [redirect, setRedirect] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  const llToken = urlParams.get("ll_token");

  // TODO(Chris): Don't hardcode the proxy server port.
  // Exchange authorization code for short-lived authentication token
  useEffect(() => {
    const downloadLastImage = async () => {
      const userInfo = await ky.get("https://graph.instagram.com/me/media", {
        searchParams: {
          fields: "id,caption,media_url,permalink",
          access_token: llToken,
        },
      });
      if (!userInfo.ok) {
        console.log(
          "There's been a fetch error. Status code: " + userInfo.status
        );
        console.log("Status text: " + userInfo.statusText);
        const responseText = await userInfo.text();
        console.log("Response text: " + responseText);
      }
      const userInfoJson = await userInfo.json();

      const latestPost = userInfoJson.data[0];
      console.log(latestPost.media_url);
      ipcRenderer.send("download", {
        url: latestPost.media_url,
      });
    };

    downloadLastImage();

    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [redirect, llToken]);

  if (redirect) {
    return <Redirect exact to="/temp_settings" />;
  } else {
    return (
      <div>
        <h1>Hello, authentication!</h1>
        <p>Your authorization code is: {authorizationCode}</p>
      </div>
    );
  }
};

export default Auth;
