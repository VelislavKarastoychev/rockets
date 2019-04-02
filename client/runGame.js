"use strict";
euriklis.html.ready(game)
function game() {
    // create a canvas object:
    let container = new euriklis.html("body")
    .select("#container")
    .css({
        "width" : "100%",
        "height" : "100%",
        "background-color" : "royalblue",
        "margin" : "0 auto",
        "padding": "0"
    }) 
    let canvas = new euriklis.html('body')
        .select('#container')
        .append('canvas')
        .css({
            "display" : "block",
            "margin" : "0 auto"
        })
        .attr({
            "width": "1200px",
            "height": "700px",
            "id": "canvas"
        })
    let ctx = document.getElementById("canvas").getContext('2d')
    let status = 0, url = '/requestInfo'
    function requestInfo(url, status) {
        let http = new euriklis.html.http()
        return http.makeRequest("GET", url.concat(`?status=${status}`))
    }
    requestInfo(url, status)
    .then(response => {
        eval(response.response)
    }, error => {
        console.log(error)
    })
}
