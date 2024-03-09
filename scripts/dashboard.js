// Get the object from the local storage
const userData = JSON.parse(localStorage.getItem("newUser"));

//get the main HTML elements
const labelFullName = document.getElementById("labelFullName");
const labelAge = document.getElementById("labelAge");
const labelGender = document.getElementById("labelGender");
const labelFullTodayDate = document.getElementById("labelFullTodayDate");
const labelCalcBMI = document.getElementById("labelCalcBMI");
const labelCalcBMIDesc = document.getElementById("labelCalcBMIDesc");
const mainWorkoutTable = document.getElementById("mainWorkoutTable");
const btnAAddWorkout = document.getElementById("btnAAddWorkout");

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

// Create object workout
function Workout(date, workoutID, duration, descr) {
    this.date = date;
    this.ID = workoutID;
    this.duration = duration;
    this.description = descr;

}

// Create user 
const mainUser = new User(userData[0].fName,
    userData[0].lName,
    userData[0].age,
    userData[0].gender,
    userData[0].height,
    userData[0].weight);

// Create Workout

let myNewWorkouts = [];


btnAAddWorkout.onclick = function () {
    let dataTotable ="";
    let newWorkout = new Workout(
        currentDate,
        "hiit",
        5,
        "Alto rendimiento"
    );
    myNewWorkouts.push(newWorkout);

    for (let i = 0; i < myNewWorkouts.length; i++) {
        dataTotable +="<tr><td>"+myNewWorkouts[i].date+"</th><td>Running</td><td>5</td><td>Ejercicio de alto redimiento.</td></tr>";
    }

    mainWorkoutTable.innerHTML = dataTotable;
    console.log(myNewWorkouts);
}

// Set values in labels 
function populateLabels() {
    labelFullName.innerHTML = mainUser.getFullName();
    labelAge.innerHTML = mainUser.age;
    labelGender.innerHTML = mainUser.getGenderDesc();
    labelFullTodayDate.innerHTML = currentDate;
    labelCalcBMI.innerHTML = calcBMI(mainUser.height, mainUser.weight);
    labelCalcBMIDesc.innerHTML = getBMIdesc(calcBMI(mainUser.height, mainUser.weight));
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
localStorage.clear();