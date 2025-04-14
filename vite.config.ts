import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import progress from 'vite-plugin-progress'; // build进度

// import refreshPlugin from "./src/utils/refreshPlugin";
// 修改settings.js 避免缓存
// import { vitePluginAddScriptVersion } from "./vite-plugin-add-script-version";

const now = new Date().getTime(); // 定义一个时间戳

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  return {
    plugins: [
      react(),
      progress(),
    ],
    build: {
      chunkSizeWarningLimit: 20000, // 设置为 1 MB 或更高
    },
    base: "./",
    // 配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // 缓存全局的版本时间戳
    define: {
      __APP_VERSION__: now,
    },
    // esbuild去除配置
    esbuild: {
      drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
    // 配置代理
    server: {
      host: "0.0.0.0",
      port: 5002,
      open: true,
      proxy: {
        "/api": {
          // target: "http://10.56.183.56:8777/", // 刘帅56
          target: "http://10.56.180.55:8777", // 肖峰本地  http://10.32.210.45:8777 // 雄安vpn
          // target: "http://10.56.180.64:8777", // 刘帅本地
          // target: "http://10.56.180.115:8777", // 孙伟本地
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      cors: true,
    },
  }
})
