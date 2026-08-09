import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import SpecModal from "./components/SpecModal.jsx";
import "./App.css";

// localStorage（ブラウザの中に小さくデータを保存できる場所）に
// タスクを保存するときのキー（名前）を決めておきます。
const STORAGE_KEY = "task-notebook-tasks";

// アプリを開いた最初の一回だけ、保存されているタスクを読み込む関数です。
// 何も保存されていなければ、空の配列（タスク0件の状態）を返します。
function loadInitialTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    // 万が一、保存データが壊れていて読み込めなくても
    // アプリ自体が止まらないようにしておきます。
    console.error("保存されたタスクの読み込みに失敗しました:", error);
    return [];
  }
}

export default function App() {
  // ---- 状態(state)の定義 ----
  // React では「画面に表示する値」を useState で管理します。
  // 値が変わると、画面が自動的に再描画されます。

  // tasks: タスクのリスト（配列）。1件ごとに { id, text, done, createdAt } を持ちます。
  const [tasks, setTasks] = useState(loadInitialTasks);

  // filter: 今どの絞り込み表示をしているか。"all" | "active" | "done" のどれか。
  const [filter, setFilter] = useState("all");

  // isSpecOpen: 仕様書モーダルを開いているかどうか。
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  // tasks が変化するたびに、自動でlocalStorageに保存します。
  // useEffect は「何かの値が変わったときに、副作用（保存処理など）を実行する」ためのしくみです。
  // 第2引数の [tasks] は「tasksが変わったときだけ実行する」という指定です。
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ---- タスクを操作する関数たち ----
  // これらの関数は子コンポーネント（TaskForm, TaskListなど）に props として渡し、
  // 「ボタンが押されたら、この関数を呼んでね」という形で使ってもらいます。

  // 新しいタスクを追加する
  function handleAddTask(text) {
    const newTask = {
      id: Date.now(), // 現在時刻(ミリ秒)をIDとして使う。簡易的だが重複しにくい
      text,
      done: false,
      createdAt: new Date().toISOString(),
    };
    // 元の配列を直接書き換えず、新しい配列を作って setTasks に渡します。
    // （Reactでは「配列やオブジェクトを直接変更しない」のが基本ルールです）
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  // 指定したIDのタスクの完了/未完了を切り替える
  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // 指定したIDのタスクを削除する
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // ---- 表示用のデータを作る ----
  // filter の状態にあわせて、表示するタスクを絞り込みます。
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true; // filter === "all" のとき
  });

  const activeCount = tasks.filter((task) => !task.done).length;

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">タスク帳</h1>
        <p className="subtitle">今日やることを書き留めよう</p>
      </header>

      <main className="notebook">
        <TaskForm onAddTask={handleAddTask} />

        <div className="toolbar">
          <div className="filters" role="group" aria-label="表示の絞り込み">
            <FilterButton
              label="すべて"
              value="all"
              current={filter}
              onSelect={setFilter}
            />
            <FilterButton
              label="未完了"
              value="active"
              current={filter}
              onSelect={setFilter}
            />
            <FilterButton
              label="完了"
              value="done"
              current={filter}
              onSelect={setFilter}
            />
          </div>
          <p className="count">残り {activeCount} 件</p>
        </div>

        <TaskList
          tasks={visibleTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <footer className="footer">
        <button className="spec-link" onClick={() => setIsSpecOpen(true)}>
          仕様書を見る
        </button>
      </footer>

      {isSpecOpen && <SpecModal onClose={() => setIsSpecOpen(false)} />}
    </div>
  );
}

// フィルターの切り替えボタン1つ分の小さな部品です。
// App.jsx の中に書いていますが、独立したファイルに分けても構いません。
// （今回は数行と小さいのでまとめています）
function FilterButton({ label, value, current, onSelect }) {
  const isActive = value === current;
  return (
    <button
      className={`filter-tab${isActive ? " is-active" : ""}`}
      onClick={() => onSelect(value)}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
