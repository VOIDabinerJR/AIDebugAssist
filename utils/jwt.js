const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const { shortID } = require('../utils/functions.js');

const createToken = (payload) => {

    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: '3d' 
    });
};


const decodeToken =async (token) =>{
    try {
        const decodedPayload = jwt.verify(token, process.env.SECRET);
        return decodedPayload; 
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado. Por favor, faça login novamente.');
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido. Por favor, faça login novamente.');
        } else {
            throw new Error('Erro ao decodificar o token.');
        }
    }
};

module.exports = { createToken, decodeToken};

