import { Link } from "react-router-dom";
import RegisterForm from "../features/authentication/components/RegisterForm";
import LogoBig from "../icons/LogoBig";
import Header from "../layouts/Header";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-2 bg-white">
        <div className="flex items-center justify-center pb-36">
          <Link to="/">
            <LogoBig />
          </Link>
        </div>
        <div className="flex items-center justify-center ">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
