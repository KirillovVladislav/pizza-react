import styles from "./NotFoundBLock.module.scss";

export const NotFoundBLock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😳</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}> К сожалению страница не найдена</p>
    </div>
  );
};
