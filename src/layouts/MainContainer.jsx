import johnSrc from "../assets/profile_1.jpg";
import DaengSrc from "../assets/profile_2.jpg";
import Musician from "../profile/components/Musician";

export default function MainContainer() {
  return (
    <div className="shadow-md mx-16">
      <div className="px-16 py-4">
        <div className="flex justify-between items-center py-2">
          <p>Jazz</p>
          <a href="#" className="text-blue-500">
            ดูเพิ่มเติม
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
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
      <div className="px-16 py-4">
        <div className="flex justify-between items-center py-2">
          <p>Rock</p>
          <a href="#" className="text-blue-500">
            ดูเพิ่มเติม
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
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

      <div className="px-16 py-4">
        <div className="flex justify-between items-center py-2">
          <p>Pop</p>
          <a href="#" className="text-blue-500">
            ดูเพิ่มเติม
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
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

      <div className="px-16 py-4">
        <div className="flex justify-between items-center py-2">
          <p>XXX</p>
          <a href="#" className="text-blue-500">
            ดูเพิ่มเติม
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
}
