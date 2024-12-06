const projects = require("../Model/projectSchema");

exports.addProject = async (req, res) => {
  console.log("inside add project function");
  const { title, languages, overview, github, website } = req.body;
  const projectImage = req.file.filename;
  const userId = req.payload;
  // console.log(title);
  // console.log(languages);
  // console.log(overview);
  // console.log(github);
  // console.log(website);
  // console.log(projectImage);
  // console.log(userId);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already exist....");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// getHomeProjects

exports.getHomeProjects=async(req,res)=>{
  try {
    const homeProjects=await projects.find().limit(3)
    res.status(200).json(homeProjects)
  } catch (error) {
    res.status(401).json(error)
    
  }
}

// getAllProjects

exports.getAllProjects=async(req,res)=>{
  const searchKey=req.query.search
  const query={
    languages:{$regex:searchKey,$options:"i"}
  }
  try {
    const allProjects=await projects.find(query)
    res.status(200).json(allProjects)
  } catch (error) {
    res.status(401).json(error)
  }
}


// getUserProjects

exports.getUserProjects=async(req,res)=>{
  const userId = req.payload
  try {
    const userProjects=await projects.find({userId})
    res.status(200).json(userProjects)
  } catch (error) {
    res.status(401).json(error)
  }
}


// editUserProject

exports.editUserProject=async(req,res)=>{
  
  const { title, languages, overview, github, website ,projectImage} = req.body;
    const uploadImage = req.file?req.file.filename:projectImage
    const userId = req.payload;
    const {pid}=req.params

    try {
      const updateProject=await projects.findByIdAndUpdate({_id:pid},{
       projectImage :uploadImage, title, languages, github , overview , website , userId
      },{new:true})
      await updateProject.save()
      res.status(200).json(updateProject)
    } catch (error) {
      res.status(401).json(error)
    }
}


exports.deleteProjects=async(req,res)=>{
const{pid}=req.params
try {
  const deleteData = await projects.findByIdAndDelete({ _id: pid });
  res.status(200).json(deleteData)
} catch (error) {
res.status(401).json(error)
  
}
}