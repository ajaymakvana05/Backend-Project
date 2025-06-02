const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const User = require('../models/user');
// const user = require('../models/user');

class Admincontroller {

    admin = (req, res) => {
        res.render('admindashboard/admindashboard');
    }

    loginAuth = async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'All Fields are Required' })
        }

        try {
            const adminAuth = await admin.findOne({ email });
            const userAuth = await User.findOne({ email });

            if (!adminAuth && !userAuth) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (adminAuth) {
                const MatchPassword = await bcrypt.compare(password, adminAuth.password);
                if (!MatchPassword) {
                    return res.status(401).json({ message: 'Password does not match' });
                }
                const token = jwt.sign({ userId: adminAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
                // console.log("AdminToken", token);

                res.cookie(
                    'adminToken', token, {
                    maxAge: 1000 * 60 * 15,
                    httpOnly: true,
                    secure: false
                })

                return res.status(200).json({ message: 'Login Succesfully....', admin: adminAuth, redirect: '/admin/dashboard' });
            }

            if (userAuth) {
                const MatchPassword = await bcrypt.compare(password, userAuth.password);
                if (!MatchPassword) {
                    return res.status(401).json({ message: 'Password does not match' });
                }
                const token = jwt.sign({ userId: userAuth._id }, process.env.SECRET_TOKEN, { expiresIn: '24h', });
                // console.log("userToken", token);


                res.cookie(
                    'userToken', token, {
                    maxAge: 1000 * 60 * 15,
                    httpOnly: true,
                    secure: false
                })

                return res.status(201).json({ message: 'Login Succesfully....', user: userAuth, redirect: '/user/dashboard' });

            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

    createUser = async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User Already Exists' });
            };

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // console.log(hashedPassword);


            const newUser = await User.create({
                name, email, password: hashedPassword
            })

            // console.log(newUser);
            return res.status(201).json({ message: 'User Created Succesfully...', user: newUser });


        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);

        }
    }

    allUserFind = async (req, res) => {
        try {
            const allUser = await User.find().select('-password -_id -__v');
            // console.log(allUser);
            return res.status(200).json({ message: "Data Fetched Succesfully", allUser });

        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new Admincontroller();