<?php 
  $host = "localhost";
  $user = "root";
  $pass = "";

  $databaseName = "portal";
  $tableName = "shopnames";

  $divValues = $_POST['table'];
  $dist = $_POST['distance'];
  $currentTime = $_POST['currentTime'];
  $openTime = $_POST['openTime'];
  $closeTime = $_POST['closeTime'];
  $properdist = number_format($dist, 2);

if($openTime <= $currentTime && $currentTime >= $closeTime){

  echo "<div class=\"nearDis #4db6ac-text teal-text text-lighten-2 center-align\" id=".$divValues[0].">";
  echo "".$divValues[1]."";
  echo "<div class=\"badge\">B</div>"; 
  echo "<div class=\"dist\">".$properdist."km</div>";
  echo "<div class=\"stars\">Rating:4.3</div>"; 
  echo "</div>";

}else{

  echo "<div class=\"near #4db6ac-text teal-text text-lighten-2 center-align\" id=".$divValues[0].">";
  echo "".$divValues[1]."";
  echo "<div class=\"badge\">B</div>"; 
  echo "<div class=\"dist\">".$properdist."km</div>";
  echo "<div class=\"stars\">Rating:4.3</div>"; 
  echo "</div>";
}
?>
