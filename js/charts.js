/**
 * Created by scoogumss on 16/01/2018.
 */
/**
 * Created by scoogumss on 04/01/2018.
 */
var storedScores = [];

$(document).ready(function () {
    console.log("Hey");
    if (localStorage["scoresArray"]) {
        storedScores = JSON.parse(localStorage["scoresArray"]);
    }
    if (storedScores.length == 0) {
        $("#chartText").text("You have not tried the quiz yet, so there are no scores to display.");
    }

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Your Quiz Scores'
        },
        subtitle: {
            text: 'Source: Hey smile :)'
        },
        xAxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Score'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>:)</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Score',
            data: storedScores

        }]
    });
});