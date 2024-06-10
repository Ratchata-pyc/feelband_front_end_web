import johnSrc from "../../../assets/profile_1.jpg";
import useProfile from "../hooks/useProfile";
import AddLine from "./AddLine";

export default function ProfileInfo() {
  const { profileUser } = useProfile();
  return (
    <div className="flex justify-center items-center bg-white shadow-md mt-4 max-w-[1300px]">
      <div className="grid grid-cols-2 ">
        <div className="flex justify-end items-center">
          <div className=" flex justify-center items-start overflow-hidden">
            <img
              className="flex w-[600px] h-[700px]"
              src={johnSrc}
              alt="Profile"
            />
          </div>
        </div>

        <div className="flex">
          <div className="overflow-hidden pt-4 ">
            <div className=" grid grid-cols-2 gap-4  py-4 px-8 max-w-[300px]">
              <p>Name:</p>
              <p className="w-full whitespace-nowrap">{`${profileUser?.firstName} ${profileUser?.lastName}`}</p>
              <p>Role:</p>
              <p>{profileUser?.role}</p>
              <p>Genre:</p>
              <p>{profileUser?.genre}</p>
              <p>Province:</p>
              <p>{profileUser?.province}</p>
              <p>District:</p>
              <p>{profileUser?.district}</p>
              <p>Budget:</p>
              {profileUser?.budget && <p>{`${profileUser.budget} Bath`}</p>}
            </div>
            <div className="py-4 px-8">
              <AddLine />
            </div>

            <div className="border-none  py-4 px-8 mt-4 max-w-[600px]">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At rem
                alias vitae. Eligendi voluptatem ipsa ipsum beatae repellat
                assumenda, aperiam excepturi. Explicabo animi architecto alias
                libero fuga. Numquam modi expedita facere placeat dolorem harum,
                ipsam odit. Error, quaerat? Numquam, nesciunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
