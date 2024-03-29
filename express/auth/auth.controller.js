const sequelize = require('../../sequelize');
const { Sequelize } = require('sequelize');
const config = require("../auth/auth.conf");
const User = sequelize.models.user;
const Role = sequelize.models.roles;

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (user) => {
  return jwt.sign({ id: user.id,role: user.role }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
}

const signup = async (req, res) => {

  try {
    // Save User to Database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: '1'
    })
    
    const token = signToken(user);
    res.status(200).send({
      id: user.id,
      accessToken: token,
      username: user.username,
      email: user.email
    });
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = signToken(user);

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = signin;
exports.signup = signup;