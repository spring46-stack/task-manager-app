import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Viteの設定ファイルです。
// ここでは「Reactを使う」という設定（プラグイン）だけを追加しています。
// 基本的にこのファイルは初心者のうちは触らなくて大丈夫です。
export default defineConfig({
  plugins: [react()],
});
