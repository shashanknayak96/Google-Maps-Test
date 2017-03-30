<?php 
  $host = "localhost";
  $user = "root";
  $pass = "";

  $databaseName = "portal";
  $tableName = "mechsignup";
  $shopno = $_POST['id'];
  $con = mysqli_connect($host,$user,$pass,$databaseName);
  $result = mysqli_query($con, "SELECT * FROM $tableName WHERE id = $shopno"); 

while($row = mysqli_fetch_row($result)){
$table_data[]= array($row);
}
echo json_encode($table_data);
  
?>