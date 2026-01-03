<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db   = "erusea";

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
        $_SESSION['error'] = "Password must be at least 8 characters, contain 1 uppercase and 1 number.";
        header("Location: ../html/register.php");
        exit();
    }
    elseif ($password !== $confirm_pass) {
        $_SESSION['error'] = "Password confirmation does not match.";
        header("Location: ../html/register.php");
        exit();
    }
    else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $query = "INSERT INTO employees (employee_name, username, password) VALUES (?, ?, ?)";
        
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("sss", $employee_name, $username, $hashed_password);

            try {
                if ($stmt->execute()) {
                    header("Location: ../html/login.php");
                    exit();
                } else {
                    throw new Exception($stmt->error);
                }
            } catch (mysqli_sql_exception $e) {
                if ($e->getCode() == 1062) {
                    $_SESSION['error'] = "Username already exists.";
                } else {
                    $_SESSION['error'] = "Database error: " . $e->getMessage();
                }
                header("Location: ../html/register.php");
                exit();
            } catch (Exception $e) {
                $_SESSION['error'] = "An error occurred: " . $e->getMessage();
                header("Location: ../html/register.php");
                exit();
            }

            $stmt->close();
        } else {
            $_SESSION['error'] = "Database preparation error.";
            header("Location: ../html/register.php");
            exit();
        }
    }
}

$conn->close();
?>