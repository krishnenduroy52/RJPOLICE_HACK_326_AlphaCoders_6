import styles from "./Home.module.css";
import hero_video from '../../assets/hero_image.mp4';
const Home = () => {
  return (
    <div className={styles.hero_container}>
      <div>
        
      </div>
      <div>
        <video
          data-v-27edef16=""
          data-test="video-content"
          preload="auto"
          src={hero_video}
          type="video/mp4"
          loop="true"
          draggable="false"
          autoPlay="true"
          muted="true"
        ></video>
      </div>
    </div>
  );
};

export default Home;
