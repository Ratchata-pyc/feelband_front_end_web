import johnSrc from "../assets/profile_1.jpg";
import DaengSrc from "../assets/profile_2.jpg";
import Musician from "../components/MusicianCard";
export default function Homepage() {
  return (
    <>
      <div className="shadow-md mx-16 h-screen bg-white">
        <div className=" py-8 px-4  ">
          <p>เราได้ค้นหาให้คุณแล้ว</p>
          <p>พบนักดนตรี xx คน </p>
        </div>

        <div className="grid grid-cols-4 gap-4 pl-4 pr-4">
          <Musician
            firstName="John"
            lastName="Mayer"
            src={johnSrc}
            role="Guitar"
            genre="Jazz"
            provider="Bangkok"
            district="Ekkamai"
          />
          <Musician
            firstName="Deang"
            lastName="GuitarFire"
            src={DaengSrc}
            role="Guitar"
            genre="Jazz"
            provider="Bangkok"
            district="Wattana"
          />
          <Musician />
          <Musician />
        </div>
      </div>
    </>
  );
}
