<?php 
  $host = "localhost";
  $user = "root";
  $pass = "";

  $databaseName = "portal";
  $tableName = "mechsignup";
$tyre = $_POST['tyre'];
  $con = mysqli_connect($host,$user,$pass,$databaseName);
  if($tyre == "all"){
  $result = mysqli_query($con, "SELECT * FROM $tableName"); 
  }else{
  $result = mysqli_query($con, "SELECT * FROM $tableName WHERE vehicletype like '%$tyre%'"); 
  }

while($row = mysqli_fetch_row($result)){
$table_data[]= array($row);
}
echo json_encode($table_data);
?>