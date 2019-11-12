const { generatePublicKey } = require("../services/encryption.service");

module.exports = app => {
  app.post("/api/encryption", (req, res, next) => {
    const model = {
      doctorName: req.body.doctorName,
      clinicName: req.body.clinicName,
      password: req.body.password
    };
    var result = generatePublicKey(model);
    res.status(200).json({ result: result });
  });
};
