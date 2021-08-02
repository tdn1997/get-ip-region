const express = require("express");
const geoip = require("geoip-lite");
const ipaddr = require("ipaddr.js");
const publicIp = require("public-ip");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const ipv4 = ipaddr.process(req.ip).toString();
  const publicIpv4 = await publicIp.v4();
  const remoteAddress = req.connection.remoteAddress;

  // const geo1 = geoip.lookup("207.97.227.239");
  // const geo2 = geoip.lookup("10.71.221.241");
  const geo = geoip.lookup(ipv4);
  const geoPublic = geoip.lookup(publicIpv4);

  res.send(JSON.stringify({ ipv4, publicIpv4, remoteAddress, geo, geoPublic }));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
