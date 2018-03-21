/**
 * Created by scoogumss on 16/01/2018.
 */

$(document).ready(function () {
    flagJSON = JSON.parse(localStorage["flagsArray"]);
    for(var i=0; i<flagJSON.length; i++){
        console.log("hey");
        $('#albumStuff').append("<div class=" + "card" +"><img src=" + flagJSON[i].flagPath + ".png +  alt=" + "Card image cap" + "><p class=" + "card-text" + "> " + flagJSON[i].flagName + "</p></div>");
    }
});