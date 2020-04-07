"use strict";

class CompanyFactory {
    constructor(config){
        this.EntityManager = config.EntityManager;
    }

    static _getBaseCompany(companyName){
        let company = JSON.parse(JSON.stringify(CompanyFactory.BASE_COMPANY));

        company.name = companyName;
        company.name_lower = companyName.toLowerCase();

        return company;
    }

    static _getSequentialRoom(i, m){
        return parseInt(i / m) * 100 + i % m + 100;
    }

    static _getDemoAlias(i){
        if(i > 99) return null;
        return i <= 9 ? "00" + i : "0" + i;
    }

    async makeDemoCompany(companyName, accessCode){
        let company = CompanyFactory._getBaseCompany(companyName);

        Object.assign(company, {
            isDemo: true,
            isTrial: false,
            accessCode: accessCode
        });

        return await this.EntityManager.CompanyDao.insertCompany(company);
    }

    async makeDemoRoom(companyKey, roomNumber){
        return await this.EntityManager.RoomDao.insertRoom(companyKey, {
            number: roomNumber,
            isDemo: true
        });
    }

    async makeDemoRooms(companyKey, numRooms) {
        let rooms = [];
        for(let i = 0; i < numRooms; i++){

            let roomNumber = CompanyFactory._getSequentialRoom(i, 6);
            rooms.push(await this.makeDemoRoom(companyKey, roomNumber));
        }
        return rooms;
    }

    async makeDemoDevice(companyKey, alias, serialNumber){

        let device = {
            alias: alias,
            company: companyKey,
            mac: "N/A",
            batteryVoltage: "N/A",
            serialNumber: serialNumber
        };

        return await this.EntityManager.ButtonDao.updateButton(serialNumber, device);
    }

    async makeDemoDevices(companyKey, accessCode, numDevices){
        let devices = [];
        for(let i = 0; i < numDevices; i++){

            let alias = CompanyFactory._getDemoAlias(i);
            let serialNumber = accessCode + "_" + i;
            devices.push(await this.makeDemoDevice(companyKey, alias, serialNumber));
        }
        return devices;
    }

}

CompanyFactory.BASE_COMPANY = {
    timezone: "US/Eastern"
};

module.exports = CompanyFactory;