import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  rememberMe: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialType = searchParams.get("type") === "user" ? "user" : "admin";
  const [userType, setUserType] = useState<"admin" | "user">(initialType);
  const [mode, setMode] = useState<"login" | "register">("register");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = userType === "admin" ? 2 : 3;

  const getProgressWidth = () => {
    if (step === 1) return "0%";
    if (step === 2) return userType === "admin" ? "50%" : "33%";
    return "66%";
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field on change
    if (field in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
        newErrors.name = "Name must consist of characters only";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else {
        const hasMinLength = formData.password.length >= 8;
        const hasNumber = /\d/.test(formData.password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
          formData.password
        );

        if (!hasMinLength || !hasNumber || !hasSpecialChar) {
          newErrors.password =
            "Password must be 8 characters long and must contain a number and a special character";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 3) {
      if (!formData.verificationCode.trim()) {
        newErrors.verificationCode = "Verification code is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (mode === "login") {
      if (!validateLoginForm()) return;
      navigate("/dashboard");
    } else {
      if (!validateRegisterStep()) return;
      if (step < totalSteps) {
        setStep(step + 1);
        setErrors({});
      } else {
        navigate("/dashboard");
      }
    }
  };

  const getButtonLabel = () => {
    if (mode === "login") return "Login";
    if (step < totalSteps) return "Next";
    return "Register";
  };

  const inputClass = (field: keyof FormErrors) =>
    `rounded-xl border h-12.5 px-4 ${
      errors[field] ? "border-warning" : "border-stroke"
    }`;

  return (
    <div className="bg-bg h-screen flex items-center justify-center">
      <div className="w-[550px] px-8 py-5 bg-containerbg rounded-2xl">
        <div className="flex flex-col justify-center gap-10.5">
          <h1 className="text-[32px] font-bold text-center">
            {mode === "login" ? "Login" : "Register"}
          </h1>

          {/* Progress Bar - only in register mode */}
          {mode === "register" && (
            <div className="w-full bg-stroke rounded-full h-1">
              <div
                className="bg-primarygreen h-1 rounded-full transition-all duration-300"
                style={{ width: getProgressWidth() }}
              />
            </div>
          )}

          <div className="flex flex-col gap-5.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className=""
            >
              {mode === "login" ? (
                /* ===== LOGIN FORM (same for admin & user) ===== */
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="login-name">
                      Name<span className="text-warning">*</span>
                    </label>
                    <input
                      id="login-name"
                      type="text"
                      placeholder="your name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="text-[14px] text-warning">{errors.name}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-5">
                    <label htmlFor="login-password">
                      Password<span className="text-warning">*</span>
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="your password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={inputClass("password")}
                    />
                    {errors.password && (
                      <p className="text-[14px] text-warning">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        handleChange("rememberMe", e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor="remember-me" className="text-[16px]">
                      Remember me
                    </label>
                  </div>
                </>
              ) : step === 1 ? (
                /* ===== REGISTER STEP 1: Name & Email (admin & user) ===== */
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-name">
                      Name<span className="text-warning">*</span>
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="your name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClass("name")}
                    />
                    {errors.name ? (
                      <p className="text-[14px] text-warning">{errors.name}</p>
                    ) : (
                      <p className="text-[14px]">
                        name must consist of characters only
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-5">
                    <label htmlFor="reg-email">
                      Email<span className="text-warning">*</span>
                    </label>
                    <input
                      id="reg-email"
                      type="text"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-[14px] text-warning">{errors.email}</p>
                    )}
                  </div>
                </>
              ) : step === 2 ? (
                /* ===== REGISTER STEP 2: Password (admin & user) ===== */
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-password">
                      Password<span className="text-warning">*</span>
                    </label>
                    <input
                      id="reg-password"
                      type="password"
                      placeholder="your password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={inputClass("password")}
                    />
                    {errors.password ? (
                      <p className="text-[14px] text-warning">
                        {errors.password}
                      </p>
                    ) : (
                      <p className="text-[14px]">
                        Password must be 8 characters long and must contain a
                        number and a special character
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-5">
                    <label htmlFor="reg-confirm-password">
                      Confirm Password<span className="text-warning">*</span>
                    </label>
                    <input
                      id="reg-confirm-password"
                      type="password"
                      placeholder="confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className={inputClass("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-[14px] text-warning">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* ===== REGISTER STEP 3: Store Verification Code (user only) ===== */
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-verification">
                      Store Verification Code
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="reg-verification"
                      type="text"
                      placeholder="enter verification code"
                      value={formData.verificationCode}
                      onChange={(e) =>
                        handleChange("verificationCode", e.target.value)
                      }
                      className={inputClass("verificationCode")}
                    />
                    {errors.verificationCode && (
                      <p className="text-[14px] text-warning">
                        {errors.verificationCode}
                      </p>
                    )}
                  </div>
                </>
              )}
            </form>

            {/* Account type notice - only in register mode */}
            {mode === "register" && (
              <div className="text-accent text-center bg-secaccent py-4 rounded-[10px]">
                <p>
                  This account will be registered as{" "}
                  <span className="font-bold">
                    {userType === "admin" ? "Admin" : "Employee"}
                  </span>
                </p>
              </div>
            )}

            <div className="flex flex-col justify-center gap-2">
              {mode === "register" && step > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(step - 1);
                    setErrors({});
                  }}
                  className="w-full border border-accent rounded-xl text-accent h-13.5"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-accent rounded-xl text-white h-13.5"
              >
                {getButtonLabel()}
              </button>

              <p className="text-center">
                {mode === "login" ? (
                  <>
                    Didn't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setStep(1);
                        setFormData({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          verificationCode: "",
                          rememberMe: false,
                        });
                        setErrors({});
                      }}
                      className="text-accent font-normal text-[16px]"
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setFormData({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          verificationCode: "",
                          rememberMe: false,
                        });
                        setErrors({});
                      }}
                      className="text-accent font-normal text-[16px]"
                    >
                      Sign in here
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
