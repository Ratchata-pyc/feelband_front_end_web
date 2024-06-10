import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validators/validate-login";
import useAuth from "../../../hooks/useAuth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }

      setInputError(initialInputError);
      await login(input);
      navigate("/");
      toast.success("login successfully");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? "invalid email or mobile or password"
            : "internal server error";

        return toast.error(message);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="-mt-40" onSubmit={handleSubmitForm}>
        <div className="w-[300px] space-y-4">
          <div>
            <h4 className="text-center text-2xl font-bold mb-4">Login</h4>
          </div>

          <div>
            <Input
              placeholder="Email address or phone number"
              name="email"
              value={input.email}
              onChange={handleChangeInput}
              error={inputError.email}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChangeInput}
              error={inputError.password}
            />
          </div>

          <div>
            <Button bg="stone" color="white" width="full" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
