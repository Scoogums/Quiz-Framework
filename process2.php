<?php

$host = "213.171.200.97"; /* Host name */
$user = "scoogums"; /* User */
$password = "RedDogInHeat1"; /* Password */
$dbname = "serverDB"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
 die("Connection failed: " . mysqli_connect_error());
}

$return_arr = array();

$query="SELECT * FROM america";

$show=mysqli_query($con,$query) or die ("Error");

while($row = mysqli_fetch_array($show)){
    $id = $row['flagPath'];
    $username = $row['flagName'];

    $return_arr[] = array("flagPath" => $id,
                                                  "flagName" => $username);
                              }

                              echo json_encode($return_arr);