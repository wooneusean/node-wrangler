import styles from './App.module.scss';
import WranglerNode from './components/WranglerNode';

function App() {
  return (
    <>
      <div className={styles.workBook}>
        <WranglerNode />
        <WranglerNode initialPosition={{ x: 200, y: 200 }} />
      </div>
    </>
  );
}

export default App;
