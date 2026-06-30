import { Navigate } from 'react-router';

export default function RootRedirectPage() {
  return <Navigate to="/demo" replace />;
}
