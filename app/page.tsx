
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@/components/molecules/Card";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-12 bg-zinc-50 px-4 py-12 font-sans dark:bg-black">
      {/* Hooks ガイドへのナビゲーション */}
      <section className="flex flex-col items-center gap-3 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Hooks ガイド
        </p>
        <Link href="/hooks">
          <Button variant="outline">useMemo の説明ページへ →</Button>
        </Link>
      </section>
      {/* Card */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Card
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {/* 基本カード */}
          <Card className="w-72">
            <CardHeader>
              <CardTitle>基本カード</CardTitle>
              <CardDescription>サブタイトルや説明文を入れます</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                カードのメインコンテンツエリアです。テキスト、画像、リストなど
                任意のコンテンツを配置できます。
              </p>
            </CardBody>
            <CardFooter className="gap-2">
              <Button size="sm" variant="primary">
                保存
              </Button>
              <Button size="sm" variant="ghost">
                キャンセル
              </Button>
            </CardFooter>
          </Card>

          {/* シャドウなし */}
          <Card shadow="none" className="w-72">
            <CardHeader>
              <CardTitle>シャドウなし</CardTitle>
              <CardDescription>shadow=&quot;none&quot; のバリエーション</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                ボーダーのみでシャドウを持たないフラットなカードです。
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">
                詳細を見る
              </Button>
            </CardFooter>
          </Card>

          {/* ヘッダー・フッターなし */}
          <Card shadow="lg" className="w-72">
            <CardBody>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                シンプルカード
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                CardBody のみで構成したシンプルな構造です。shadow=&quot;lg&quot; を指定しています。
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Button Variants */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Size */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap items-end justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Disabled
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </div>
      </section>
    </div>
  );
}
