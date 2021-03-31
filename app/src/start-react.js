const net = require('net');
const childProcess = require('child_process');
const { app } = require('electron');
const express = require("express");
const fetch = require("node-fetch").default;
const FormData = require("form-data");

const port = process.env.PORT ? process.env.PORT - 100 : 3000;
const expressPort = 3001;

// https is enabled for Instagram redirect URI compatibility

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
	client.connect({ port }, () => {
		client.end();
		if (!startedElectron) {
			console.log('starting electron');
			startedElectron = true;
			// const exec = childProcess.exec;
			// execSync('npm run electron');
      const electronProcess = childProcess.spawn("npm", ["run", "electron"]);

			// https://stackoverflow.com/questions/10232192/exec-display-stdout-live
			electronProcess.stdout.on("data", (data) => {
				process.stdout.write(data.toString());
			});

			electronProcess.stderr.on("data", (data) => {
				process.stdout.write(data.toString());
			})
		}
	});
};

tryConnection();

client.on('error', () => {
	setTimeout(tryConnection, 1000);
});
