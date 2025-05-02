import BaseLayout from "./layouts/base-layout/base-layout";

interface AppProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

function App({ isDarkMode, setIsDarkMode }: AppProps) {
  return (
    <>
      <BaseLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </>
  );
}

export default App;
