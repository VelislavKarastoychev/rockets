class rocket {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.diameter = data.diameter.meters
        this.height = data.height.meters
        this.costPerLaunch = data.cost_per_launch
        this.fuelCostPerSecond = 1 //tone
        this.mass = data.mass.kg
        this.thrust = {
            sea_level : data.first_stage.thrust_sea_level.kN,
            vacuum : data.first_stage.thrust_vacuum.kN,
            space : data.second_stage.thrust.kN
        }
        this.fuelAmount = {
            firstStage : data.first_stage.fuel_amount_tons,
            secondStage : data.second_stage.fuel_amount_tons
        }
        this.fuelCosts = {
            firstStage : data.first_stage.burn_time_sec !== null? 
            this.fuelAmount.firstStage / data.first_stage.burn_time_sec : 1,
            secodnStage : data.second_stage.burn_time_sec !== null? 
            this.fuelAmount.secondStage / data.second_stage.burn_time_sec : 1
        }
    }
}
module.exports = rocket