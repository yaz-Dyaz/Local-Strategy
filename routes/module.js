const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.post('/', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true), rbac.modules.store);
router.get('/', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.modules.index);
router.get('/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.modules.show);

module.exports = router;