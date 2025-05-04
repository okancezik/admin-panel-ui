import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{
        backgroundColor: isDarkMode ? "#141414" : "#fff",
        minHeight: "100vh",
        transition: "all 0.3s"
      }}>
        <BrowserRouter>
          <App
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
