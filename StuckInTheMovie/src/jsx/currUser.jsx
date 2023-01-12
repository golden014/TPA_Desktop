
// let instance;
// let email;
// let role;
// let address;
// let bankAcc;
// let DOB;
// let name;
// let phoneNum;
// let startWork;
// let status;

export default class currUser {
    constructor() {
        if (currUser.instance instanceof currUser) {
            return currUser.instance;
        }

        currUser.instance = this;
    }

    // static getCurrUser() {
    //     if (instance = null) {
    //         instance = new currUser();
    //     }

    //     return instance;
    // }

    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }

    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }

    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }

    getBankAcc() {
        return this.bankAcc;
    }
    setBankAcc(bankAcc) {
        this.bankAcc = bankAcc;
    }

    getDOB() {
        return this.DOB;
    }
    setDOB(DOB) {
        this.DOB = DOB;
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }

    getPhoneNum() {
        return this.phoneNum;
    }
    setPhoneNum(phoneNum) {
        this.phoneNum = phoneNum;
    }

    getStartWork() {
        return this.startWork;
    }
    setStartWork(startWork) {
        this.startWork = startWork;
    }

    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }

}

// export default instance;