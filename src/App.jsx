import styles from './App.module.scss';
import WranglerNode from './components/WranglerNode';

function App() {
  return (
    <>
      <div className={styles.workBook}>
        <WranglerNode />
      </div>
    </>
  );
}

export default App;
