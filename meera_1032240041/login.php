<?php
session_start();
$conn=mysqli_connect("localhost","root","","fullstackdev");

if(isset($_POST['login']))
{

$prn=$_POST['prn'];

$sql="SELECT * FROM fsdl1 WHERE prn='$prn'";
$result=mysqli_query($conn,$sql);

if(mysqli_num_rows($result)>0)
{
$_SESSION['prn']=$prn;
header("Location: welcome.php");
}
else
{
echo "<center>Invalid PRN</center>";
}

}
?>

<!DOCTYPE html>
<html>
<head>

<title>Login</title>

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

.form{
background:white;
padding:30px;
border-radius:10px;
width:280px;
box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

input{
width:100%;
padding:8px;
margin:10px 0;
}

button{
width:100%;
padding:10px;
background:#2575fc;
color:white;
border:none;
}

</style>

</head>

<body>

<div class="form">

<h2>Login</h2>

<form method="POST">

<input type="number" name="prn" placeholder="Enter PRN" required>

<button name="login">Login</button>

</form>

</div>

</body>
</html>