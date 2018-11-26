
<?php
error_reporting(-1);
ini_set('display_errors', '');
include('connect.php');
  header('Content-Type: text/html; charset=utf-8');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$data = array();
$dataReturn = array();
foreach($request as $key=>$sql){ 
$query = mysql_query($sql);
  if ($query) {
    if (mysql_num_rows($query)) {
    // while ($row = mysql_fetch_array($query)) {
    //   $id=$row['id']; 
    //   $name=$row['name'];
    //   $test=$row['test']; 
    //   $data[] = array('id'=> $id, 'name'=> $name, 'test'=> $test);
    //   } 
    while ($row = mysql_fetch_assoc($query)) {
      $field = array();
      foreach ($row as $key => $value) {
        $field[$key] = $value;
      }
      $data[] = $field;
    }
      $dataReturn[] = array(
        'status' => '200',
        'resultDesceiption' => 'select data successfully.',
        'data' => $data ? $data : '',
        'sql' => $sql
      );
    }else{
      $dataReturn[] = array(
        'status' => '200',
        'resultDesceiption' => 'successfully.',
        'data' => '',
        'sql' => $sql
      );
    }
  } else {
    $dataReturn[] = array(
          'status' => '500',
          'resultDesceiption' => 'select failed',
          'sql' => $sql
        );
  }
  $data = array();
}
echo json_encode($dataReturn);
mysql_close($dbhandle);
?>