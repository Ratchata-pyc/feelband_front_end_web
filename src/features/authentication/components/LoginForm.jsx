import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validators/validate-login";

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
      console.log("Form data:", input); // Log the form data
      // Here you can proceed with submitting the form data
    } catch (err) {
      console.log(err);
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
