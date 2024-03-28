$(document).ready(function(){
    // SEARCH BUTTON //
    $('#btnSearch').click(function(){
        const cityName = $('#cityName').val();
       
        $.ajax({
            url: "loadWeather.php",
            type: "post",
            contentType: "application/json",
            dataType: "text",
            data: {
              cityName: cityName
            },
            success: function( data ) {
              $( "#weather" ).html( data );
              //alert(cityName);
              //console.log('Success:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });

    })

  
})
