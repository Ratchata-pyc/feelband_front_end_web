import LoginForm from "../features/authentication/components/LoginForm";
import LogoBig from "../icons/LogoBig";
import Header from "../layouts/Header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div
        className="grid grid-cols-2
       bg-white"
      >
        <LogoBig />
        <div className="flex items-center justify-center ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
