<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/register.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Erusea</title>
</head>

<body>
    <div class="container">
        <div class="left-section">
            <h1>Join with us in <span>Erusea</span></h1>
            <p>The workbench for all cashier to do any sort of transaction in any type of business and monitor your work
                all in just this one simple website</p>
        </div>

        <div class="right-section">
            <div class="register-card">
                <h2>Register</h2>

                <?php if (isset($_SESSION['error'])): ?>
                    <div class="alert-error">
                        <span><?= $_SESSION['error']; ?></span>
                    </div>
                <?php unset($_SESSION['error']);
                endif; ?>

                <form>
                    <form action="../php/register.php" method="POST">

                        <div class="form-group">
                            <label><i class="fa-regular fa-user"></i> Name<span class="required">*</span></label>
                            <input type="text" name="employee_name" placeholder="enter name" required>
                            <span class="help-text">Name must be consisted of characters only</span>
                        </div>

                        <div class="form-group">
                            <label><i class="fa-regular fa-user"></i> Username<span class="required">*</span></label>
                            <input type="text" name="username" placeholder="enter username" required>
                        </div>

                        <div class="form-group">
                            <label><i class="fa-solid fa-lock"></i> Password<span class="required">*</span></label>
                            <input type="password" name="password" placeholder="enter password" required>
                            <span class="help-text">Password must be 8 characters long and must contain a number and an Uppercase letter</span>
                        </div>

                        <div class="form-group">
                            <label><i class="fa-solid fa-lock"></i> Confirm Password<span
                                    class="required">*</span></label>
                            <input type="password" name="confirm_password" placeholder="enter password" required>
                        </div>

                        <div class="info-box">
                            <i class="fa-solid fa-user-gear"></i>
                            New account will be registered as Admin
                        </div>

                        <button type="submit" name="register" class="btn-register">Register Account</button>

                    </form>

                    <div class="login-link">
                        Already have an account? <a href="login.php">Sign in here</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>