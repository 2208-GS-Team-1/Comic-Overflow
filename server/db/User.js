const db = require("./db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  // Our written fields:
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },

    // Returns with first letter capitalized.
    get() {
      const current = this.getDataValue("firstName");
      return current[0].toUpperCase() + current.slice(1);
    },
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },

    // Returns with first letter capitalized.
    get() {
      const current = this.getDataValue("lastName");
      return current[0].toUpperCase() + current.slice(1);
    },
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Most users are NOT admins
    validate: {
      notEmpty: true,
    },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Don't allow multiple accounts for the same email
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },

  birthday: {
    type: Sequelize.DATEONLY,
  },

  // Not sure how to validate this. Maybe just validate on front end?
  phoneNumber: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true,
      len: [10, 12], // Decided 10 <= length <= 12
    },
  },

  // Just a string. Technically should be its own table probably, with zip code, state, etc
  // But for simplicity sake, just any ol' string
  address: {
    type: Sequelize.STRING,
  },

  creditCard: {
    type: Sequelize.BIGINT,
    validate: {
      isCreditCard: true, // check for valid credit card numbers
    },
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
