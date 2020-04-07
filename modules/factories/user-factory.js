"use strict";

class UserFactory {

    static _getBaseUser(companyKey, userKey, email){
        let user = UserFactory.BASE_USER;
        user.companyKey = companyKey;
        user.email = email;

        UserFactory._applyGetKey(user, userKey);

        return user;
    }

    static _applyGetKey(obj, userKey){
        obj.getKey = function(){
            return userKey;
        };
        return obj;
    }

    static makeDemoUser(companyKey, userKey, email){
        let user = UserFactory._getBaseUser(companyKey, userKey, email);
        user.isAdmin = true;
        user.isDemo = true;
        return user;
    }
}

UserFactory.BASE_USER = {
    ignorePrompts: false,
    playNotificationSound: true,
};


module.exports = UserFactory;