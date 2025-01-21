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
        this.notify();
    }
    getCurrentRaised(){
        return parseInt(localStorage.getItem('currentRaised')) || 0;
    }
    addAmount(amount){
        this.currentAmount = this.getCurrentRaised() + amount;
        localStorage.setItem('currentRaised', this.currentAmount);
        this.notify();
    }
    suscribe(subscriber){
        this.suscribers.push(subscriber);
    }
    notify(){
        const currentAmount = this.getCurrentRaised();
        const targetAmount = this.getTargetAmount();
        this.suscribers.forEach(subscriber => subscriber(currentAmount,targetAmount));
    }
}