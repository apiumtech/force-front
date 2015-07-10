/**
 * Created by justin on 3/9/15.
 */

module.exports = function (app) {
    var TranslationController = require('../controllers/translationController');
    app.route('/api/translations/:language').get(TranslationController.getLanguage);
};