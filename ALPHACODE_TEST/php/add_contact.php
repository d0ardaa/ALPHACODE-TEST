<?php
include 'db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   
    $fullName = $_POST['fullName'];
    $birthDate = $_POST['birthDate'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    
    if (empty($fullName) || empty($email) || empty($mobile)) {
        echo json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        exit;
    }

    
    $stmt = $conn->prepare("INSERT INTO contacts (fullName, birthDate, email, mobile) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullName, $birthDate, $email, $mobile);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Contato adicionado com sucesso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar contato.']);
    }

    $stmt->close();
    $conn->close();
}
?>
