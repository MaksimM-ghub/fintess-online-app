export type Gender = "male" | "female"
export type Purpose = "deficit" | "surplus" | "weightMaintenance";


export function calcCalories(
    gender: Gender | string,
    weight: number | null,
    height: number | null,
    age: number | null,
    PAL: number,
    purpose: Purpose | string
): number | null {
    let BMR: number | null = null;

    if (gender !== null && weight !== null && height !== null && age !== null && PAL !== null && purpose !== null) {
        if (gender === "male") {
            BMR = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * PAL;
        } else if (gender === "female") {
            BMR = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * PAL;
        }
    }

    if (!BMR) return null;


    switch (purpose) {
        case "deficit":
            return Number((BMR * 0.8).toFixed(0));
        case "surplus":
            return Number((BMR * 1.2).toFixed(0));
        case "weightMaintenance":
            return Number(BMR.toFixed(0));
        default:
            return null;
    }
}


export function calcPFC(totalCalories: number, purpose: Purpose | string) {
    let protein: number;
    let fats: number;
    let carbohydrates: number;

    switch (purpose) {
        case "deficit":
            protein = Math.round((totalCalories * 0.2) / 4);             
            fats = Math.round((totalCalories * 0.2) / 9);               
            carbohydrates = Math.round((totalCalories * 0.6) / 4);    
            break;
        case "surplus":
        case "weightMaintenance":
            protein = Math.round((totalCalories * 0.22) / 4);             
            fats = Math.round((totalCalories * 0.22) / 9);                 
            carbohydrates = Math.round((totalCalories * 0.56) / 4);         
            break;
        default:
            protein = 0;
            fats = 0;
            carbohydrates = 0;
    }

    return {
        protein,
        fats,
        carbohydrates,
    };
}


export function calcImt(weight: number | null, height: number | null): number {
    if (weight !== null && height !== null && height > 0) {
        const heightInMeters = height / 100;
        return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(0));
    }

    return 0;
}


