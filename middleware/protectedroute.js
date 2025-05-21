
class ProtectRoute {

    protectedRouteAdmin = (req, res, next) => {

        const admintoken = req.cookies['adminToken'];


        if (!admintoken) {
            return res.redirect('/');
        }

        next();
    };

    protectedRouteUser = (req, res, next) => {
        const usertoken = req.cookies['usertoken'];
        if (!usertoken) {
            return res.redirect('/');
        }

        next();
    }


}





module.exports = new ProtectRoute();
