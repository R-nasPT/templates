import { Link, type LinkProps } from 'react-router';
import { useNavigationBlockStore } from '@/shared/stores/navigationBlock.store';

interface BlockedLinkProps extends LinkProps  {
  children: React.ReactNode;
};

export function BlockedLink({ to, children, onClick, ...props }: BlockedLinkProps) {
  const { isBlocked, onBlockedNavigate } = useNavigationBlockStore();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isBlocked) {
      e.preventDefault();
      onBlockedNavigate?.();
      return;
    }
    onClick?.(e);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}