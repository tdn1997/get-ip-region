const express = require("express");
const geoip = require("geoip-lite");
const ipaddr = require("ipaddr.js");
const publicIp = require("public-ip");
const requestIp = require("request-ip");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const ipv4 = ipaddr.process(req.ip).toString();
  const parseIp = req.headers["x-forwarded-for"]?.split(",").shift();
  const remoteAddress1 = req.socket?.remoteAddress;
  const remoteAddress2 = req.connection.remoteAddress;

  const clientIp = requestIp.getClientIp(req);

  const publicIpv4 = await publicIp.v4();

  // const geo1 = geoip.lookup("207.97.227.239");
  // const geo2 = geoip.lookup("10.71.221.241");
  const geo = geoip.lookup(ipv4);
  const geoPublic = geoip.lookup(publicIpv4);

  res.send(
    JSON.stringify({
      ipv4,
      clientIp,
      parseIp,
      publicIpv4,
      remoteAddress1,
      remoteAddress2,
      geo,
      geoPublic,
    })
  );
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
