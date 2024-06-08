import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/components/LoginForm";
import LogoBig from "../icons/LogoBig";
import Header from "../layouts/Header";

export default function LoginPage() {
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
          <LoginForm />
        </div>
      </div>
    </>
  );
}
