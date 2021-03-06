'use strict';
const jwt = require('jsonwebtoken');
const logger = require('module-logger');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = {expiresIn: '90d'};

module.exports = {
    create: content => {
        try {
            return jwt.sign(content, JWT_SECRET, JWT_EXPIRATION);
        } catch (e) {
            logger.fatal(e);
            return false;
        }
    },
    verify: token => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (e) {
            logger.fatal(e);
            return false;
        }
    },
};
