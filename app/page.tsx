
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { LinkButton } from "@/components/atoms/LinkButton";
import { IconButton } from "@/components/atoms/IconButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@/components/molecules/Card";
import {
  MediaCard,
  MediaCardMedia,
  MediaCardImage,
  MediaCardBadge,
  MediaCardBody,
  MediaCardTitle,
  MediaCardFooter,
} from "@/components/molecules/MediaCard";
import { StatCard } from "@/components/molecules/StatCard";

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
          Button Variants
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Button Sizes
        </p>
        <div className="flex flex-wrap items-end justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Button Disabled */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Button Disabled
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="danger" disabled>Danger</Button>
          <Button variant="success" disabled>Success</Button>
          <Button variant="outline" disabled>Outline</Button>
        </div>
      </section>

      {/* Card Variants */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Card Variants
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Card variant="info" shadow="sm" className="w-64">
            <CardBody>
              <CardTitle className="text-blue-700 dark:text-blue-300 mb-1">情報</CardTitle>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                variant=&quot;info&quot; — お知らせや補足情報に使います。
              </p>
            </CardBody>
          </Card>
          <Card variant="success" shadow="sm" className="w-64">
            <CardBody>
              <CardTitle className="text-emerald-700 dark:text-emerald-300 mb-1">成功</CardTitle>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                variant=&quot;success&quot; — 操作が正常に完了したときに使います。
              </p>
            </CardBody>
          </Card>
          <Card variant="warning" shadow="sm" className="w-64">
            <CardBody>
              <CardTitle className="text-amber-700 dark:text-amber-300 mb-1">注意</CardTitle>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                variant=&quot;warning&quot; — ユーザーへの注意喚起に使います。
              </p>
            </CardBody>
          </Card>
          <Card variant="danger" shadow="sm" className="w-64">
            <CardBody>
              <CardTitle className="text-red-700 dark:text-red-300 mb-1">エラー</CardTitle>
              <p className="text-sm text-red-600 dark:text-red-400">
                variant=&quot;danger&quot; — エラーや破壊的操作の警告に使います。
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Card + Button の組み合わせ例 */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Card + Button の組み合わせ
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Card variant="default" className="w-72">
            <CardHeader>
              <CardTitle>アカウント削除</CardTitle>
              <CardDescription>この操作は取り消せません</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                アカウントを削除すると、すべてのデータが完全に失われます。
              </p>
            </CardBody>
            <CardFooter className="gap-2">
              <Button variant="danger" size="sm">削除する</Button>
              <Button variant="ghost" size="sm">キャンセル</Button>
            </CardFooter>
          </Card>

          <Card variant="success" shadow="sm" className="w-72">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-300">
                保存しました
              </CardTitle>
              <CardDescription className="text-emerald-600 dark:text-emerald-400">
                変更が正常に反映されました
              </CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                プロフィール情報が更新されました。
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="success" size="sm">続ける</Button>
            </CardFooter>
          </Card>

          <Card variant="warning" shadow="sm" className="w-72">
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-300">
                プランの上限に近づいています
              </CardTitle>
              <CardDescription className="text-amber-600 dark:text-amber-400">
                使用量が 80% を超えました
              </CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                このままでは今月中に制限に達する可能性があります。
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="warning" size="sm">プランをアップグレード</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* LinkButton */}
      <section className="flex flex-col items-center gap-3 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          LinkButton
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {"<a> タグをボタンのように見せるコンポーネント。ページ遷移・外部リンクに使います。"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/hooks" variant="primary">useMemo ページへ</LinkButton>
          <LinkButton href="/hooks/use-callback" variant="outline">useCallback ページへ</LinkButton>
          <LinkButton href="https://nextjs.org" variant="secondary" target="_blank" rel="noopener noreferrer">
            Next.js 公式 ↗
          </LinkButton>
          <LinkButton href="#" variant="ghost">Ghost Link</LinkButton>
        </div>
      </section>

      {/* IconButton */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          IconButton
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          アイコンのみのボタン。aria-label で必ずアクセシビリティを担保します。
        </p>
        <div className="flex flex-wrap items-end justify-center gap-4">
          {/* Ghost variants */}
          <div className="flex items-center gap-2">
            <IconButton label="検索" variant="ghost" size="sm" icon={<span>🔍</span>} />
            <IconButton label="検索" variant="ghost" size="md" icon={<span>🔍</span>} />
            <IconButton label="検索" variant="ghost" size="lg" icon={<span>🔍</span>} />
          </div>
          {/* Semantic variants */}
          <div className="flex items-center gap-2">
            <IconButton label="追加" variant="success" icon={<span>＋</span>} />
            <IconButton label="削除" variant="danger" icon={<span>🗑</span>} />
            <IconButton label="編集" variant="outline" icon={<span>✏️</span>} />
            <IconButton label="設定" variant="secondary" icon={<span>⚙️</span>} />
          </div>
          {/* Disabled */}
          <div className="flex items-center gap-2">
            <IconButton label="無効" variant="primary" icon={<span>★</span>} disabled />
            <IconButton label="無効" variant="danger" icon={<span>🗑</span>} disabled />
          </div>
        </div>
      </section>

      {/* MediaCard */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          MediaCard
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <MediaCard className="w-72">
            <MediaCardMedia>
              <MediaCardImage
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                alt="山の風景"
              />
              <MediaCardBadge>風景</MediaCardBadge>
            </MediaCardMedia>
            <MediaCardBody>
              <MediaCardTitle>山と空の絶景</MediaCardTitle>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                澄み切った青空と雄大な山脈が広がる、息をのむような景色。
              </p>
            </MediaCardBody>
            <MediaCardFooter
              leading={<span className="text-xs text-zinc-400">2026.05.07</span>}
            >
              <LinkButton href="#" variant="outline" size="sm">詳細を見る</LinkButton>
            </MediaCardFooter>
          </MediaCard>

          <MediaCard className="w-72">
            <MediaCardMedia>
              <MediaCardImage
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
                alt="チームワーク"
              />
              <MediaCardBadge>テック</MediaCardBadge>
            </MediaCardMedia>
            <MediaCardBody>
              <MediaCardTitle>チームで作るプロダクト</MediaCardTitle>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                多様なスキルを持つメンバーが協力してプロダクトを構築する。
              </p>
            </MediaCardBody>
            <MediaCardFooter
              leading={<span className="text-xs text-zinc-400">2026.05.07</span>}
            >
              <IconButton label="いいね" variant="ghost" size="sm" icon={<span>♡</span>} />
              <LinkButton href="#" variant="primary" size="sm">読む</LinkButton>
            </MediaCardFooter>
          </MediaCard>
        </div>
      </section>

      {/* StatCard */}
      <section className="flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          StatCard
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
          <StatCard
            label="月間アクティブユーザー"
            value="12,430"
            description="先月比 +8.2%"
            trend="up"
            icon={<span>👥</span>}
          />
          <StatCard
            label="総売上"
            value="¥2,840,000"
            description="先月比 +3.1%"
            trend="up"
            icon={<span>💰</span>}
          />
          <StatCard
            label="解約率"
            value="2.4%"
            description="先月比 +0.3%"
            trend="down"
            icon={<span>📉</span>}
          />
          <StatCard
            label="平均応答時間"
            value="142ms"
            description="変化なし"
            trend="neutral"
            icon={<span>⚡</span>}
          />
        </div>
      </section>
    </div>
  );
}
