import { useState } from "react";
import Input from "../../../components/Input";
import validateRegister from "../validators/validate-register";

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
    } catch (err) {
      console.log(err);

      if (err.response.data.field === "emailOrMobile")
        setInputError((prev) => ({
          ...prev,
          emailOrMobile: "email or mobile already in use.",
        }));
    }
  };
  return (
    <div className=" w-screen h-screen flex items-center justify-center ">
      <form className="-mt-40" onSubmit={handleSubmitForm}>
        <div className=" w-[300px] space-y-4">
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
        </div>
      </form>
    </div>
  );
}
