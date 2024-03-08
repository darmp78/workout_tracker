// Get the object from the local storage
const userData = JSON.parse(localStorage.getItem("newUser"));

// Get the system date
const currentDate = new Date().toDateString();

// Create the object user
function User(fName, lName, age, gender, height, weight) {
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;

    this.getGenderDesc = function () {
        if (this.gender == "F") {
            return "Femenino";
        } else {
            return "Masculino";
        }
    }

    this.getFullName = function () {
        return capitalizeFirstLetter(this.fName) + " " + capitalizeFirstLetter(this.lName);
    }

}

// Create user 
const mainUser = new User(userData[0].fName,
    userData[0].lName,
    userData[0].age,
    userData[0].gender,
    userData[0].height,
    userData[0].weight);



// Set values in labels 
function populateLabels() {
    document.getElementById("labelFullName").innerHTML = mainUser.getFullName();
    document.getElementById("labelAge").innerHTML = mainUser.age;
    document.getElementById("labelGender").innerHTML = mainUser.getGenderDesc();
    document.getElementById("labelFullTodayDate").innerHTML = currentDate;
    document.getElementById("labelCalcBMI").innerHTML = calcBMI(mainUser.height, mainUser.weight);
    document.getElementById("labelCalcBMIDesc").innerHTML = getBMIdesc(calcBMI(mainUser.height, mainUser.weight));
}

// capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Calculate BMI
function calcBMI(height, weight) {
    let BMI = 0.0;
    if (height > 0 && weight > 0) {
        BMI = parseFloat(weight / Math.pow((height / 100), 2), 1).toFixed(1);
    } else {
        BMI = 0;
    }
    return BMI;
}
function getBMIdesc(BMI) {
    let BMIDesc = "";
    switch (true) {
        case (BMI < 18.4):
            BMIDesc = "Bajo de peso";
            break;
        case (BMI >= 18.5 && BMI <= 25):
            BMIDesc = "Peso Normal";
            break;
        case (BMI > 25):
            BMIDesc = "Sobre peso";
            break;
        default:
            BMIDesc = "-"
    }
    return BMIDesc;
}

// Call functions
populateLabels();
console.log(mainUser.getFullName());
console.log(mainUser.getGenderDesc());
console.log(calcBMI(parseInt(mainUser.height), parseInt(mainUser.weight)));
console.log(getBMIdesc( calcBMI(parseInt(mainUser.height), parseInt(mainUser.weight))));
localStorage.clear();