"use strict";

class ErrorCodes {

	static getAuthServerDown(){
        return "Authentication service is not responding.";
	}

    static getInvalidAccessCode () {
        return "Invalid access code.";
    }

    static getInvalidUserNameOrPassword() {
        return "Invalid username or password.";
    }

	static getNoButtonFound (serialNumber) {
		return "Button " + serialNumber + " cannot be found.";
	}

    static getNoButtonVoltageFound (serialNumber) {
        return "Button " + serialNumber + " does not have a battery voltage.";
    }

	static getNoCompanyFound () {
		return "No company found with the provided key.";
	}

	static getNoCompanySupplied () {
		return "No company supplied for lookup.";
	}

	static getNoKeySupplied () {
		return "No key supplied for operation";
	}

    static getNoRoomFound(companyKey, serialNumber) {
        return "Room for company " + companyKey + " cannot be found with serialNumber " + serialNumber + ".";
    }

	static getNoTrayFoundWithButton (companyKey, serialNumber) {
		return "Tray for company " + companyKey + " cannot be found for button " + serialNumber + ".";
	}

	static getNoTrayFoundWithRoom (companyKey, roomNumber) {
		return "Tray for company " + companyKey + " cannot be found for room " + roomNumber + ".";
	}

	static getNoUserFound () {
		return "No user found with the provided key.";
	}

	static getNoUserKeySupplied () {
		return "No user key supplied for lookup.";
	}

    static getResourceNotSupported() {
        return "Resource not supported.";
    }

    static getDeliveryTimeStarted() {
        return "Notification skipped: Starting delivery time.";
    }

    static getNotificationSkipped() {
        return "Notification skipped due to company settings.";
    }

    static getNotValidAutoNotify() {
        return "Notification skipped due to modified tray.";
    }

    static noUsersFoundForTray(companyName, serialNumber, number) {
        return "No users found for notifications for tray (room|device) " + number + "|" + serialNumber + " at " + companyName;
    }

    static getAuthenticationServiceDown() {
        return "Authentication service is not responding.";
    }

    static getUnsupportedOperation(operation) {
        return operation + " is an unsupported operation.";
    }
}

module.exports = ErrorCodes;
