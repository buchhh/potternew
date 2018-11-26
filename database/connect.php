<?php
$str = file_get_contents('../config/config.json');
$json = json_decode($str, true);

$H = $json['database']['hostname'].':'.$json['database']['post'];
$U = $json['database']['username'];
$P = $json['database']['password'];
$D = $json['database']['database'];

$dbhandle = mysql_connect($H, $U, $P) or die("Unable to connect to MySQL");
mysql_set_charset('utf8', $dbhandle);
$selected = mysql_select_db($D,$dbhandle) or die("Could not select examples");
// mysql_close($dbhandle);


?>

