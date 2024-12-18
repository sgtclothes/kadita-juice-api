const { Sequelize } = require("sequelize");
const config = require("../config/database.js");
const setupJuiceModel = require("./juice.model");
const setupAdminModel = require("./admin.model");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

const db = {
    sequelize,
    Sequelize,
    Juice: setupJuiceModel(sequelize),
    Admin: setupAdminModel(sequelize),
};

module.exports = db;
