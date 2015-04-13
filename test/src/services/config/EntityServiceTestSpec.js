/**
 * Created by joanllenas on 4/8/15.
 */

describe("EntityService", function () {
    var EntityService = app.getService('services/config/EntityService');
    var StorageService = app.getService("services/StorageService");

    var sut, storage;
    beforeEach(function () {
        storage = StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        sut = EntityService.newInstance(storage).getOrElse(throwInstantiateException(EntityService));
    });

    afterEach(function(){
        window.localStorage.clear();
    });

    function storeFakeConfig(){
        var config = {
            entities: {
                account: {
                    fields:[
                        {
                            name: "Id",
                            crud: { label: "Id" }
                        },{
                            name: "Id",
                            crud: { label: "Id" }
                        }
                    ]
                }
            }
        };
        storage.store(EntityService.CONFIG_KEY, config );
    }

    describe('getEntityByName()', function(){
        it("should call storage's retrieve()", function(){
            storeFakeConfig();
            var entity = "contact";
            spyOn(storage, "retrieve");
            sut.getEntityByName(entity);
            expect(storage.retrieve).toHaveBeenCalled();
        });

        it('should return the correct entity', function(){
            storeFakeConfig();
            var entity = sut.getEntityByName(EntityService.CONFIG_KEY);
            expect(entity.fields.length).toBe(2);
        });
    });
});