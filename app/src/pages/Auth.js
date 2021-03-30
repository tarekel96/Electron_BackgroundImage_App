// This page should probably never be navigated to, except by redirect from the Instagram authorization request

import React, { useEffect } from "react";
import { Typography } from "../components/Typography.js";
import Variants from "../styles/Variants.js";
import ky from "ky";

const { ipcRenderer } = window.require("electron");

const { PARAGRAPH, H_1 } = Variants;

const Auth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  const slToken = urlParams.get("sl_token");

  // TODO(Chris): Don't hardcode the proxy server port.
  // Exchange authorization code for short-lived authentication token
  useEffect(() => {
    const downloadLastImage = async () => {
      const userInfo = await ky.get("https://graph.instagram.com/me/media", {
        searchParams: {
          fields: "id,caption,media_url,permalink",
          access_token: slToken,
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
      ipcRenderer.send("asynchronous-message", {
        type: "DOWNLOAD",
        url: latestPost.media_url,
      });
    };

    downloadLastImage();
  });

  return (
    <div>
      <Typography variant={H_1}>Hello, authentication!</Typography>
      <Typography variant={PARAGRAPH}>
        Your authorization code is: {authorizationCode}
      </Typography>
    </div>
  );
};

export default Auth;
