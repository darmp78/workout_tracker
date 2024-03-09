// main HTML objects
const navButton = document.getElementById("btnNavDashboard");
const inputTextFName = document.getElementById("inputtextName");
const inputTextLName = document.getElementById("inputtextLName");
const inputTextAge = document.getElementById("inputtextAge");
const inputTextGender = document.getElementById("inputGender");
const inputTextHeight = document.getElementById("inputHeight");
const inputTextWeight = document.getElementById("inputWeight");
const allInputtext = document.querySelectorAll("input");

// get data from the user
function getData() {
    navButton.addEventListener('click', function () {
        const newUser = [];

        let userFName = inputTextFName.value;
        let userLName = inputTextLName.value;
        let userAge = inputTextAge.value;
        let userGender = inputTextGender.value;
        let userHeight = inputTextHeight.value;
        let userWeight = inputTextWeight.value;

        newUser.push({
            "fName": userFName,
            "lName": userLName,
            "age": userAge,
            "gender": userGender,
            "height": userHeight,
            "weight": userWeight
        });

        localStorage.setItem("newUser", JSON.stringify(newUser));

    })
}

//Enable nav option
allInputtext.forEach(function (inputText) {
    inputText.addEventListener("input", function () {
        if (inputTextFName.value.length > 2
            && inputTextLName.value.length > 2
            && inputTextAge.value.length > 0
            && inputTextHeight.value.length > 2
            && inputTextWeight.value.length > 1) {
            navButton.disabled = false;
        } else {
            navButton.disabled = true;
        }
    })
})


// Navigate functions
navButton.onclick = function () {
    location.href = "./pages/dashboard.html";
}

// getting data from user
navButton.disabled = true;
getData();

