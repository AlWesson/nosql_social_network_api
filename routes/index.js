const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);
router.use((req,res) => {
    return res.status(404).send('Error 404 not found');
});

module.exports = router;