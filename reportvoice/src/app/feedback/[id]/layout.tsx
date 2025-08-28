export function generateStaticParams() {
  // 미리 생성할 기본 ID들
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}