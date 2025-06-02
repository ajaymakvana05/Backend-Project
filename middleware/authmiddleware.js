const jwt = require('jsonwebtoken');

module.exports.Authenticate = async (req, res, next) => {

    const usertoken = req.cookies['userToken'];

    if (!usertoken) {
        return res.redirect('/');
    }

    const token = usertoken;

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            console.log('Error:', err);
            return res.sendStatus(403);
        }
        req.user = user;

        next();
    })
}


module.exports.AuthenticateAdmin = (req, res, next) => {

    const token = req.cookies['adminToken'];

    if (!token) {
        return res.redirect('/')
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            console.log('Error:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })

}