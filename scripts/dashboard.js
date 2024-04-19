// Get the object from the local storage
const userData = JSON.parse(localStorage.getItem("newUser")) || [];

//get the main HTML elements
const labelFullName = document.getElementById("labelFullName");
const labelAge = document.getElementById("labelAge");
const labelGender = document.getElementById("labelGender");
const labelFullTodayDate = document.getElementById("labelFullTodayDate");
const labelCalcBMI = document.getElementById("labelCalcBMI");
const labelCalcBMIDesc = document.getElementById("labelCalcBMIDesc");
const mainWorkoutTable = document.getElementById("mainWorkoutTable");
const btnAAddWorkout = document.getElementById("btnAAddWorkout");
const selectNewWorkoutName = document.getElementById("selectNewWorkoutName");
const selectNewWorkoutDuration = document.getElementById("selectNewWorkoutDuration");
const inputtextNewWorkoutDesc = document.getElementById("inputtextNewWorkoutDesc");
const inputFilterWorkout = document.getElementById("inputFilterWorkout");
const labelActHoursPerc = document.getElementById("actHoursPerc");
const labelactHours = document.getElementById("actHours");
const labeltotalActGoal = document.getElementById("totalActGoal");
const svgMainActGoalCircle = document.getElementById("mainActGoalCircle");
const labelcalBurn = document.getElementById("calBurn");
const labelcalBurnPerc = document.getElementById("calBurnPerc");
const labelcalStepsTotal = document.getElementById("calStepsTotal");
const labelcalStepsTotalPerc = document.getElementById("calStepsTotalPerc");
const labelmyCityLabelName = document.getElementById("myCityLabelName");
const labelmyRegionLabelName = document.getElementById("myRegionLabelName");

//Set my goals
const workoutGoalMinutes = 180;
const workoutGoalCalories = 800;
const workoutSteps = 7000;

