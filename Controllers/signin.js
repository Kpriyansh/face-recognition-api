const User = require('../model/User')

const handleSignin = async (req,res,bcrypt) =>{

    if (!req.body.email || !req.body.password) {
        return res.status(404).json('Invalid credentials');
    }
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user === null) {
            res.status(404).json('Not found');
        }
        await bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
                if (valid)
                    return res.json(user);
                res.status(404).json('Incorrect credentials');
            })
            .catch(error => {
                res.status(400).json('Not found');
            })

    }
    catch (err) {
        res.status(400).json('error');
    }

}
module.exports = {
    handleSignin:handleSignin
}