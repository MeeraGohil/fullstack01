<?php
session_start();
$conn = mysqli_connect("localhost","root","","fullstackdev");

if(isset($_POST['signup']))
{

$name=$_POST['name'];
$panel=$_POST['panel'];
$batch=$_POST['batch'];
$prn=$_POST['prn'];
$roll=$_POST['roll'];
$phone=$_POST['phone'];

$sql="INSERT INTO fsdl1 VALUES('$name','$panel','$batch','$prn','$roll','$phone')";

if(mysqli_query($conn,$sql))
{
$_SESSION['prn']=$prn;
header("Location: welcome.php");
}

}
?>

<!DOCTYPE html>
<html>
<head>

<title>Signup</title>

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
width:300px;
box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

input{
width:100%;
padding:8px;
margin:8px 0;
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

<h2>Sign Up</h2>

<form method="POST">

<input type="text" name="name" placeholder="Name" required>

<input type="text" name="panel" placeholder="Panel" required>

<input type="text" name="batch" placeholder="Batch" required>

<input type="number" name="prn" placeholder="PRN" required>

<input type="number" name="roll" placeholder="Roll No" required>

<input type="number" name="phone" placeholder="Phone" required>

<button name="signup">Sign Up</button>

</form>

</div>

</body>
</html>