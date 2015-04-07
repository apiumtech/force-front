/**
 * Created by joanllenas on 4/2/15.
 */

module.exports = function (app) {
    var ContactController = require('../controllers/contactController');
    app.route('/api/contacts').get(ContactController.getContacts);
    app.route('/api/contacts/meta/fields').get(ContactController.getContactFields);
};