//Set percentage bar values
document.documentElement.style.setProperty("--percentage", 0);
document.documentElement.style.setProperty("--percentageCalories", 0);
document.documentElement.style.setProperty("--percentageSteps", 0);

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
function Workout(date, workoutID, duration, descr, caloriesPerMin, stepsPerMin) {
    this.date = date;
    this.ID = workoutID;
    this.duration = duration;
    this.description = descr;
    this.caloriesPerminute = caloriesPerMin;
    this.stepsPerMin = stepsPerMin;
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

// Create Workout, insert and load

let myNewWorkouts = [];
let activeHours = 0.0;


btnAAddWorkout.onclick = function () {
    let dataTotable = "";
    let newWorkout = new Workout(
        currentDate,
        selectNewWorkoutName.value,
        selectNewWorkoutDuration.value,
        inputtextNewWorkoutDesc.value,
        caloriesPerMinute(selectNewWorkoutName.value, parseInt(selectNewWorkoutDuration.value)),
        stepsPerMinCalc(selectNewWorkoutName.value, parseInt(selectNewWorkoutDuration.value))
    );
    myNewWorkouts.push(newWorkout);

    //My goals data
    //Active hours
    calActiveHours(workoutGoalMinutes);
    //Active Calories
    calActiveCalories(workoutGoalCalories);
    //Active steps
    calActiveSteps(workoutSteps);

    for (let i = 0; i < myNewWorkouts.length; i++) {
        dataTotable += `<tr>
        <td>`+ myNewWorkouts[i].date + `</th>
        <td>
        `+ myNewWorkouts[i].ID + `
        </td>
        <td>
        `+ myNewWorkouts[i].duration + `
        </td>
        <td>
        `+ myNewWorkouts[i].description + `
        </td>
        <td>
        <button id="buttonDeleteWorkout" onClick="deleteElement(`+ i + `)" class="transparent-button"><i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
    }

    mainWorkoutTable.innerHTML = dataTotable;
}

// Filter workout table
inputFilterWorkout.addEventListener("change", function () {
    let filteredResults = [];
    let filteredDataToTable = "";

    if (inputFilterWorkout.value == "all") {
        filteredResults = myNewWorkouts;
    } else {
        filteredResults = myNewWorkouts.filter((workout) => workout.ID == inputFilterWorkout.value);
    }

    for (let i = 0; i < filteredResults.length; i++) {
        filteredDataToTable += `<tr>
        <td>`+ filteredResults[i].date + `</th>
        <td>
        `+ filteredResults[i].ID + `
        </td>
        <td>
        `+ filteredResults[i].duration + `
        </td>
        <td>
        `+ filteredResults[i].description + `
        </td>
        <td>
        <button id="buttonDeleteWorkout" onClick="deleteElement(`+ i + `)" class="transparent-button"><i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
    }
    mainWorkoutTable.innerHTML = filteredDataToTable;

    console.log(filteredResults);
    console.log("Change filter: " + inputFilterWorkout.value);
});
// delete element from mynewWorkout
function deleteElement(elementId) {
    let dataTotable = "";
    myNewWorkouts.splice(elementId, 1);
    for (let i = 0; i < myNewWorkouts.length; i++) {
        dataTotable += `<tr>
        <td>`+ myNewWorkouts[i].date + `</th>
        <td>
        `+ myNewWorkouts[i].ID + `
        </td>
        <td>
        `+ myNewWorkouts[i].duration + `
        </td>
        <td>
        `+ myNewWorkouts[i].description + `
        </td>
        <td>
        <button id="buttonDeleteWorkout" onClick="deleteElement(`+ i + `)" class="transparent-button"><i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
    }

    mainWorkoutTable.innerHTML = dataTotable;

    //My goals data
    //Active hours
    calActiveHours(workoutGoalMinutes);
    //Active Calories
    calActiveCalories(workoutGoalCalories);
    //Active steps
    calActiveSteps(workoutSteps);

    console.log("element ID: " + elementId);
    console.log(myNewWorkouts);
}

//change and load the active ahours
function calActiveHours(goal) {
    let actHoursPerc = 0.0;
    let actHourinMin = 0.0;
    if (goal > 0) {
        for (let index = 0; index < myNewWorkouts.length; index++) {
            actHourinMin += parseInt(myNewWorkouts[index].duration);
        }
        actHoursPerc = Math.ceil((100 * actHourinMin) / goal);
        labelActHoursPerc.innerHTML = actHoursPerc + "%";
        labelactHours.innerHTML = Number(actHourinMin / 60).toFixed(1);
        labeltotalActGoal.innerHTML = actHoursPerc + "%";
        document.documentElement.style.setProperty("--percentage", actHoursPerc);
    }

}

//calculate calories per minute.
function caloriesPerMinute(workoutNameID, workoutDuration) {
    let totalCalories = 0;

    switch (workoutNameID) {
        case "atletismo":
            totalCalories = 9.2 * workoutDuration;
            break;
        case "hiit":
            totalCalories = 9 * workoutDuration;
            break;
        case "boxeo":
            totalCalories = 11.6 * workoutDuration;
            break;
        case "crossfit":
            totalCalories = 17.7 * workoutDuration;
            break;
        case "natacion":
            totalCalories = 12.4 * workoutDuration;
            break;
        case "pesas":
            totalCalories = 4.7 * workoutDuration;
            break;
        default:
            totalCalories = 0;
            break;
    }

    return totalCalories;
}

//Change and load the active calories
function calActiveCalories(goalCalories) {
    let totalCaloriesDay = 0;
    let totalCaloriesDayPerc = 0;
    for (let j = 0; j < myNewWorkouts.length; j++) {
        totalCaloriesDay += myNewWorkouts[j].caloriesPerminute;
    }
    totalCaloriesDayPerc = Math.ceil((100 * totalCaloriesDay) / goalCalories);
    labelcalBurn.innerHTML = totalCaloriesDay;
    labelcalBurnPerc.innerHTML = totalCaloriesDayPerc + "%";
    document.documentElement.style.setProperty("--percentageCalories", totalCaloriesDayPerc);
}

//Calculate steps per minute
function stepsPerMinCalc(workoutNameID, workoutDuration) {
    let totalSteps = 0;

    switch (workoutNameID) {
        case "atletismo":
            totalSteps = 180 * workoutDuration;
            break;
        case "hiit":
            totalSteps = 70 * workoutDuration;
            break;
        case "boxeo":
            totalSteps = 50 * workoutDuration;
            break;
        case "crossfit":
            totalSteps = 50 * workoutDuration;
            break;
        case "natacion":
            totalSteps = 0 * workoutDuration;
            break;
        case "pesas":
            totalSteps = 110 * workoutDuration;
            break;
        default:
            totalSteps = 0;
            break;
    }

    return totalSteps;
}

//Change and load the active steps
function calActiveSteps(goalSteps) {
    let totalStepsDay = 0;
    let totalstepsDayPerc = 0;
    for (let k = 0; k < myNewWorkouts.length; k++) {
        totalStepsDay += myNewWorkouts[k].stepsPerMin;
    }
    totalstepsDayPerc = Math.ceil((100 * totalStepsDay) / goalSteps);
    labelcalStepsTotal.innerHTML = totalStepsDay;
    labelcalStepsTotalPerc.innerHTML = totalstepsDayPerc + "%";
    document.documentElement.style.setProperty("--percentageSteps", totalstepsDayPerc);
}

//Get the API address
function getIPMainAddressAndLocation() {
    const APIgetIPURL = "https://api.ipify.org/?format=json";
    let myLocalIP = "";
    let myCity = "";
    let myRegion = "";
    let APIgetLocationURL = "";
    fetch(APIgetIPURL)
        .then((responseOK) => {
            return responseOK.json();
        })
        .then((data) => {
            myLocalIP = data.ip;
            console.log(myLocalIP.ip);
        })
        .catch((responseError) => {
            console.log(responseError);
        })
    APIgetLocationURL = `https://ipinfo.io/${myLocalIP}/geo`;
    fetch(APIgetLocationURL)
        .then((responseOKLocation) => {
            return responseOKLocation.json();
        })
        .then((dataLocation) => {
            myCity = dataLocation.city;
            myRegion = dataLocation.region;
            labelmyCityLabelName.innerHTML = myCity;
            labelmyRegionLabelName.innerHTML = myRegion;
            console.log(myCity + " " + myRegion);
        })
        .catch((responseErrorLocation) => {
            console.log(responseErrorLocation);
        })

}

// Call functions
populateLabels();
getIPMainAddressAndLocation();
localStorage.clear();