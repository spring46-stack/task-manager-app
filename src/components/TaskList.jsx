import TaskItem from "./TaskItem.jsx";

// TaskList は「タスクの配列を受け取って、1件ずつ TaskItem として並べる」
// だけの役割を持つ部品です。ロジックはほとんど持たせず、表示に専念させています。
export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">タスクはまだありません。</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key は React が「どのタスクがどれか」を見分けるために必要な特別なpropsです。
        // ここでは各タスクに割り振った一意なidをkeyとして使っています。
        // （key は TaskItem コンポーネントの中では受け取れないので、
        //   もし別途idが必要ならtask.idとして別に渡します）
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </ul>
  );
}
