<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "fullstackdev";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM fsdl1";
$result = mysqli_query($conn, $sql);

echo "<h2>Student Data</h2>";

echo "<table border='1' cellpadding='10'>";
echo "<tr>
        <th>Name</th>
        <th>Panel</th>
        <th>Batch</th>
        <th>PRN</th>
        <th>Roll No</th>
        <th>Phone No</th>
      </tr>";

while($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$row['name']."</td>";
    echo "<td>".$row['panel']."</td>";
    echo "<td>".$row['batch']."</td>";
    echo "<td>".$row['prn']."</td>";
    echo "<td>".$row['roll_no']."</td>";
    echo "<td>".$row['phone_no']."</td>";
    echo "</tr>";
}

echo "</table>";

mysqli_close($conn);
?>