import styles from "./Home.module.css";
import hero_video from '../../assets/hero_image.mp4';
const Home = () => {
  return (
    <div className={styles.hero_container}>
      <div>
        <h1 className={styles.hero_text}>
          {/* <span className={styles.hero_text_span}>Eta ke banabi baraaa</span> */}
        </h1>
      </div>
      <div>
        <video
          className={styles.hero_video}
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
