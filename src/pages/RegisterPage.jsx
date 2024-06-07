import RegisterForm from "../features/authentication/components/RegisterForm";
import LogoBig from "../icons/LogoBig";
import Header from "../layouts/Header";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div
        className="grid grid-cols-2
       bg-white"
      >
        <LogoBig />
        <div className="flex items-center justify-center ">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
