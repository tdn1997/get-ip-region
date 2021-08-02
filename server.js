const express = require("express");
const geoip = require("geoip-lite");
const ipaddr = require("ipaddr.js");
const publicIp = require("public-ip");
const requestIp = require("request-ip");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const ipv4 = ipaddr.process(req.ip).toString();
  const ipv4Geo = geoip.lookup(ipv4);

  const socketRemoteAddress = req.socket?.remoteAddress;
  const connectionRemoteAddress = req.connection.remoteAddress;

  const xForwardedForIp = req.headers["x-forwarded-for"]?.split(",").shift();
  const xForwardedForIpGeo = geoip.lookup(xForwardedForIp);
  const getClientIp = requestIp.getClientIp(req);
  const getClientIpGeo = geoip.lookup(getClientIp);

  const publicIpv4 = await publicIp.v4();
  const publicIpv4Geo = geoip.lookup(publicIpv4);

  res.send(
    JSON.stringify({
      ipv4,
      ipv4Geo,
      socketRemoteAddress,
      connectionRemoteAddress,
      xForwardedForIp,
      xForwardedForIpGeo,
      getClientIp,
      getClientIpGeo,
      publicIpv4,
      publicIpv4Geo,
    })
  );
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
