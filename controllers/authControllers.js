const User = require('../models/user');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const welcomeMail = require('../util/email');

postSignUp = async (req,res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        if( email && password) {
            if(password !== confirmPassword) { return res.status(400).send('Passwords do not match')}
            const hashedPassword = await bcrypt.hash(password, 12);
            await User.create({
                email,
                password: hashedPassword
            })
            welcomeMail(email);
            res.status(200).send('User Created!')
        }
        else { return res.status(400).send('Check your email or password' )}
    }
    catch(err) { res.status(400).send(err) }
}

postLogin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: {email: email}});
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) { 
                req.session.isLoggedIn = true;
                return res.send('Logged In!') 
            } else { return res.status(400).send('Incorrect Password') }
        }
        else { return res.status(400).send('User does not exist')}        
    }
    catch (err) { return res.send(err) };
}

postLogout = (req, res) => {
    req.session.destroy();
    return res.send('Logged Out!')
}

module.exports = {
    postSignUp,
    postLogin,
    postLogout
}