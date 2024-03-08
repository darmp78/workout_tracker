


document.getElementById("btnNavDashboard").addEventListener('click', function(){
    let userName = "";
    userName = document.getElementById("inputtextName").value;
    localStorage.setItem('objectToPass',userName);
})
