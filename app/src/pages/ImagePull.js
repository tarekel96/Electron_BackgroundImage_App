import React from "react";
import { Button } from '../components/Button.js';
import { Typography } from '../components/Typography.js';
import styles from './download.module.css';
import Variants from '../styles/Variants.js';
const { PARAGRAPH, SPAN, ANCHOR, BTN, H_1, H_2, H_3, H_4, H_5, H_6 } = Variants;

// This seems like a pretty hacky one-liner
// TODO(Chris): Review this code?
const LocalURL = () => {
  return window.location.href.split("/").slice(0, 3).join("/") + "/";
};

const ImagePull = () => {
  const LogInToInstagram = () => {
    const authURL =
      "https://api.instagram.com/oauth/authorize?client_id=765093417767855&redirect_uri=https://localhost:3000/auth/&scope=user_profile,user_media&response_type=code";

    window.location = authURL;
  };

  return (
    <div>
      <Typography variant={H_1}>Hello, again!</Typography>
      <Button onClick={LogInToInstagram}>Log in.</Button>
      {/* <link to="https://en.wikipedia.org/wiki/Main_Page" /> */}
      <a href={LocalURL()}>Test Link</a>
    </div>
  );
};

export default ImagePull;
