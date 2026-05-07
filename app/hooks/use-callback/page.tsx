import Link from "next/link";
import { UseCallbackDemo } from "@/components/organisms/UseCallbackDemo";

const syntaxCode = `const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`;

const exampleCode = `import { useState, useCallback, memo } from "react";

// React.memo でラップした子コンポーネント
const Child = memo(function Child({ onClick }: { onClick: () => void }) {
  console.log("Child がレンダーされました");
  return <button onClick={onClick}>クリック</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ useCallback なし — count/text どちらが変わっても新しい関数が生成される
  //    → Child は毎回再レンダーされる（React.memo が無意味になる）
  function handleClick() {
    console.log("クリックされました");
  }

  // ✅ useCallback あり — [] が変わらない限り同じ関数参照を維持
  //    → text が変わっても Child は再レンダーされない
  const handleClickMemo = useCallback(() => {
    console.log("クリックされました");
  }, []);

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Child onClick={handleClickMemo} />
    </>
  );
}`;

export default function UseCallbackPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-10 font-sans">
      {/* ナビゲーション */}
      <nav className="flex gap-4 text-sm">
        <Link
          href="/"
          className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← ホームへ
        </Link>
        <span className="text-zinc-300 dark:text-zinc-600">|</span>
        <Link
          href="/hooks"
          className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← useMemo
        </Link>
      </nav>

      {/* ヘッダー */}
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          React Hooks ガイド
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          useCallback
        </h1>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          関数をメモ化（キャッシュ）し、依存値が変わったときだけ新しい関数を生成する
          React フックです。<code className="rounded bg-zinc-100 px-1 font-mono text-sm dark:bg-zinc-800">React.memo</code> と組み合わせることで、
          不要な子コンポーネントの再レンダーを防ぎます。
        </p>
      </header>

      {/* useMemo との違い */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          useMemo との違い
        </h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">フック</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">メモ化するもの</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-700 dark:text-zinc-300">主な用途</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">useMemo</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">計算結果の<strong>値</strong></td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">重い計算のキャッシュ</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">useCallback</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400"><strong>関数</strong>そのもの</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">子への関数 props の参照を安定させる</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          実は{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono dark:bg-zinc-800">
            useCallback(fn, deps)
          </code>{" "}
          は{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono dark:bg-zinc-800">
            useMemo(() =&gt; fn, deps)
          </code>{" "}
          と等価です。関数を値としてメモ化しているにすぎません。
        </p>
      </section>

      {/* 構文 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          構文
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-zinc-50 dark:bg-zinc-950">
          {syntaxCode}
        </pre>
        <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">第 1 引数:</span>{" "}
            メモ化したい関数
          </li>
          <li>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">第 2 引数:</span>{" "}
            依存値の配列（ここが変わったときだけ新しい関数を生成）
          </li>
          <li>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">戻り値:</span>{" "}
            メモ化された関数参照
          </li>
        </ul>
      </section>

      {/* いつ使うか */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          使いどき
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          {[
            "React.memo でラップした子コンポーネントへ関数を props として渡す場合",
            "useEffect の依存配列に関数を入れる場合（無限ループ防止）",
            "useMemo の依存配列に関数を入れる場合",
          ].map((text) => (
            <li key={text} className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          <p className="font-semibold">⚠️ 注意</p>
          <p className="mt-1">
            <code className="rounded bg-amber-100 px-1 font-mono dark:bg-amber-900">useCallback</code> 単体では意味がありません。
            必ず <code className="rounded bg-amber-100 px-1 font-mono dark:bg-amber-900">React.memo</code> か
            依存配列と組み合わせて使いましょう。すべての関数に使うのは過剰最適化です。
          </p>
        </div>
      </section>

      {/* コード例 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          コード例
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-zinc-50 dark:bg-zinc-950">
          {exampleCode}
        </pre>
      </section>

      {/* インタラクティブデモ */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          インタラクティブデモ
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          同じ <code className="rounded bg-zinc-100 px-1 font-mono dark:bg-zinc-800">React.memo</code> でラップされた子コンポーネントに、
          useCallback なし / あり の関数を渡したときの再レンダー回数の差を確認できます。
        </p>
        <UseCallbackDemo />
      </section>
    </div>
  );
}
