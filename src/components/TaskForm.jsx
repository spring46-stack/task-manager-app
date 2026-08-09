import { useState } from "react";

// TaskForm は「タスクを追加するための入力欄とボタン」を担当する部品です。
//
// props について：
// このコンポーネントは、親（App.jsx）から onAddTask という関数を受け取ります。
// 「タスクの中身をどう保存するか」は親（App.jsx）が知っていればよく、
// TaskForm 自身は「入力された文字を、渡された関数に渡すだけ」でよい、という
// 役割分担にしています。これにより、部品ごとの役割がシンプルになります。
export default function TaskForm({ onAddTask }) {
  // 入力欄に今何が入力されているかを保持するための状態です。
  const [text, setText] = useState("");

  function handleSubmit(event) {
    // フォームを送信すると、本来ブラウザはページを再読み込みしようとします。
    // それを止めて、JavaScript側だけで処理を完結させます。
    event.preventDefault();

    // 空文字や、空白だけの入力は追加しないようにします。
    const trimmed = text.trim();
    if (trimmed === "") return;

    onAddTask(trimmed);
    setText(""); // 追加したら入力欄を空にする
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="やることを書く…（例：牛乳を買う）"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="新しいタスク"
      />
      <button type="submit" className="add-button">
        追加
      </button>
    </form>
  );
}
