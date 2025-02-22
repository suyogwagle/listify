import User from "../models/user";
import { createJWT } from "../utils/index.js";

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
        nessage: "User account has been deactivated, contact the administrator",
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
    return res.status(400).json({status: false, messahe: error.message});
  }
};

const getTeamList = async( req, res) => {
  try{

  }catch(error){
    return res.status(400).json({status: false, messahe: error.message});
  }
};

export { registerUser, loginUser, logoutUser, getTeamList};