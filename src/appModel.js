export default class AppModel{
    constructor() {
        this.userId = null;
        this.userName = null;
      
    }

    setUserId(userId){
        this.userId = userId;
    }

    setUserName(userName){
        this.userName = userName;
    }
}