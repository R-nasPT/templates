import { ThemeProvider } from './ThemeProvider';
import QueryProvider from './QueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
