import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { StatusCodes } from "http-status-codes"
import InputForm from "../components/InputForm";
import PasswordEye from "../components/PasswordEye";
import LoadingButton from "../components/LoadingButton";
import { login } from "../utils/authHandler";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus, setLoginStatus] = useState({
    success: null,
    message: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function updateEmail(value) {
    setEmail(value);
    setEmailError("");
  }

  function updatePassword(value) {
    setPassword(value);
    setPasswordError("");
  }

  function handleLoginClick() {
    let error = false;
    if (!email) {
      setEmailError("Enter Email");
      error = true;
    }
    if (!password) {
      setPasswordError("Enter Password");
      error = true;
    }
    if (error) return;

    setLoading(true);
    login({ email, password }).then((data) => {
      setLoading(false);
      if (!data.statusCode === StatusCodes.OK) {
        setLoginStatus({ success: false, message: data.message });
        return;
      }
      setLoginStatus({ success: true, message: "Redirecting..." });
      navigate("/");
    });
  }

  const content = (
    <>
      {loginStatus.message && (
        <Card>
          <CardBody
            className={
              !loginStatus.success ? "bg-danger" : "bg-success text-black"
            }
          >
            {loginStatus.message}
          </CardBody>
        </Card>
      )}
      <Input
        type="email"
        label="Email"
        isRequired
        size="sm"
        variant="bordered"
        value={email}
        onValueChange={updateEmail}
        errorMessage={emailError}
        isInvalid={!!emailError}
      ></Input>
      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        isRequired
        size="sm"
        variant="bordered"
        value={password}
        onValueChange={updatePassword}
        errorMessage={passwordError}
        isInvalid={!!passwordError}
        endContent={
          <PasswordEye
            show={showPassword}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        }
      ></Input>
      <Link href="/reset-password">Forgot Password?</Link>
      <LoadingButton
        loading={loading}
        text="Login"
        onPress={handleLoginClick}
      ></LoadingButton>
      <div className="w-full text-center">
        <Link href="/signup">Don't Have An Account?</Link>
      </div>
    </>
  );

  return <InputForm greeting="Welcome Back" title="Login" content={content} />;
}
