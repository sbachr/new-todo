var jwt = require('jsonwebtoken');
require('dotenv').config()

function cekToken(req,res,next){

    jwt.verify(req.headers.token, process.env.tokenSecretKey, function(err, decoded) {
        console.log(decoded.id) // bar
      });
    // try {
    //     console.log(process.env.tokenSecretKey)
    //     let decoded = jwt.verify(req.headers.token, process.env.tokenSecretKey);
    //     res
    //     .status(200)
    //     .json({
    //         user:decoded
    //     })
    //   } catch(err) {
    //     res
    //     .status(401)
    //     .json({
    //         msg : err.msg
    //     })
    //   }
}

module.exports = cekToken