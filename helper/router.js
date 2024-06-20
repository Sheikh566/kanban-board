const router = require('express').Router();
const injectUser = require('../middleware/inject-user');
const authController = require('../controller/AuthController');
const userController = require('../controller/UserController');
const taskController = require('../controller/TaskController');

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);

router.route('/me').get(injectUser, userController.me);

router.route('/tasks').get(injectUser, taskController.getTasks);
router.route('/tasks').post(injectUser, taskController.createTask);
router.route('/tasks/:id').put(injectUser, taskController.updateTask);
router.route('/tasks/:id').delete(injectUser, taskController.deleteTask);

module.exports = router;