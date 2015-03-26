/**
 * Created by joanllenas on 3/26/15.
 */

exports.authenticate = function (request, response) {
    // Test credentials:
    // user: bruno_test@gmail.com
    // pass: dimarts1*
    if( request.header('user') === 'bruno_test@gmail.com' && request.header('userKey') === '7b414ab1746611d76c64d0b55a6cf5aaaaf865b3' ) {
        response.json({
            token: "sometoken"
        });
    } else  {
        response.status(401)
            .json({ error: 'Incorrect authentication credentials' });
    }
};