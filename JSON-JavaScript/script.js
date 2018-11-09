//DATA From string
var data = '[ { "name": "Aragorn", "race": "Human" }, { "name": "Gimli", "race": "Dwarf" } ]';

data = JSON.parse(data);

console.log(data[1].name);

for(var i = 0; i<data.length; i++) {

    console.log('His name is: ' + data[i].name + ". And his race is: " + data[i].race);

}


//DATA From file
var request = new XMLHttpRequest();

request.open('GET','data.json', true);

request.onload = function () {

    var data = JSON.parse(this.response);

    for(var i = 0; i<data.length; i++) {

        console.log('Name is: ' + data[i].name + ". Race is: " + data[i].race);

    }

};

request.send();

//DATA Fetch
fetch('./data.json').then(response=> {
    return response.json();
}).then(data => {
    console.log(data);
}).catch(err =>{
   console.log('Error');
});

//GET Data from json with jQuery

$(document).ready(function () {
    var data;
    $.ajax({
        dataType: "json",
        url: 'data.json',
        data: data,
        success: function (data) {
            console.log(data[0].name);
        }
    })
});