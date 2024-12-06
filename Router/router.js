const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const projectController = require("../Controller/projectController");
const jwtMiddleware = require("../Middleware/jwtMiddleware");

const multerConfig = require("../Middleware/multerMiddleware");

// register

router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// addProjects
// router specific middleware
router.post(
  "/addproject",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.addProject
);


// getHomeProjects
router.get("/homeProjects",projectController.getHomeProjects)


// getAllProjects
router.get("/allProjects",jwtMiddleware,projectController.getAllProjects)


// getUserlProjects
router.get("/userProjects",jwtMiddleware,projectController.getUserProjects)

// editProject
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)



// delete project
router.delete('/projects/remove/:pid',jwtMiddleware,projectController.deleteProjects)
router.put(
  "/updateProfile",
  jwtMiddleware,
  multerConfig.single("profileImage"), // Handles file upload (single file with field name 'profileImage')
  userController.updateProfile // Call to controller function
);

module.exports = router;