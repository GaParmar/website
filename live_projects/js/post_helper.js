var dest_route = "/i_nlp"
var dest_url = "http://localhost:5000/i_nlp"

function send_post_json(data, callback){
    $.ajax({
        type: "POST",
        url: dest_url,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data),
        crossDomain: true,
        success: callback
    })
    
}