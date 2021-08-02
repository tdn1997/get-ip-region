const express = require("express");
const geoip = require("geoip-lite");
const ipaddr = require("ipaddr.js");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const ipv4 = ipaddr.process(req.ip).toString();

  // const geo1 = geoip.lookup("207.97.227.239");
  // const geo2 = geoip.lookup("10.71.221.241");

  const geo = geoip.lookup(ipv4);

  res.send(JSON.stringify({ ipv4, geo }));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
