export const metadata = {
  title: '今日の運勢占い',
  description: 'あなたの運勢を占います',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
