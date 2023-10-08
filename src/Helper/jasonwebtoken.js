const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload,secretKey,expiresIn) =>{
    
    if(typeof payload !== 'object' || !payload){
        throw new Error('Payload must be o non-empty object');
    }

    if(typeof secretKey === 'string' || secretKey === ''){
        throw new Error('secretKey must be o non-empty string');
    }
    try {
      const token = jwt.sign(payload,secretKey,{expiresIn})
      return token;        
    } catch (error) {
     console.error('Failed to sign the JWT:', err);
     throw err;
    }
};

module.exports = {createJSONWebToken};
