import { useMemo } from 'react';
import { SidebarTrigger } from '../sidebar/Sidebar';
import { useLocation } from 'react-router';
import {
  KNOWN_ACTIONS,
  RESOURCE_PATTERNS,
  ROUTE_LABELS,
} from '../constants/navbar.constants';
import { Separator } from '@/shared/components/ui/Separator';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/DropdownMenu';
import { BlockedLink } from '@/shared/components/common/BlockedLink';
import NavbarActions from './NavbarActions';

export default function Navbar() {
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const searchByPath = (location.state?.searchByPath || {}) as Record<string, string>;
    const items = [];

    items.push({
      label: 'Home',
      path: '/',
      isLast: paths.length === 0,
    });

    paths.forEach((segment, index) => {
      const decodedSegment = decodeURIComponent(segment);
      const basePath = '/' + paths.slice(0, index + 1).join('/');

      const savedSearch = searchByPath[basePath] || '';
      const path = basePath + savedSearch;
      
      const previousSegment = index > 0 ? decodeURIComponent(paths[index - 1]) : undefined;

      let label;

      const isIdSegment =
        previousSegment &&
        RESOURCE_PATTERNS.includes(previousSegment) &&
        !KNOWN_ACTIONS.includes(decodedSegment) &&
        !ROUTE_LABELS[decodedSegment as keyof typeof ROUTE_LABELS];

      if (isIdSegment) {
        const displayId =
          decodedSegment.length > 16 ? `${decodedSegment.slice(0, 16)}...` : decodedSegment;
        label = `#${displayId}`;
      } else {
        label =
          ROUTE_LABELS[decodedSegment as keyof typeof ROUTE_LABELS] ||
          decodedSegment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }

      items.push({
        label,
        path,
        isLast: index === paths.length - 1,
      });
    });

    return items;
  }, [location.pathname]);

  const shouldCollapse = breadcrumbItems.length > 3;
  const visibleItems = shouldCollapse
    ? [breadcrumbItems[0], null, ...breadcrumbItems.slice(-2)]
    : breadcrumbItems;

  const hiddenItems = shouldCollapse ? breadcrumbItems.slice(1, -2) : [];

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center gap-2 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <Separator
            orientation="vertical"
            className="mr-2 shrink-0 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb className="hidden min-w-0 flex-1 md:block">
            <BreadcrumbList>
              {visibleItems.map((item) => {
                if (item === null) {
                  return (
                    <div key="ellipsis" className="flex items-center gap-2">
                      <BreadcrumbItem>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1">
                            <BreadcrumbEllipsis className="size-4" />
                            <span className="sr-only">Toggle menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {hiddenItems.map((hiddenItem) => (
                              <DropdownMenuItem key={hiddenItem.path}>
                                <BlockedLink to={hiddenItem.path}>
                                  {hiddenItem.label}
                                </BlockedLink>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </div>
                  );
                }

                return (
                  <div key={item.path} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      {item.isLast ? (
                        <BreadcrumbPage className="line-clamp-1">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          render={
                            <BlockedLink
                              to={item.path}
                              className="line-clamp-1"
                            >
                              {item.label}
                            </BlockedLink>
                          }
                        ></BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!item.isLast && (
                      <BreadcrumbSeparator className="shrink-0" />
                    )}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="min-w-0 flex-1 md:hidden">
            <p className="truncate text-sm font-medium">
              {breadcrumbItems[breadcrumbItems.length - 1]?.label}
            </p>
          </div>
        </div>

        <NavbarActions />
      </div>
    </header>
  );
}
