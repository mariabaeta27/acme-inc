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
      <body className="bg-white">
        <div className="h-auto w-width-100vw p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
