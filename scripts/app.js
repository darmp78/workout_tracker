// get data from the user
function getData(){
    document.getElementById("btnNavDashboard").addEventListener('click', function(){
        const newUser = [];

        let userFName = document.getElementById("inputtextName").value;
        let userLName = document.getElementById("inputtextLName").value;
        let userAge = document.getElementById("inputtextAge").value;
        let userGender = document.getElementById("inputGender").value;
        let userHeight = document.getElementById("inputHeight").value;
        let userWeight = document.getElementById("inputWeight").value;

        newUser.push({"fName":userFName,
                    "lName": userLName,
                    "age":userAge,
                    "gender":userGender,
                    "height":userHeight,
                    "weight":userWeight
                        });

        localStorage.setItem("newUser",JSON.stringify(newUser));
        console.log(newUser);
    })
}

getData();

