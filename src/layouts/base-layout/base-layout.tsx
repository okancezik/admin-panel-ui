import styles from './base-layout.module.scss';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import PageContent from '../page-content/page-content';

interface BaseLayoutProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const BaseLayout = ({isDarkMode, setIsDarkMode}:BaseLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.pageContent}>
          <PageContent />
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
