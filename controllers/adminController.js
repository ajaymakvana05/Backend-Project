const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const User = require('../models/user')

class admincontroller {
    // login = async (req, res) => {

    //     try {
    //         const { email, password } = req.body;
    //         console.log(req.body);

    //         if (!email || !password) {
    //             return res.json({ message: 'All Field Are Required !' });
    //         }

    //         const user = await admin.findOne({ email });
    //         console.log(user);

    //         if (!user) {
    //             return res.json({ message: 'User not found' });
    //         }


    //         const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
    //         console.log("token ,", token);

    //         res.cookie(
    //             'adminToken', {
    //             maxAge: 24 * 60 * 60 * 1000,
    //             httpOnly: true,
    //             secure: false

    //         })


    //         return res.status(200).json({ status: true, message: "Login Successfully............", token });
    //     } catch (error) {
    //         console.log(error);
    //         return res.json({ status: false, message: 'Internal Server Error', error: error })

    //     }

    // }



    admin = (req, res) => {
        res.render('/admindashboard');
    }

    loginAuth = async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'All Fields are Required' })
        }

        try {
            const adminAuth = await admin.findOne({ email })
            const userAuth = await User.findOne({ email })

            if (!adminAuth && !userAuth) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (adminAuth) {
                const MatchPassword = await bcrypt.compare(password, adminAuth.password);
                if (!MatchPassword) {
                    return res.status(401).json({ message: 'Password does not match' });
                }
                const token = jwt.sign({ userId: adminAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
                console.log("AdminToken", token);

                res.cookie(
                    'adminToken', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false
                })

                return res.status(201).json({ message: 'Login Succesfully....', admin: adminAuth, redirect: '/admin/dashboard' });

            }

            if (userAuth) {

                const MatchPassword = await bcrypt.compare(password, userAuth.password);
                if (!MatchPassword) {
                    return res.status(401).json({ message: 'Password does not match' });
                }
                const token = jwt.sign({ userId: userAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
                console.log("userToken", token);


                res.cookie(
                    'userToken', token, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false
                })

                return res.status(201).json({ message: 'Login Succesfully....', user: userAuth, redirect: '/user/dashboard' });

            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }


        // const { email, password } = req.body;

        // if (!email || !password) {
        //     return res.status(401).json({ message: 'All Fields are Required' })
        // }

        // const adminAuth = await admin.findOne({ email })
        // const userAuth = await User.findOne({ email })

        // if (!adminAuth && !userAuth) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // if (adminAuth) {
        //     try {
        //         const MatchPassword = await bcrypt.compare(password, adminAuth.password);
        //         if (!MatchPassword) {
        //             return res.status(401).json({ message: 'Password does not match' });
        //         }
        //         const token = jwt.sign({ userId: adminAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
        //         console.log("AdminToken", token);

        //         res.cookie(
        //             'adminToken', token, {
        //             maxAge: 24 * 60 * 60 * 1000,
        //             httpOnly: true,
        //             secure: false
        //         })

        //         return res.status(201).json({ message: 'Login Succesfully....', admin: adminAuth, redirect: '/admin/dashboard' });


        //     } catch (error) {
        //         console.log(error);
        //         return res.status(500).json({ message: 'Internal server error', error: error.message });
        //     }

        // } else if (userAuth) {
        //     try {
        //         const MatchPassword = await bcrypt.compare(password, userAuth.password);
        //         if (!MatchPassword) {
        //             return res.status(401).json({ message: 'Password does not match' });
        //         }
        //         const token = jwt.sign({ userId: userAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
        //         console.log("userToken", token);


        //         res.cookie(
        //             'userToken', token, {
        //             maxAge: 24 * 60 * 60 * 1000,
        //             httpOnly: true,
        //             secure: false
        //         })

        //         return res.status(201).json({ message: 'Login Succesfully....', user: userAuth, redirect: '/user/dashboard' });

        //     } catch (error) {
        //         console.log(error);
        //         return res.status(500).json({ message: 'Internal server error', error: error.message });
        //     }
        // }
    }
}

module.exports = new admincontroller();