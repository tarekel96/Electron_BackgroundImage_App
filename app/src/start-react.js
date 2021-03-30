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