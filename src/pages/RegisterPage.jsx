import { Link } from "react-router-dom";
import RegisterForm from "../features/authentication/components/RegisterForm";
import LogoBig from "../icons/LogoBig";
import Header from "../layouts/Header";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white min-h-screen mt-16 sm:mt-0">
        <div className="flex items-center justify-center py-8 lg:py-0">
          <Link to="/">
            <LogoBig className="block w-1/3 lg:hidden" />
          </Link>
        </div>
        <div className="flex items-center justify-center mt-[-20px] lg:mt-0">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
