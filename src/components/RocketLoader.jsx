import styles from "../../styles/RocketLoader.module.css";

const RocketLoader = () => {
  return (
    <div className={styles.main}>
      <div className={`${styles.body} bg-red-500`}>
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className={styles.base}>
          <span></span>
          <div className={styles.face}></div>
        </div>
      </div>
      <div className={styles.longfazers}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.h1}>Redirecting</div>
    </div>
  );
};

export default RocketLoader;
