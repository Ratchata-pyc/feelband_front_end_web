import { Link } from "react-router-dom";
import { FeelbandIcon } from "../icons";

export default function Header() {
  return (
    <header className="flex bg-stone-500 justify-between items-center  h-16 ">
      <div className="px-8">
        <Link to="/">
          <FeelbandIcon />
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          to="/search"
          className="text-white hover:bg-stone-600 py-2 px-4 rounded"
        >
          search
        </Link>
        <Link
          to="/profile"
          className="text-white hover:bg-stone-600 py-2 px-4 rounded"
        >
          profile
        </Link>
        <Link
          to="/register"
          className="text-white hover:bg-stone-600 py-2 px-4 rounded"
        >
          register
        </Link>
        <Link
          to="/login"
          className="text-white hover:bg-stone-600 py-2 px-4 rounded mr-8"
        >
          login
        </Link>
      </div>
    </header>
  );
}
