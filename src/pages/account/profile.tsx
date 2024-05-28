import ProfileForm from "@modules/account/components/Profile";
import AccountLayout from "@modules/account/templates/AccountLayout";

const ProfilePage = () => {
  return (
    <AccountLayout>
      <ProfileForm />
    </AccountLayout>
  );
};

export default ProfilePage;
