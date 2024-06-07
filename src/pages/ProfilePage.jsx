import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import ProfileInfo from "../profile/components/ProfileInfo";
import ReviewContainer from "../layouts/ReviewContainer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <ProfileInfo />
      <ReviewContainer />
      <Footer />
    </>
  );
}
