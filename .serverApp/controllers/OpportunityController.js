/**
 * Created by Justin on 3/17/2015.
 */


function OpportunityController() {

}

OpportunityController.prototype = {
    getOpportunitiesFromAccount: function (request, response) {
        var accountId = request.params.accountId;
        var data = [];

        for (var i = 1; i <= 3; i++) {
            data.push({
                id: i,
                name: "Opportunity " + i,
                status: "2 Pending approvals",
                owner: {
                    id: 36 + i,
                    name: "Cristian Oyarzo"
                },
                value: 170000,
                saleProbability: 0.5
            });
        }
        setTimeout(function () {
            response.json(data);
        }, 1000);
    }
};

var instance = new OpportunityController();
module.exports = instance;