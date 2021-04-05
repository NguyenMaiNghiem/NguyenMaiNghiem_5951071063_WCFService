
$(document).ready(function () {


    var API_KEY = "AIzaSyBDN6GEoGZYsp74HLaGPTEq1U0kzC599dY"
    var video = ``


    $("#suggestion_form").submit(function (event) {
        event.preventDefault()
        var search = $("#search").val() + "Hướng dẫn guitar (Tutorial)"
        videoSearch(API_KEY, search, 6)

    })
    function videoSearch(key, search, maxResults) {


        if (search == "Hướng dẫn guitar (Tutorial)") {
            alert("Please type song's name!")
        }
        else {
            $("#videos").empty()
            $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
                console.log(data)


                data.items.forEach(item => {
                    video = `
                    <iframe width="33%" height="400"src=" http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `

                    $("#videos").append(video)

                });
            })
        }
    }
    jQuery(function() {
        jQuery( "#search" ).autocomplete({
          source: function( request, response ) {
              //console.log(request.term);
            var sqValue = [];
            jQuery.ajax({
                type: "POST",
                url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                dataType: 'jsonp',
                data: jQuery.extend({
                    q: request.term
                }, {  }),
                success: function(data){
                    console.log(data[1]);
                       obj = data[1];
                    jQuery.each( obj, function( key, value ) {
                        sqValue.push(value[0]);
                    });
                       response( sqValue);
                }
            });
          }
        });
      });

    
})

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}


// readText
