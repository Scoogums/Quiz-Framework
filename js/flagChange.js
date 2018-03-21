/**
 * Created by scoogumss on 16/02/2018.
 */
/**
 * Created by scoogumss on 24/01/2018.
 */
var boop = [];

$(document).ready(function () {
    $("#europeButton").click( function() {
        console.log("Selected European Flags");
        $.ajax({
            url: 'process.php',
            type: 'get',
            dataType: 'JSON',
            success: function(response){
                boop = response;
                flagJSON = response;
                console.log("hey" + response);
                var len = response.length;
                localStorage["flagsArray"] = JSON.stringify(flagJSON);
            }
        });
    });
    $("#americaButton").click( function() {
        console.log("Selected American Flags");
        $.ajax({
            url: 'process2.php',
            type: 'get',
            dataType: 'JSON',
            success: function(response){
                boop = response;
                flagJSON = response;
                console.log("hey" + response);
                var len = response.length;
                localStorage["flagsArray"] = JSON.stringify(flagJSON);
            }
        });
    });
});