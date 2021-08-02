const express = require("express");
const geoip = require("geoip-lite");
const ipaddr = require("ipaddr.js");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const ipv4 = ipaddr.process(req.ip).toString();
  const geo = geoip.lookup(ipv4);

  res.send(JSON.stringify({ ipv4, geo }));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
