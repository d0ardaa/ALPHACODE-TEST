<?php
include 'db.php';


$result = $conn->query("SELECT * FROM contacts");

$contacts = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }
}

echo json_encode($contacts);

$conn->close();
?>
