import Task from "../models/task.js"
import Notice from "../models/notification.js"
import User from "../models/user.js";

const createTask = async (req, res) => {
  try{
    const {userId} =req.user;
    
    const {title, team, stage, date, priority, assets} = req.body;

    let text = "New task has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
    });

        await Notice.create({
          team, text, task: task._id,
        });

        res 
          .status(200)
          .json({status: true,task, message:"Task created successfully."});

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }

};


const duplicateTask = async (req, res) => {
  try{
    const {id} = req.params;

    const task = await Task.findById(id);

    const newTask = await Task.create({
      ...task, title: task.title + " -Duplicate",
    });

    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;

    await newTask.save();

    let text = "New task has been asssigned to you"
    if(task.team.length > 1){
      text = text + `and ${task.tam.length - 1} others.`;
    }

    text =
        text + `The task priority is set a ${task.priority}
        priority, so check and act accordingly. The dask date is ${task.date.toDateString()}. Thank You!!`;

        await Notice.create({
          team, text, task: newTask._id,
        });

        res 
          .status(200)
          .json({status: true, message:"Task duplicated successfully."});

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};



const postTaskActivities = async (req, res) => {
  try{
    const {id} = req.params;
    const {userId} = req.user;
    const {type, activity} = req.body;

    const task = await Task.findById(id);

    const data= {type, activity, by: userId,};

    task.activities.push(data);

    await task.save();

    res
      .status(200)
      .json({status: true, message: "Activity posted successfully."})

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const dashboardStatistics = async (req, res) => {
  try{
    const {userId, isAdmin} = req.user;

    const allTask = isAdmin ? await Task.find({
      bin: false,
    }).populate({ path: "team", select: "name role title email",}).sort({_id: -1}) 
    : await Task.find({
      bin: false,
      team: {$all: [userId]},
    }).populate({ path: "team", select: "name role title email",}).sort({_id: -1}); 

    const users = await User.find({isActive: true}).select("name title role isAdmin createdAt").limit(10).sort({_id: -1});


    const groupTasks = alltasks.reduce((result, task) =>{
      const stage = task.stage;
      if(!result[stage]){
        result[stage] = 1;
      }else{
        result[stage] += 1;
      }
      return result;
    }, {}); 

    const groupData = Object.entries(
      alltasks.reduce((result, task) =>{
        const {priority} = task;

        result[priority] = (result[priority] || 0) + 1;

        return result;
      },{})).map(([name, total])=> ({name, total}));

      const totalTasks = allTasks.length;
      const last10Task = allTasks?.slice(0,10);

      const summary = {
        totalTasks, last10Task, users: isAdmin ? users : [], tasks: groupTasks, graphData: groupData,
      };

      res.status(200).json({status: true, message: "Successfully", ...summary,})

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const getTasks = async (req, res) => {
  try{
    const {stage, bin} =  req.query;

    let query = {bin: bin ? true : false};

    if(stage){
      query.stage = stage;
    }

    let queryResult = Task.find(query).populate({
      path: "team", select: "name title email",
    }).sort ({_id: -1});

    const tasks = await queryResult;

    res.status(200).json({status: true, tasks,})
  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const getTask = async (req, res) => {
  try{
    const {id} = req.params;

    const task = await Task.findById(id).populate({ path: "team", select: "name title role email"}).populate({path:"activities.by", select:"name",}).sort({_id: -1});

      res.status(200).json({status: true, task,});

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const createSubTask = async (req, res) => {
  try{
    const {title, tag, date} = req.body;
    const {id} = req.params;

    const subTask = {title, date, tag,};

    const task = await Task.findById(id);

    task.subTasks.push(newSubTask);

    await task.save();

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const updateTask = async (req, res) => {
  try{
    const {id} = req.params;
    const {title, date, team, stage, priority, assets} = req.body;

    const task =  await Task.findById(id);

    task.title = title;
    task.date = date;
    task.team = team;
    task.stage = stage.toLowerCase();
    task.priority = priority.toLowerCase();
    task.assets = assets;

    await task.save();

    res.status(200).json({status: true, message: "Task updated successfully."});

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const binTask = async (req, res) => {
  try{
    const {id} = req.params;

    const task = await Task.findById(id);

    task.bin = true;

    await task.save();

    res.status(200).json({status: true, message: "Task binned successfully."});

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

const deleteRestoreTask = async (req, res) => {
  try{
    const {id} = req.params;
    const { actionType} = req.query;

    if(actionType === "delete"){
      await Task.findByIdAndDelete(id);
    }else if(actionType === "deleteAll"){
      await Task.deleteMany({bin: true});
    }else if(actionType === "restore"){
      const resp = await Task.findById(id);

      resp.bin = false;
      resp.save();
    }else if(actionType === "restoreAll"){
      await Task.updateMany({bin: true}, {$set:{bin: false}});
    }
    
res.status(200).json({status: true, messgae:"Desired operation is performed successfully."})

  } catch(error){
    console.log(error);
    return res.status(400).json({status: false, message: error.message});
  }
};

export {createTask, duplicateTask, postTaskActivities, dashboardStatistics, getTasks, getTask, createSubTask, updateTask, binTask, deleteRestoreTask};