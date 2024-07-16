// import { useState } from "react";
// import Button from "../../../components/Button";
// import Input from "../../../components/Input";
// import validateLogin from "../validators/validate-login";
// import useAuth from "../../../hooks/useAuth";
// import { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const initialInput = {
//   email: "",
//   password: "",
// };

// const initialInputError = {
//   email: "",
//   password: "",
// };

// export default function LoginForm() {
//   const [input, setInput] = useState(initialInput);
//   const [inputError, setInputError] = useState(initialInputError);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChangeInput = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmitForm = async (e) => {
//     try {
//       e.preventDefault();
//       const error = validateLogin(input);
//       if (error) {
//         return setInputError(error);
//       }

//       setInputError(initialInputError);
//       await login(input);
//       // console.log(input);
//       navigate("/");
//       toast.success("login successfully");
//     } catch (err) {
//       console.log(err);
//       if (err instanceof AxiosError) {
//         const status = err.response.status;
//         const message =
//           status === 400
//             ? "invalid email or password"
//             : status === 403
//             ? "You are banned. Please contact the admin."
//             : "internal server error";

//         return toast.error(message);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded px-8 py-8 mb-4 lg:shadow-md sm:mt-0">
//       <form onSubmit={handleSubmitForm}>
//         <div className="mb-4">
//           <h4 className="text-center text-2xl font-bold mb-4">Login</h4>
//         </div>

//         <div className="mb-4">
//           <Input
//             placeholder="Email address or phone number"
//             name="email"
//             value={input.email}
//             onChange={handleChangeInput}
//             error={inputError.email}
//           />
//         </div>
//         <div className="mb-4">
//           <Input
//             placeholder="Password"
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={handleChangeInput}
//             error={inputError.password}
//           />
//         </div>

//         <div>
//           <Button bg="stone" color="white" width="full" type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

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
  const [isLoading, setIsLoading] = useState(false); // state สำหรับการจัดการสถานะการโหลด

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true); // ตั้งค่าสถานะการโหลดเป็น true
      const error = validateLogin(input);
      if (error) {
        setIsLoading(false); // ตั้งค่าสถานะการโหลดเป็น false
        return setInputError(error);
      }

      setInputError(initialInputError);
      await login(input);
      navigate("/");
      toast.success("login successfully");
      setIsLoading(false); // ตั้งค่าสถานะการโหลดเป็น false
    } catch (err) {
      setIsLoading(false); // ตั้งค่าสถานะการโหลดเป็น false
      console.log(err);
      if (err instanceof AxiosError) {
        const status = err.response.status;
        const message =
          status === 400
            ? "invalid email or password"
            : status === 403
            ? "You are banned. Please contact the admin."
            : "internal server error";

        return toast.error(message);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded px-8 py-8 mb-4 lg:shadow-md sm:mt-0">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <h4 className="text-center text-2xl font-bold mb-4">Login</h4>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Email address or phone number"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="mb-4">
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
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
