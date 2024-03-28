$(document).ready(function(){

    // SETUP LOCAL STORAGE //
    const SearchesCity = [];
    const SearchHistory = localStorage.getItem('SearchCityNames');
    
    if(!SearchHistory){
        localStorage.setItem('SearchCityNames', JSON.stringify(SearchesCity));
    }

    // LOAD SEARCH HISTORY //
    const Arrs = JSON.parse(SearchHistory) || [];
    if(Arrs.length == 0){
        $( '#noSearchSpan' ).removeClass('d-none').addClass('d-flex');
        $( '#history' ).removeClass('w-100');
    }   
    
    Arrs.forEach(function(cities, index){
        $('#history').append('<li class="list-group-item list-group-item-action d-flex align-items-center text-muted historyTxt"><div class="">'+cities+'</div><button class="btn btn-sm rounded-circle ms-auto btnRemoveItem"><i class="fa fa-close"></i></button></li>');
    });

    // SEARCH BUTTON //
        $('#btnSearch').click(function(){
            const cityName = $('#cityName').val();
        
            if(cityName){
                $( '#noSearchSpan' ).removeClass('d-flex').addClass('d-none');
                $( '#imgCon' ).removeClass('d-flex').addClass('d-none');
                $( '#history' ).addClass('w-100');
                $( '#loader' ).removeClass('d-none').addClass('d-flex');
                $( '#cityNameValidation' ).addClass( 'd-none' );
                $( '#cityName' ).removeClass( 'is-invalid' );
                $.ajax({
                    url: "loadWeather.php",
                    type: "post",   
                    data: {
                    'cityName': cityName
                    },
                    success: function( data ) {
                    $( "#weather" ).fadeIn( 500 );
                    $( "#weather" ).html( data );
        
                    $( '#loader' ).removeClass( 'd-flex' ).addClass( 'd-none' );
                    //console.log('Success:', data);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
        
                saveSearchCity(cityName);
            }else{
                $( '#cityName' ).addClass( 'is-invalid' );
                $( '#cityNameValidation' ).addClass( 'd-block' );
                $('#cityName').focus();
                return false;
            }
            
        })

    // RETRIEVE FROM SEARCH HISTORY //
    $(document).on('click', '.historyTxt', function(){
        const citySearchName = $(this).text();
        $( '#cityName' ).val(citySearchName);
        $( '#cityName' ).focus();
    })

    // REMOVE ITEM HISTORY //   
    $(document).on('click', '.btnRemoveItem', function(event){
        event.stopPropagation();
        $(this).closest('li').remove();
        const itemToRemove = $(this).closest('li').find('.historyTxt').text();
        const searchesArr = JSON.parse(localStorage.getItem('SearchCityNames')) || [];
        let index = searchesArr.indexOf(itemToRemove);
        if (index > -1) {
            searchesArr.splice(index, 1);
        }

        if(searchesArr.length == 0){
            $( '#noSearchSpan' ).removeClass('d-none').addClass('d-flex'); 
            $( '#history' ).removeClass('w-100');
        }

        localStorage.setItem('SearchCityNames', JSON.stringify(searchesArr));
    })

    // CLEAR HISTORY BUTTON //
    $('#btnClearHistory').click(function(){
        $( '#history' ).empty();
        const emptyArray = [];
        localStorage.setItem('SearchCityNames', JSON.stringify(emptyArray));
        $( '#noSearchSpan' ).removeClass('d-none').addClass('d-flex');
        $( '#history' ).removeClass('w-100');
    })

    

}); 

    // x in input search //
    document.getElementById("cityName").addEventListener("search", function(event) {
        const noSearchCityDiv = ' <div class="w-100 h-100 d-flex flex-column gap-2 align-items-center justify-content-center p-5 mx-auto my-auto" id="imgCon"><img src="plugins/Images/404.png" width="250" height="210" alt=""><span class="text-muted poppins-regular fs-5">Search for a City</span></div>';
        $("#weather").html(noSearchCityDiv);  
      
    });

    function saveSearchCity(city){
        const searches = JSON.parse(localStorage.getItem('SearchCityNames')) || [];
        searches.push(city);
        $( '#history' ).append('<li class="list-group-item list-group-item-action d-flex align-items-center text-muted"><div class="historyTxt">'+city+'</div><button class="btn btn-sm rounded-circle ms-auto btnRemoveItem"><i class="fa fa-close"></i> </button></li>');
        localStorage.setItem('SearchCityNames', JSON.stringify(searches));
    }


