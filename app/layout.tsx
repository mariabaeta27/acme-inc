import "./global.css";

export const metadata = {
  title: "Acme Inc",
  description: "E commerce Acme Inc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
