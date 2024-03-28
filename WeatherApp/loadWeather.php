<?php
$apiKey = '8a627f963e4aab5f0b0ca4b1ebfa5568';
$cityName = @$_POST["cityName"];

$context = stream_context_create();
$apiConnect = @file_get_contents('https://api.openweathermap.org/data/2.5/weather?q='.$cityName.'&appid='.$apiKey.'&units=metric',false, $context);
$json = json_decode($apiConnect,true);

if ( $apiConnect === FALSE ) {
  // API call failed
  $error = true;
} else {
  $json = json_decode( $apiConnect,true );

  if ( $json === NULL ) {
      // Error decoding JSON
      $error = true;
  } else {
      // API call successful, extract weather data
      $temperature = $json['main']['temp'];
      $weather = $json['weather'][0]['main'];
      $weather_description = $json['weather'][0]['description'];
      $humidity = $json['main']['humidity'];
      $wind = $json['wind']['speed'];
      $error = false;
  }
}

if ( $error ) {

  echo '<div id="errorDiv" class="w-100 h-100 d-flex flex-column gap-0 align-items-center justify-content-center mx-auto my-auto">';
  echo '    <img src="plugins/Images/not-found.png" alt="Error" width="320" height="300">';
  echo '</div>';

}else{

  echo '<div class="d-flex flex-column gap-4">
          <div class="d-flex flex-row flex-md-row flex-sm-column align-items-center bg-primary bg-gradient rounded p-4 shadow">
            <div class="d-flex flex-column gap-0">
              <h1 class="fw-bold mb-0 text-light poppins-medium" id="">'.$cityName.'</h1>
               <span class="text-light poppins-thin" id="current-datetime">'.date('D F j').'</span>
            </div>

            <div class="weather-condition ms-auto ms-md-auto ms-sm-0">
              <div class="d-flex flex-row gap-2 align-items-center">
              <img src="plugins/Images/'.$weather.'.png" width="60" height="50" alt="">
              <div class="d-flex flex-column align-items-center">
              <h1 class="text-warning mb-0 poppins-light" id="current-temp">'.round($temperature).'&deg;c</h1>
              <span class="text-light poppins-regular">'.$weather_description.'</span>
              </div>
              </div>
            </div>
          </div>

          <div class="d-flex flex-row flex-md-row flex-sm-column gap-2 text-dark w-100 align-items-center">
                <div class="d-flex flex-row align-items-center justify-content-center bg-light rounded shadow p-2 w-100 border-top border-primary border-2">
                  <div class="p-2">
                  <i class="fs-3 fa fa-smog"></i>
                  </div>
                 
                  <div class="d-flex flex-column w-100 align-items-center">
                  <span class="fs-4 fw-bold poppins-regular">'.$humidity.'%</span>
                  <span class="fw-bold poppins-light">Humidity</span>
                  </div>      
               </div>
  
              <div class="d-flex flex-row align-items-center justify-content-center bg-light rounded shadow p-2 w-100 border-top border-primary border-2">
                  <div class="p-2">
                  <i class="fs-3 fa fa-wind"></i>
                  </div>
                  <div class="d-flex flex-column w-100 align-items-center">
                  <span class="fs-4 fw-bold poppins-regular">'.$wind.'Km/h</span>
                  <span class="fw-bold poppins-light">Wind Speed</span>
                  </div>
              </div>
        </div>
</div>';
}
?>