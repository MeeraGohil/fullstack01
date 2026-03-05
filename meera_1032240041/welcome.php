<?php
session_start();

$conn=mysqli_connect("localhost","root","","fullstackdev");

if(!isset($_SESSION['prn']))
{
header("Location: login.php");
exit();
}

$prn=$_SESSION['prn'];

$sql="SELECT * FROM fsdl1 WHERE prn='$prn'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

$name=$row['name'] ?? '';
$panel=$row['panel'] ?? '';
$batch=$row['batch'] ?? '';
?>

<!DOCTYPE html>
<html>
<head>

<title>Welcome</title>

<style>

body{
margin:0;
font-family:Arial;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#7ed0c4,#6bb8c7);
}

.card{
background:white;
padding:40px;
border-radius:12px;
text-align:center;
box-shadow:0 10px 25px rgba(0,0,0,0.2);
width:320px;
}

a{
text-decoration:none;
color:#2575fc;
}

</style>

</head>

<body>

<div class="card">

<h1>WELCOMEEE</h1>

<p>Meera Gohil <b><?php echo $name; ?></b></p>

<p>PRN <b><?php echo $prn; ?></b></p>

<p><?php echo $panel; ?>_<?php echo $batch; ?></p>

<a href="index.html">Logout</a>

</div>

</body>
</html>