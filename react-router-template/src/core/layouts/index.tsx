import { Outlet, useLocation } from 'react-router';
import { AppSidebar } from './sidebar/AppSidebar';
import { SidebarInset, SidebarProvider } from './sidebar/Sidebar';
import { Toaster } from './Sonner';
import { NO_LAYOUT_CONFIG } from './constants/no-layout.constants';
import Navbar from './navbar';
import NavigationProgress from './NavigationProgress';

const shouldHideLayout = (pathname: string) => {
  const decodedPathname = decodeURIComponent(pathname);

  return NO_LAYOUT_CONFIG.some((config) => {
    if (config.type === 'exact') {
      return decodedPathname === config.path;
    }

    if (config.type === 'pattern') {
      return config.pattern.test(decodedPathname);
    }

    return false;
  });
};

export default function RootLayout() {
  const location = useLocation();

  const hideLayout = shouldHideLayout(location.pathname);

  if (hideLayout) {
    return (
      <>
        <NavigationProgress />
        <Toaster />
        <Outlet />
      </>
    );
  }

  return (
    <SidebarProvider>
      <NavigationProgress />
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <Toaster />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
