import Link from "next/link";
import { UseMemoDemo } from "@/components/organisms/UseMemoDemo";

const syntaxCode = `const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`;

const exampleCode = `import { useState, useMemo } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0); // 無関係な state
  const [n, setN] = useState(36);        // 計算に使う state

  // ❌ useMemo なし — count が変わるたびに毎回計算される
  const result = slowFib(n);

  // ✅ useMemo あり — n が変わったときだけ再計算される
  const memoResult = useMemo(() => slowFib(n), [n]);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      count: {count}
    </button>
  );
}`;

export default function HooksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-10 font-sans">
      {/* ナビゲーション */}
      <nav>
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← ホームへ戻る
        </Link>
      </nav>

      {/* ヘッダー */}
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          React Hooks ガイド
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          useMemo
        </h1>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          重い計算結果をメモ化（キャッシュ）し、依存値が変わったときだけ再計算する
          React フックです。不要な再計算を防ぐことでパフォーマンスを改善します。
        </p>
      </header>

      {/* 概要 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          概要
        </h2>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          React のコンポーネントは state や props が変わると再レンダーされ、
          コンポーネント内のすべての処理が再実行されます。重い計算処理がある場合、
          <strong className="text-zinc-800 dark:text-zinc-200">
            関係ない state の変化でも毎回実行
          </strong>
          されてしまいパフォーマンスが低下します。
        </p>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          <code className="mx-1 rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800">
            useMemo
          </code>
          を使うと、依存値（第 2 引数の配列）が変わったときだけ計算を再実行し、
          それ以外はキャッシュされた値を即座に返します。
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
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              第 1 引数:
            </span>{" "}
            メモ化したい値を返す関数
          </li>
          <li>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              第 2 引数:
            </span>{" "}
            依存値の配列（ここが変わったときだけ再計算）
          </li>
          <li>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              戻り値:
            </span>{" "}
            メモ化されたキャッシュ値
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
            "計算コストが高い処理（大量データのソート・フィルタ・数値演算など）",
            "子コンポーネントへ渡すオブジェクト・配列の参照を安定させたい場合",
            "useEffect / useCallback の依存配列に入れるオブジェクトを安定させたい場合",
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
            すべての計算に使うのは NG。メモ化自体にもコストがかかります。
            React DevTools Profiler で重いと確認できた箇所に絞りましょう。
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
          フィボナッチ数列の再帰計算を例に、useMemo の有無による差をリアルタイムで
          確認できます。ボタンを連打して左右の応答速度を比べてください。
        </p>
        <UseMemoDemo />
      </section>

      {/* 次のページへ */}
      <nav className="flex justify-end">
        <Link
          href="/hooks/use-callback"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          次: useCallback →
        </Link>
      </nav>
    </div>
  );
}
