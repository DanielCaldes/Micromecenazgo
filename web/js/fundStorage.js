
// Funciona con un patrón de diseño observer, al añadir una cantidad se encarga de notificar a todos los subscriptores de forma que permite actualizar todos los lugares donde esté la cantidad.
// además, almacena los datos de la recaudación en local storage.
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
        const targetAmount = this.targetAmount;
        this.suscribers.forEach(subscriber => subscriber(currentAmount,targetAmount));
    }
}