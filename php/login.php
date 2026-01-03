<?php
session_start(); 

$host = "localhost";
$db_user = "root";   
$db_pass = "";   
$db_name = "nama_database_kamu"; 

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if (isset($_POST['login'])) {
    
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT employee_id, employee_name, username, password FROM employees WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password'])) {

            $_SESSION['user_id'] = $row['employee_id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['name'] = $row['employee_name'];
            $_SESSION['is_logged_in'] = true;

            if (isset($_POST['remember-me'])) {
                setcookie('user_login', $row['username'], time() + (86400 * 1), "/"); 
            }

           header("Location: ../html/dashboard.php"); 
            exit();

        } else {
            $_SESSION['error'] = "Wrong password.";
            header("Location: ../html/login.php");
            exit();
        }
    } else {
        $_SESSION['error'] = "Username did not exist.";
        header("Location: ../html/login.php");
        exit();
    }

    $stmt->close();
}
$conn->close();
?>