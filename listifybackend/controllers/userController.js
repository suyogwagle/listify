import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notice from "../models/notification.js";

const registerUser = async (req, res) => {
  try{
    const {name, email, password, isAdmin, role, title} = req.body;


    const userExist = await User.findOne({email});

    if(userExist){
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const user = await User.create({name, email, password, isAdmin, role, title});

    if(User){
      isAdmin ? createJWT(req, user._id): null;

      user.password = undefined;

      res.status(201).json(user);
    }else{
      return res
        .status(400)
        .json({status: false, message: "Invalid user data"});
    }

  }catch(error){
    return res.status(400).json({status: false, message: error.message});
  }
};


const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res
        .status(401)
        .json({status: false, message: "invalid email or password"});  
    }

    if(!user?.isActive){
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administrator",
      });
    }

    const isMatch = await user.matchPassword(password);

    if(user && isMatch){
      createJWT(res, user._id);

      user.password = undefined;

      res.status(200).json(user);
    }else{
      return res
        .status(401)
        .json({status: false, message: "Invalid email or password"});
    }

  }catch(error){
    return res.status(400).json({status: false, message: error.message});
  }
};


const logoutUser = async( req, res) => {
  try{
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({message: "Logout successful"});

  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const getTeamList = async( req, res) => {
  try{
    const users = await User.find().select("name title email isActive");

    res.status(200).json(users);
  }catch(error){
    return res.status(400).json({status: false, message: error.message});
  }
};

const getNotifications = async( req, res) => {
  try{
    const {userId} = req.user;

    const notice = await Notice.findOne({
      team: userId,
      isRead: {$nin: [userId] },
    }).populate("task", "title");

    res.status(200).json(notice);
  }catch(error){
    return res.status(400).json({status: false, message: error.message});
  }
};

const updateUserProfile = async( req, res) => {
  try{
    const {userId, isAdmin} = req.user;
    const {_id} = req.body;

    const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;

    const user = await user.findByid(id)

    if(user){
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;

      const updateUser = await User.save();
      user.password = undefined;

      res.status(201).json({
        status:true,
        message:"Profile updated successfully",
        user: updateUser,
      });
    }else{
      res.status(404).json({status: false, message: "User not found"});
    }
  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const markNotificationRead = async( req, res) => {
  try{
    const {userId} = req.user;

    const {isReadType, id}  = req.query;

    if(isReadType == "all"){
      await Notice.updateMany(
        {team: userId, isRead: {$nin: [userId]}},
        {$push: {isReda: userId}}, 
        {new: true}
      );
    }else{
      await Notice.findOneUpdate(
        {_id: id, isRead: {$nin: [userId]}},
        {$push: {isRead: userId}},
        {new: true}
      );
    }

    res.status(201).json({status: true, message: "Done!"});

  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const changeUserPasssword = async( req, res) => {
  try{
    const {userId} = req.user;

    const user = await User.findById(userId);

    if(user){
      user.password = req.body.password;
      await user.save();

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: `Password changed successfully`,
      });
    }else{
      res.status(404).json({status: false, message: "User not found!"});
    }

  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const activateUserProfile = async( req, res) => {
  try{
   const {id} = req.params;

   const user = await User.findById(id);

   if (user){
    user.isActive = req.body.isActive;
    await user.save();

    res.status(201).json({
      status: true,
      message: `User account has been ${user?.isActive ? "activated" : "deactivated"}`,
    });
   }else{
    res.status(404).json({status: false, message: "User not found!"});
   }

  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const deleteuserProfile = async( req, res) => {
  try{
   const {id} = req.params;

   await User.findByIdAndDelete(id);

   res
    .status(200)
    .json({status: true, message: "User deleted successfully"});

  }catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

export { registerUser,activateUserProfile, deleteuserProfile, loginUser, updateUserProfile, logoutUser, getTeamList, getNotifications, markNotificationRead, changeUserPasssword};