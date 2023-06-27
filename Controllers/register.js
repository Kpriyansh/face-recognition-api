const User = require('../model/User')
const handleRegister = async (req, res, bcrypt) => {
    try {
        if(!req.body.username.length||!req.body.email.length||!req.body.password.length){
            return res.status(500).json('Invalid data');
        }
        const findUser = await User.findOne({email : req.body.email});
        if(findUser){
           return res.status(500).json('user already exist');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).json('error');
    }
}

module.exports = {
    handleRegister:handleRegister
}