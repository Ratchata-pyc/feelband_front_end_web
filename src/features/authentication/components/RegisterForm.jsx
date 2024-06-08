import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateRegister from "../validators/validate-register";
import authApi from "../../../apis/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }
      setInputError({ ...initialInputError });
      // Log the form data
      await authApi.register(input);

      toast.success("registered successfully. please log in to continue.");
      console.log("Form data:", input);
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response.data.field === "email") {
          setInputError((prev) => ({
            ...prev,
            email: "email already in use.",
          }));
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="-mt-40" onSubmit={handleSubmitForm}>
        <div className="w-[300px] space-y-4">
          <div>
            <h4 className="text-center text-2xl font-bold mb-4">Register</h4>
          </div>
          <div>
            <Input
              placeholder="Firstname"
              value={input.firstName}
              name="firstName"
              onChange={handleChangeInput}
              error={inputError.firstName}
            />
          </div>
          <div>
            <Input
              placeholder="Lastname"
              value={input.lastName}
              name="lastName"
              onChange={handleChangeInput}
              error={inputError.lastName}
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              value={input.email}
              name="email"
              onChange={handleChangeInput}
              error={inputError.email}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={handleChangeInput}
              error={inputError.password}
              type="password"
            />
          </div>
          <div>
            <Input
              placeholder="Confirm Password"
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={handleChangeInput}
              error={inputError.confirmPassword}
              type="password"
            />
          </div>
          <Button bg="stone" color="white" width="full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
