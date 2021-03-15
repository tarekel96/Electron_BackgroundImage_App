// This page should probably never be navigated to, except by redirect from the Instagram authorization request

import React, { useEffect } from "react";
import { Typography } from "../components/Typography.js";
import styles from "./download.module.css";
import Variants from "../styles/Variants.js";
import ky from "ky";
import fs from "fs";
import http from "http";

const { ipcRenderer } = window.require("electron");

const { PARAGRAPH, SPAN, ANCHOR, BTN, H_1, H_2, H_3, H_4, H_5, H_6 } = Variants;

const Auth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  // const testImage2 = ky
  //   .get("https://graph.instagram.com/me/media", {
  //     searchParams: {
  //       fields: "id,caption,media_url,permalink",
  //       access_token:
  //         "IGQVJXSVN2aVNBUWV1bE1Wbk1JOXNMZAE1MQVdZAQ0ZASYzZAURUpaZAFFncjVkdnoyTTI4Tktjc09rSEh5NGF6RzNEM1lLNEhoT0VnT0FqNU9NQ0Y2RzdQQ3lXU2hSV1RhMWdfZAEx5bmZAn",
  //     },
  //   })
  //   .then((res) => console.log(res.json()));

  const formData = new FormData();
  formData.append("client_id", "765093417767855");
  formData.append("client_secret", "a7a0947d0367a41024f825989bf65049");
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", "https://localhost:3000/auth/");
  formData.append("code", authorizationCode);

  // TODO(Chris): Don't hardcode the proxy server port.
  // Exchange authorization code for short-lived authentication token
  useEffect(() => {
    const fetchSlToken = async () => {
      const slTokenResponse = await fetch(
        "http://localhost:3001/instagram_auth",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*", // TODO(Chris): Unsafe, should change later
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorization_code: authorizationCode,
          }),
        }
      );

      const jsonResponse = await slTokenResponse.json();
      const slToken = jsonResponse.shortLivedToken;

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

    fetchSlToken();
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

function download(dataurl, filename) {
  const a = document.createElement("a");
  a.href = dataurl;
  a.setAttribute("download", filename);
  a.click();
}

export default Auth;
