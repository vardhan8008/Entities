var UserModel=require("../models/user.model")
exports.addUser = async function(data){
    var userdata = new UserModel(data)
    try{
        var result = await userdata.save()
        console.log("result of adding user",result)
        return result
    }
    catch(e){
        throw e
    }
}
 
exports.findUser = async function(data){
    var projection = {
        name:1,
        email:1,
        role:1,
    }
    try {
        var result = await UserModel.findOne(data,projection)
        console.log("result of finding user", result)
        return result
    }
    catch(e){
        throw e
    }
}