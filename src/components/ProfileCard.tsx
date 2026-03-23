const ProfileCard = () => {
  return (
    <div className="w-72 bg-white p-5 shadow">
      <h3 className="font-semibold mb-3">Your Profile</h3>

      <div className="text-center">
        <img
          src="https://via.placeholder.com/80"
          className="rounded-full mx-auto mb-2"
        />
        <p className="font-semibold">Maria</p>
        <p className="text-sm text-gray-500">
          Continue your journey
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;