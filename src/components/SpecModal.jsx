// ここがこのアプリの、ちょっとだけ発展的なポイントです。
//
// 末尾の "?raw" は Vite の機能で、「このファイルをコードとして実行せず、
// 中身をただの文字列として読み込む」という指定です。
// これにより、プロジェクト直下にある SPEC.md（仕様書）の中身をそのまま
// JavaScriptの文字列 specText として受け取れます。
import specText from "../../SPEC.md?raw";

// SpecModal は「仕様書の内容を、アプリの中でポップアップ表示する」部品です。
// props の onClose は「閉じるボタンが押されたときに呼ぶ関数」を親から受け取っています。
export default function SpecModal({ onClose }) {
  return (
    // 背景の暗い部分（オーバーレイ）をクリックしても閉じられるようにしています。
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        // 中身をクリックしたときに、背景クリック扱いになって閉じてしまわないようにします。
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>仕様書</h2>
          <button className="modal-close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>
        <pre className="modal-body">{specText}</pre>
      </div>
    </div>
  );
}
