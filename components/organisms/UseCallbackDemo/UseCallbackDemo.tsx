"use client";

import { useState, useCallback, memo } from "react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from "@/components/molecules/Card";

// ─── ログ行 ──────────────────────────────────────────────────────────────────

type LogEntry = { id: number; message: string; time: string };

function LogList({ entries }: { entries: LogEntry[] }) {
  return (
    <ul className="flex flex-col-reverse gap-1 max-h-36 overflow-y-auto font-mono text-xs">
      {entries.length === 0 && (
        <li className="text-zinc-400">（まだありません）</li>
      )}
      {entries.map((e) => (
        <li key={e.id} className="flex gap-2 text-zinc-600 dark:text-zinc-400">
          <span className="shrink-0 text-zinc-400">{e.time}</span>
          <span>{e.message}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── 子コンポーネント共通 props ───────────────────────────────────────────────

type ChildProps = {
  label: string;
  onClick: () => void;
  renderCount: number;
};

// ─── useCallback なし: 子コンポーネント ──────────────────────────────────────
// React.memo でラップしても、親が再レンダーされるたびに
// 新しい関数参照が渡ってくるため毎回再レンダーされる

const ChildWithoutCallback = memo(function ChildWithoutCallback({
  label,
  onClick,
  renderCount,
}: ChildProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="text-sm font-semibold text-red-500 dark:text-red-400">
          再レンダー回数: {renderCount}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onClick}>
        クリック
      </Button>
    </div>
  );
});

// ─── useCallback あり: 子コンポーネント ──────────────────────────────────────
// React.memo + useCallback の組み合わせにより、
// 依存値が変わらない限り関数参照が安定 → 子は再レンダーされない

const ChildWithCallback = memo(function ChildWithCallback({
  label,
  onClick,
  renderCount,
}: ChildProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className="text-sm font-semibold text-emerald-500 dark:text-emerald-400">
          再レンダー回数: {renderCount}
        </span>
      </div>
      <Button size="sm" variant="outline" onClick={onClick}>
        クリック
      </Button>
    </div>
  );
});

// ─── メインデモ ──────────────────────────────────────────────────────────────

let logId = 0;
function now() {
  return new Date().toLocaleTimeString("ja-JP", { hour12: false });
}

export function UseCallbackDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [withoutChildRenderCount, setWithoutChildRenderCount] = useState(0);
  const [withChildRenderCount, setWithChildRenderCount] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  function addLog(message: string) {
    setLogs((prev) => [...prev, { id: logId++, message, time: now() }]);
  }

  // ❌ useCallback なし
  // 親が再レンダーされるたびに新しい関数オブジェクトが生成される
  // → React.memo の子に渡っても「props が変わった」と判断され再レンダーされる
  function handleWithout() {
    setWithoutChildRenderCount((c) => c + 1);
    addLog("子（without）のボタンがクリックされました");
  }

  // ✅ useCallback あり
  // 依存配列 [] が変わらない限り同じ関数参照を返し続ける
  // → React.memo の子は「props に変化なし」と判断し再レンダーをスキップする
  const handleWith = useCallback(() => {
    setWithChildRenderCount((c) => c + 1);
    addLog("子（with）のボタンがクリックされました");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleParentRerender() {
    setParentCount((c) => c + 1);
  }

  // 親が再レンダーされるたびに without の子は再レンダーされる
  // （ここで renderCount を計算して渡すことで、子自身のレンダー関数内では
  //   サイドエフェクトなしに回数を表示できる）
  const withoutActualRenderCount = 1 + parentCount + withoutChildRenderCount;
  const withActualRenderCount = 1 + withChildRenderCount;

  return (
    <div className="flex flex-col gap-6">
      {/* コントロール */}
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          「親を再レンダーする」を連打して、子の再レンダー回数の違いを確認してください。
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleParentRerender}>
            親を再レンダーする
          </Button>
          <span className="font-mono text-sm text-zinc-500">
            親レンダー回数: {parentCount + 1}
          </span>
        </div>
      </div>

      {/* 比較パネル */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* useCallback なし */}
        <Card>
          <CardHeader>
            <CardTitle>❌ useCallback なし</CardTitle>
            <CardDescription>
              親が再レンダーされると関数参照が変わり子も再レンダーされます
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-3">
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-50 dark:bg-zinc-950">{`// 毎レンダーで新しい関数オブジェクトが生成される
function handleClick() {
  doSomething();
}

// memo の子に渡すと…
<Child onClick={handleClick} /> // 毎回 props が変わる`}</pre>
            <ChildWithoutCallback
              label="React.memo でラップされた子"
              onClick={handleWithout}
              renderCount={withoutActualRenderCount}
            />
          </CardBody>
        </Card>

        {/* useCallback あり */}
        <Card>
          <CardHeader>
            <CardTitle>✅ useCallback あり</CardTitle>
            <CardDescription>
              関数参照が安定するため React.memo が有効に機能します
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-3">
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 font-mono text-xs text-zinc-50 dark:bg-zinc-950">{`// 依存値が変わらない限り同じ参照を返す
const handleClick = useCallback(() => {
  doSomething();
}, []); // 依存配列

// memo の子に渡すと…
<Child onClick={handleClick} /> // props 変化なし`}</pre>
            <ChildWithCallback
              label="React.memo でラップされた子"
              onClick={handleWith}
              renderCount={withActualRenderCount}
            />
          </CardBody>
        </Card>
      </div>

      {/* 操作ログ */}
      <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          操作ログ（子のボタンクリック）
        </p>
        <LogList entries={logs} />
        {logs.length > 0 && (
          <button
            className="self-start text-xs text-zinc-400 underline hover:text-zinc-600 dark:hover:text-zinc-200"
            onClick={() => setLogs([])}
          >
            クリア
          </button>
        )}
      </div>

      {/* 解説 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
        <p className="font-semibold">💡 ポイント</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            React は関数を毎レンダーで<strong>新しいオブジェクト</strong>として生成します
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 font-mono dark:bg-blue-900">
              React.memo
            </code>{" "}
            は props の<strong>参照比較（===）</strong>を行うため、
            関数が毎回新しいと常に再レンダーされます
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 font-mono dark:bg-blue-900">
              useCallback
            </code>{" "}
            は依存値が変わらない限り<strong>同じ関数参照</strong>を返し続けます
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 font-mono dark:bg-blue-900">
              React.memo
            </code>{" "}
            +{" "}
            <code className="rounded bg-blue-100 px-1 font-mono dark:bg-blue-900">
              useCallback
            </code>{" "}
            を組み合わせることで、不要な子の再レンダーを防げます
          </li>
          <li>
            <strong>useCallback 単体では意味がありません</strong>。
            必ず React.memo か、useEffect / useMemo の依存配列と組み合わせて使います
          </li>
        </ul>
      </div>
    </div>
  );
}
