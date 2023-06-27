const User = require('../model/User')
const handeImage = async (req,res) =>{
    try{
    
        const user = await User.findById(req.body.id);
    
        if (user._id.toString() === req.body.id) {
            await user.updateOne({ $set: {
                rank: user.rank+1
            } });
            const updatedUser = await User.findById(req.body.id);
            res.json(updatedUser);
        } else {
            res.status(500).json('Something went wrong');
        }
       
        
    }
    catch(err){
        res.status(404).json(err);
    }
}
module.exports = {
    handeImage:handeImage
}