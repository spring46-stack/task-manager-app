import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ここがアプリの「入り口」です。
// index.html の <div id="root"></div> を見つけて、
// その中に <App /> コンポーネント（画面全体）を描画（表示）しています。
//
// React.StrictMode は、開発中に「よくある間違い」を見つけやすくしてくれる
// 補助モードです。本番の見た目には影響しません。
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
