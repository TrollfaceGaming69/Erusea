<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db   = "kasir";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if (isset($_POST['register'])) {
    $employee_name = trim($_POST['employee_name']);
    $username      = trim($_POST['username']);
    $password      = $_POST['password'];
    $confirm_pass  = $_POST['confirm_password'];

    if (empty($employee_name) || empty($username) || empty($password) || empty($confirm_pass)) {
        $_SESSION['error'] = "All fields are required.";
        header("Location: ../html/register.php");
        exit();
    }
    elseif (!preg_match("/^[a-zA-Z\s]+$/", $employee_name)) {
        $_SESSION['error'] = "Name cannot contain numbers or special characters.";
        header("Location: ../html/register.php");
        exit();
    }
    elseif (strlen($password) < 8 || !preg_match("/[A-Z]/", $password) || !preg_match("/[0-9]/", $password)) {
        $_SESSION['error'] = "Wrong password format.";
        header("Location: ../html/register.php");
        exit();
    }
    elseif ($password !== $confirm_pass) {
       $_SESSION['error'] = "Password do not match.";
        header("Location: ../html/register.php");
        exit();
    }
    else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO employees (employee_name, username, password) VALUES (?, ?, ?)";
        
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("sss", $employee_name, $username, $hashed_password);

            if ($stmt->execute()) {
                header("Location: ../html/login.php");
                exit();
            } else {
                if ($conn->errno == 1062) {
                    echo "<script>alert('Error: Username sudah terdaftar, gunakan username lain.');</script>";
                } else {
                    echo "<script>alert('Database Error: " . $stmt->error . "');</script>";
                }
            }
            $stmt->close();
        }
    }
}
$conn->close();
?>