import { App as AntdApp, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { RouterProvider } from "react-router-dom";
import 'antd/dist/reset.css';
import router from "./routes";

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        hashed: false,
      }}
    >
      <AntdApp className="w-full h-full">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;    