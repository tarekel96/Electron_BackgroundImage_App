const net = require('net');
const childProcess = require('child_process');
const { app } = require('electron');
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch").default;
const FormData = require("form-data");

const port = process.env.PORT ? process.env.PORT - 100 : 3000;
const expressPort = 3001;

// https is enabled for Instagram redirect URI compatibility
process.env.ELECTRON_START_URL = `https://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
	client.connect({ port }, () => {
		client.end();
		if (!startedElectron) {
			console.log('starting electron');
			startedElectron = true;
			// const exec = childProcess.exec;
			// exec('npm run electron');
      childProcess.spawn("npm", ["run", "electron"]);
		}
	});
};

tryConnection();

client.on('error', () => {
	setTimeout(tryConnection, 1000);
});

/// Express

const server = express();

server.use(express.json());
server.use(cors());

server.post("/instagram_auth", cors(), (req, res) => {
  const authorizationCode = req.body.authorization_code;

  console.log("authorizationCode: " + authorizationCode);
  // console.log("req.body: " + JSON.stringify(req.body));

  const fetchSlToken = async () => {
    const formData = new FormData();
    formData.append("client_id", "765093417767855");
    formData.append("client_secret", "a7a0947d0367a41024f825989bf65049");
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", "https://localhost:3000/auth/");
    formData.append("code", authorizationCode);

    const response = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*", // TODO(Chris): Unsafe, should change later
          Origin: "https://localhost:3000",
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.log(
        "There's been a fetch error. Status code: " + response.status
      );
      console.log("Status text: " + response.statusText);
      const responseText = await response.text();
      console.log("Response text: " + responseText);

      res.status(500);
      return;
    }

    const data = await response.json();
    console.log(JSON.stringify(data));
    res.json({ shortLivedToken: data.access_token });
  };

  fetchSlToken();
});

server.listen(expressPort);