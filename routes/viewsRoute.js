const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', authController.noUser, authController.protect, viewsController.getOverviewPage);
router.get('/signup', viewsController.getSignupForm);
router.get('/login', viewsController.getLoginForm);
router.get('/account', authController.protect, viewsController.getAccount);
router.get('/billboard', authController.protect, viewsController.getBillboard);
router.get('/settings', authController.protect, viewsController.getSettingPage);
router.get('/create-post', authController.protect, viewsController.getCreatePostPage);
router.get('/create-img-vid', authController.protect, viewsController.getCreateVidImgPage);
router.get('/about', authController.protect, viewsController.getAboutPage);
router.get('/contact', authController.protect, viewsController.getContactPage);
router.get('/admin-billboard', authController.protect, authController.restrictTo('admin'), viewsController.adminGetBillboardPosts);
router.get('/admin-users', authController.protect, authController.restrictTo('admin'), viewsController.adminGetAllUsers);
router.get('/search', authController.protect, viewsController.getSearchPage);



router.get('/arts', authController.protect, viewsController.getArtsPage);
router.get('/architecture-construction', authController.protect, viewsController.getArchConstruct);
router.get('/business', authController.protect, viewsController.getBusinessPage);
router.get('/education-training', authController.protect, viewsController.getEduTrain);
router.get('/entertainment', authController.protect, viewsController.getEntertainment);
router.get('/engineering', authController.protect, viewsController.getEngineering);
router.get('/health-science', authController.protect, viewsController.getHealthSci);
router.get('/information-technology', authController.protect, viewsController.getInfoTech);
router.get('/manufacturing', authController.protect, viewsController.getManufacturingPage);
router.get('/marketing', authController.protect, viewsController.getMarketingPage);
router.get('/software-development', authController.protect, viewsController.getSoftDev);
router.get('/others',  authController.protect, viewsController.getOthersPage);

router.get('/:slug', authController.protect, viewsController.getOnePost);
router.get('/:hash', authController.protect, viewsController.getAccountPost);
router.get('/:id', authController.protect, viewsController.getStripePost);


module.exports = router;