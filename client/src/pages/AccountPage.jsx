import { useContext } from "react";
import { UserContext } from "../UserContextProvider";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);
  const { subPage } = useParams();
  console.log(subPage);
  if (!ready) return "Loading.....";
  if (ready && !user) return <Navigate to={"/login"} />;

  const linkClasses = (type = null) => {
    let defaultClass = "px-6 py-2 rounded-full ";
    if (type === subPage || (subPage == undefined && type == "profile")) {
      defaultClass += "bg-primary text-white";
    }
    return defaultClass;
  };

  return (
    <div>
      <nav className="flex w-full mt-8 gap-4 justify-center">
        <Link className={linkClasses("profile")} to={"/account/"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodation
        </Link>
      </nav>
    </div>
  );
};

export default AccountPage;
