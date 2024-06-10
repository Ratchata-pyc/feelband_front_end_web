import ProfileContainer from "../features/profile/components/ProfileContainer";
import ProfileContextProvider from "../features/profile/context/ProfileContextProvider";
import ReviewContainer from "../features/profile/components/ReviewContainer";

export default function ProfilePage() {
  return (
    <>
      <ProfileContextProvider>
        <ProfileContainer />
        <ReviewContainer />
      </ProfileContextProvider>
    </>
  );
}
