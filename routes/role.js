const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.post('/', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true), rbac.roles.store);
router.get('/', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roles.index);
router.get('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roles.show);

module.exports = router;