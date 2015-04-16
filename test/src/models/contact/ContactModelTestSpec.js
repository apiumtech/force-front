/**
 * Created by joanllenas 4/14/15.
 *
 */

describe('ContactModel', function(){
    var ContactModel = app.getModel('models/contact/ContactModel');
    var model;

    beforeEach(function() {
        model = ContactModel.newInstance().getOrElse(throwInstantiateException(ContactModel));
    });

    describe("loadContactColumns", function(){
        it("should resolve the promise when operation succeeds", function(done){
            spyOn(model.entityService, "getEntityColumns").and.returnValue("some columns");
            model.loadContactColumns().then(
                function(columns){
                    expect(columns).toBe("some columns");
                    done();
                },
                function(){}
            );
        });

        it("should reject the promise when operation fails", function(done){
            spyOn(model.entityService, "getEntityByName").and.callFake(function(){
                throw new Error("forced error");
            });
            model.loadContactColumns().then(
                function(){},
                function(error){
                    expect(error).toBeDefined();
                    done();
                }
            );
        });
    });

    describe("loadContacts", function(){
        it("should make a tokenized ajax call ", function(){

            spyOn(model.ajaxService, 'rawAjaxRequest');
            var fakeToken = "fake token";
            spyOn(model.storageService, 'retrieve').and.returnValue(fakeToken);

            model.loadContacts();

            expect(model.ajaxService.rawAjaxRequest.calls.count()).toEqual(1);
            var argsForAjaxServiceCall = model.ajaxService.rawAjaxRequest.calls.argsFor(0);
            var params = argsForAjaxServiceCall[0];

            expect(params.headers).toBeDefined();
            expect(params.headers.token).toBe(fakeToken);
        });
    });

});