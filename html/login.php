<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Erusea</title>
</head>

<body>
    <div class="container">
        <div class="left-section">
            <h1>Welcome to <span>Erusea</span></h1>
            <p>The workbench for all cashier to do any sort of transaction in any type of business and monitor your work
                all in just this one simple website</p>
        </div>

        <div class="right-section">
            <div class="login-card">
                <h2>Login</h2>

                <?php if (isset($_SESSION['error'])): ?>
                    <div class="alert-error">
                        <span><?= $_SESSION['error']; ?></span>
                    </div>
                <?php unset($_SESSION['error']);
                endif; ?>

                <form action="../php/login.php" method="POST">

                    <div class="form-group">
                        <label><i class="fa-regular fa-user"></i> Username<span class="required">*</span></label>
                        <input type="text" name="username" placeholder="enter username" required>
                    </div>

                    <div class="form-group">
                        <label><i class="fa-solid fa-lock"></i> Password<span class="required">*</span></label>
                        <input type="password" name="password" placeholder="enter password" required>
                    </div>

                    <div class="remember-me-btn">
                        <label for="remember-me">Remember me</label>
                        <input type="checkbox" id="remember-me" name="remember-me">
                    </div>

                    <button type="submit" name="login" class="btn-login">Login</button>

                    <div class="register-link">
                        Didn't have account? <a href="register.php">Register here</a>
                    </div>

                </form>
            </div>
        </div>
    </div>
</body>

</html>