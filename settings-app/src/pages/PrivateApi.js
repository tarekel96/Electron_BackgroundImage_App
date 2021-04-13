import { useEffect, useState } from "react";
import { Typography } from "../components/Typography.js";
import Variants from "../styles/Variants.js";

import { IgApiClient } from "instagram-private-api";

const { H_1 } = Variants;

const { ipcRenderer } = window.require("electron");

const PrivateApi = () => {
  useEffect(() => {
    ipcRenderer.send("private-api-login");
  });

  return (
    <div>
      <Typography variant={H_1}>Hello, world!</Typography>
    </div>
  );
};

export default PrivateApi;
