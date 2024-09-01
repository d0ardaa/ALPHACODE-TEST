<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = intval($_POST['id']);
    $fullName = $_POST['fullName'];
    $birthDate = $_POST['birthDate'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];


    $stmt = $conn->prepare("UPDATE contacts SET fullName = ?, birthDate = ?, email = ?, mobile = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $fullName, $birthDate, $email, $mobile, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Contato atualizado com sucesso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar contato.']);
    }

    $stmt->close();
    $conn->close();
}
?>
