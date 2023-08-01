const jwt = require("jsonwebtoken");
const config = require("../auth/auth.conf");
const sequelize = require('../../sequelize');
const { Roles } = require("../general");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if(err.name === 'TokenExpiredError'){
        return res.status(401).send({ message: 'H συνεδρία έληξε' });
      }
      return res.status(401).json({ message: err.message });
    }
    req.userId = decoded.id;
    req.role = decoded.role
    if(parseInt(req.role) === Roles.admin){
      req.isAdmin = true
    } else {
      req.isAdmin = false
    }
    next();
  });
};

isAdmin = (req, res, next) => {
  const roleId = parseInt(req.role);
  Roles.admin === roleId ? next() : res.status(403).send({
    message: "Require Admin Role!"
  });
};

isTeacher = (req, res, next) => {
    const roleId = parseInt(req.role);
    (Roles.teacher === roleId || Roles.admin === roleId) ? next() : res.status(403).send({
      message: "Require Teacher Role!"
    });
};

isModerator = (req, res, next) => {
  sequelize.models.sequelize.models.user.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  sequelize.models.sequelize.models.user.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isTeacher: isTeacher,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;