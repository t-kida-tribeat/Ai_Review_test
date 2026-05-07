"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from "@/components/molecules/Card";

// N が大きいほど重くなる再帰フィボナッチ（意図的に遅い実装）
function slowFib(n: number): number {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// ─── useMemo なしパネル ──────────────────────────────────────────────────────
// rerenderKey（= count）が変わるたびに props が変わる → 必ず再レンダーされる
// そのたびに slowFib(n) がレンダー中で直接実行される

type WithoutMemoPanelProps = {
  n: number;
  rerenderKey: number; // 変化するたびに再レンダーを引き起こす
  rerenderCount: number;
  computeCount: number;
  elapsed: string;
};

function WithoutMemoPanel({
  n,
  rerenderCount,
  computeCount,
  elapsed,
}: WithoutMemoPanelProps) {
  // ★ useMemo なし: レンダーのたびに slowFib が実行される
  const result = slowFib(n);

  return (
    <Card className="flex-1 min-w-0">
      <CardHeader>
        <CardTitle>❌ useMemo なし</CardTitle>
        <CardDescription>レンダーのたびに再計算されます</CardDescription>
      </CardHeader>
      <CardBody className="flex flex-col gap-3 text-sm">
        <Row label="再レンダー回数" value={String(rerenderCount)} />
        <Row
          label="slowFib 計算回数"
          value={String(computeCount)}
          valueClassName="text-red-500 dark:text-red-400"
        />
        <Row
          label="最後の計算時間"
          value={elapsed === "—" ? elapsed : `${elapsed}ms`}
          valueClassName="text-red-500 dark:text-red-400"
        />
        <Row label={`fib(${n})`} value={String(result)} mono />
      </CardBody>
    </Card>
  );
}

// ─── useMemo ありパネル ──────────────────────────────────────────────────────
// rerenderKey が変わっても再レンダーはされる（props が変わるため）
// しかし useMemo のキャッシュは n が変わるまで使い回される

type WithMemoPanelProps = {
  n: number;
  rerenderKey: number; // 変化するたびに再レンダーを引き起こす（withoutと同条件）
  rerenderCount: number;
  computeCount: number;
  elapsed: string;
};

function WithMemoPanel({
  n,
  rerenderCount,
  computeCount,
  elapsed,
}: WithMemoPanelProps) {
  // ★ useMemo あり: n が変わったときだけ slowFib が実行される
  //    rerenderKey が変わって再レンダーされても、n が同じならキャッシュを返す
  const result = useMemo(() => slowFib(n), [n]);

  return (
    <Card className="flex-1 min-w-0">
      <CardHeader>
        <CardTitle>✅ useMemo あり</CardTitle>
        <CardDescription>n が変わったときだけ再計算します</CardDescription>
      </CardHeader>
      <CardBody className="flex flex-col gap-3 text-sm">
        <Row label="再レンダー回数" value={String(rerenderCount)} />
        <Row
          label="slowFib 計算回数"
          value={String(computeCount)}
          valueClassName="text-emerald-500 dark:text-emerald-400"
        />
        <div className="flex justify-between gap-2">
          <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
            最後の計算時間
          </span>
          <span className="flex items-center gap-2">
            <span className="font-mono font-bold text-emerald-500 dark:text-emerald-400">
              {elapsed === "—" ? elapsed : `${elapsed}ms`}
            </span>
            <span className="text-xs text-zinc-400">(n 変更時のみ更新)</span>
          </span>
        </div>
        <Row label={`fib(${n})`} value={String(result)} mono />
      </CardBody>
    </Card>
  );
}

// ─── 共通行 ──────────────────────────────────────────────────────────────────

type RowProps = {
  label: string;
  value: string;
  valueClassName?: string;
  mono?: boolean;
};

function Row({ label, value, valueClassName = "", mono = false }: RowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <span
        className={["font-bold", mono ? "font-mono" : "", valueClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

// ─── メインデモ ──────────────────────────────────────────────────────────────

const INITIAL_N = 36;

export function UseMemoDemo() {
  const [fibN, setFibN] = useState(INITIAL_N);
  // ボタン押下回数
  const [count, setCount] = useState(0);
  // N を変更した回数
  const [nChangeCount, setNChangeCount] = useState(0);
  // タイミング（イベントハンドラ内でのみ計測 ─ レンダー外）
  const [withoutElapsed, setWithoutElapsed] = useState("—");
  const [withElapsed, setWithElapsed] = useState("—");

  // ─ 計算回数を数学的に算出（サイドエフェクト不要） ─────────────────────────
  //
  //   without: 初回1回 + N変更のたび + ボタン押下のたび
  //            → レンダーされるたびに slowFib が走るため
  //
  //   with:    初回1回 + N変更のたびのみ
  //            → useMemo が count 変化時はキャッシュを返すため
  //
  const rerenderCount = 1 + count + nChangeCount; // 両パネル共通（同じ条件で再レンダー）
  const withoutComputeCount = rerenderCount; // 毎レンダーで計算
  const withComputeCount = 1 + nChangeCount; // N変更時のみ計算

  // N スライダー変更: 両パネルが再計算（n が変わるため useMemo も再実行）
  function handleNChange(newN: number) {
    // performance.now はイベントハンドラ内なので問題なし
    const start = performance.now();
    slowFib(newN);
    const elapsed = (performance.now() - start).toFixed(1);
    setWithoutElapsed(elapsed);
    setWithElapsed(elapsed); // with もこのときだけ更新
    setNChangeCount((c) => c + 1);
    setFibN(newN);
  }

  // ボタン押下: without は再計算、with は useMemo キャッシュを返す
  function handleRerender() {
    const start = performance.now();
    slowFib(fibN);
    const elapsed = (performance.now() - start).toFixed(1);
    setWithoutElapsed(elapsed); // without は毎回更新
    // with は再計算しないので elapsed は更新しない
    setCount((c) => c + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* コントロール */}
      <div className="flex flex-col gap-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            N（フィボナッチの引数）={" "}
            <span className="font-mono font-bold">{fibN}</span>
          </label>
          <input
            type="range"
            min={28}
            max={42}
            value={fibN}
            onChange={(e) => handleNChange(Number(e.target.value))}
            className="w-full max-w-xs accent-zinc-900 dark:accent-white"
          />
          <p className="text-xs text-zinc-400">
            スライダーを右にするほど計算コストが増えます（42 付近は注意）
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleRerender}>
            無関係な再レンダーを発生させる
          </Button>
          <span className="font-mono text-sm text-zinc-500">count = {count}</span>
        </div>
      </div>

      {/* 比較パネル（同じ rerenderKey を渡すことで同条件で再レンダーさせる） */}
      <div className="flex flex-col sm:flex-row gap-4">
        <WithoutMemoPanel
          n={fibN}
          rerenderKey={count}
          rerenderCount={rerenderCount}
          computeCount={withoutComputeCount}
          elapsed={withoutElapsed}
        />
        <WithMemoPanel
          n={fibN}
          rerenderKey={count}
          rerenderCount={rerenderCount}
          computeCount={withComputeCount}
          elapsed={withElapsed}
        />
      </div>

      {/* 解説 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
        <p className="font-semibold">💡 ポイント</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            両パネルの<strong>再レンダー回数は同じ</strong>です（同条件で props が変化するため）
          </li>
          <li>
            左（useMemo なし）は再レンダー = slowFib 計算なので、計算回数 = 再レンダー回数
          </li>
          <li>
            右（useMemo あり）は N が変わったときだけ slowFib が走り、それ以外はキャッシュを返します
          </li>
          <li>
            ボタンを連打すると左の計算回数だけが増え続け、右は N を変えるまで増えません
          </li>
        </ul>
      </div>
    </div>
  );
}
