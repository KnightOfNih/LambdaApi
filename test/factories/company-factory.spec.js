const assert = require("assert");
const CompanyFactory = require("../../modules/factories/company-factory");
const sinon = require("sinon");

describe("Company Factory", function () {

    let sandbox;

    beforeEach(async function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(async function () {
        sandbox.restore();
    });

    it("Should return a base company", async function () {
        let company = CompanyFactory._getBaseCompany("My Test");

        let base = JSON.parse(JSON.stringify(CompanyFactory.BASE_COMPANY));
        base.name = "My Test";
        base.name_lower = "my test";

        assert.deepEqual(base, company);
    });

    it("Should return room number 100 when 0 modded by 6", function () {
        let num = CompanyFactory._getSequentialRoom(0, 6);
        assert.equal(num, 100);
    });

    it("Should return room number 200 when 6 modded by 6", function () {
        let num = CompanyFactory._getSequentialRoom(6, 6);
        assert.equal(num, 200);
    });

    it("Should return room number 201 when 7 modded by 6", function () {
        let num = CompanyFactory._getSequentialRoom(7, 6);
        assert.equal(num, 201);
    });

    it("Should return room alias '008' when 1 digit number", function () {
        let num = CompanyFactory._getDemoAlias(8);
        assert.equal(num, "008");
    });

    it("Should return room alias '012' when 2 digit number", function () {
        let num = CompanyFactory._getDemoAlias(12);
        assert.equal(num, "012");
    });

    it("Should return null alias when 3 digit number", function () {
        let num = CompanyFactory._getDemoAlias(999);
        assert.equal(num, null);
    });

    it("Should make a demo company", async function () {

        let company = JSON.parse(JSON.stringify(CompanyFactory.BASE_COMPANY)),
            accessCode = "1234",
            companyName = "Test Company",
            companyFactory = new CompanyFactory({
                EntityManager: {
                    CompanyDao: {
                        insertCompany: sandbox.stub().returnsArg(0)
                    }
                }
            });

        company = await companyFactory.makeDemoCompany(companyName, accessCode);

        assert.equal(company.isDemo, true);
        assert.equal(company.isTrial, false);
        assert.equal(company.accessCode, accessCode);
    });

    it("Should make a demo room", async function(){
        let companyFactory = new CompanyFactory({
            EntityManager: {
                RoomDao: {
                    insertRoom: sandbox.stub().resolvesArg(1)
                }
            }
        });

        let room = await companyFactory.makeDemoRoom("company key", "1234");
        assert.equal(room.number, "1234");
        assert.equal(room.isDemo, true);
    });

    it("Should make demo rooms", async function(){
        let companyFactory = new CompanyFactory({
            EntityManager: {
                RoomDao: {
                    insertRoom: sandbox.stub().resolvesArg(1)
                }
            }
        });

        let rooms = await companyFactory.makeDemoRooms("company key", 8);
        assert.equal(rooms.length, 8);
    });

    it("Should make a demo device", async function(){
        let companyFactory = new CompanyFactory({
            EntityManager: {
                ButtonDao: {
                    updateButton: sandbox.stub().resolvesArg(1)
                }
            }
        });

        let original = {
            alias: "001",
            company: "1234",
            mac: "N/A",
            batteryVoltage: "N/A",
            serialNumber: "GSN-1"
        };

        let device = await companyFactory.makeDemoDevice(original.company, original.alias, original.serialNumber);
        assert.deepEqual(original, device);
    });

    it("Should make demo devices", async function(){
        let companyFactory = new CompanyFactory({
            EntityManager: {
                ButtonDao: {
                    updateButton: sandbox.stub().resolvesArg(1)
                }
            }
        });

        let devices = await companyFactory.makeDemoDevices("-XYZ", "1234", 4);
        assert.equal(devices.length, 4);
        assert.equal(devices[0].serialNumber, "1234" + "_" + 0);
    });

});