import styles from "./Home.module.css";
import hero_video from '../../assets/hero_image.mp4';
import { Navigate } from "react-router-dom";
import { DetailsContext } from "../../context/DetailsContext";
import { useContext } from "react";

const Home = () => {
  const { user, isAdmin } = useContext(DetailsContext);

  console.log("User", user);

  if (user === null){
    return <Navigate to="/auth/signin" />;
  }

  if (user) {
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }


  // if (!user){
  //   return <Navigate to="/auth/signin" />;
  // }
};

export default Home;
