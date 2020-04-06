exports.healthCheck = (_, res) => res.send({ uptime: process.uptime() });
