/**
 * Created by scoogumss on 24/01/2018.
 */
$(document).ready(function () {
    // Check if quiz data has already been loaded.
    if (localStorage["flagsArray"]) {
        console.log("Flag data already loaded.");
    } else {
        // If not, load quiz data.
        $.ajax({
            url: 'process.php',
            type: 'get',
            dataType: 'JSON',
            success: function(response){
                flagJSON = response;
                // Store the quiz data in local storage.
                localStorage["flagsArray"] = JSON.stringify(flagJSON);
            }
        });
    }
});