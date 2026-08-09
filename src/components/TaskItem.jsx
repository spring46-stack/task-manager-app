// TaskItem は「タスク1件分」の見た目を担当する、いちばん小さな部品です。
//
// このコンポーネントは自分では状態(state)を持ちません。
// 「今どんな内容か(task)」「クリックされたら何をするか(onToggle, onDelete)」を
// すべて親から props として受け取り、それをそのまま表示・実行するだけです。
// このような部品を「プレゼンテーショナル（表示専用）コンポーネント」と呼ぶことがあります。
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.done ? " is-done" : ""}`}>
      <button
        className="stamp-checkbox"
        onClick={onToggle}
        aria-pressed={task.done}
        aria-label={task.done ? "未完了に戻す" : "完了にする"}
      >
        {/* 完了しているときだけ「済」の判子を表示します */}
        {task.done && <span className="stamp-mark">済</span>}
      </button>

      <span className="task-text">{task.text}</span>

      <button
        className="delete-button"
        onClick={onDelete}
        aria-label="このタスクを削除"
      >
        消す
      </button>
    </li>
  );
}
