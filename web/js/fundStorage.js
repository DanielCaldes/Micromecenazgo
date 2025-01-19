export class FundStorage{
    constructor(targetAmount){
        this.suscribers = [];   //Funtions to call when notification
        this.targetAmount = targetAmount;
        if (localStorage.getItem('currentRaised') === null) {
            localStorage.setItem('currentRaised', 0);
        }
    }

    resetCurrentRaised(){
        localStorage.setItem('currentRaised', 0);
    }
    getCurrentRaised(){
        return parseInt(localStorage.getItem('currentRaised')) || 0;
    }
    getTargetAmount(){
        return this.targetAmount;
    }
    setTargetAmount(targetAmount){
        this.targetAmount = targetAmount;
    }
    addAmount(amount){
        this.currentAmount = this.getCurrentRaised() + amount;
        localStorage.setItem('currentRaised', this.currentAmount);
        this.notificate();
    }
    suscribe(subscriber){
        this.suscribers.push(subscriber);
    }
    notificate(){
        const currentAmount = this.getCurrentRaised();
        const targetAmount = this.getTargetAmount();
        this.suscribers.forEach(subscriber => subscriber(currentAmount,targetAmount));
    }
}