import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { ButtonStyled } from '@/shared/components/ui/ButtonStyled';
import { Button } from '@/shared/components/ui/Button';
import { initKeycloak } from '@/shared/service/api/keycloak';

export default function LoginErrorPage() {
  const handleRetry = async () => {
    try {
      await initKeycloak();
      window.location.href = '/';
    } catch (error) {
      console.error('Retry login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-4 dark:bg-red-950/30">
            <AlertCircle className="h-16 w-16 text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            เข้าสู่ระบบไม่สำเร็จ
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ไม่สามารถยืนยันตัวตนของคุณได้ กรุณาลองใหม่อีกครั้ง
            หรือติดต่อผู้ดูแลระบบหากปัญหายังคงอยู่
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonStyled variant="solid-blue" onClick={handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            ลองอีกครั้ง
          </ButtonStyled>
          <Button
            variant="outline"
            render={
              <Link to="/demo">
                <Home className="mr-2 h-4 w-4" />
                กลับหน้าหลัก
              </Link>
            }
          ></Button>
        </div>

        {/* Additional Info */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            สาเหตุที่เป็นไปได้:
          </p>
          <ul className="space-y-1 text-left text-gray-600 dark:text-gray-400">
            <li>• Session หมดอายุ</li>
            <li>• การเชื่อมต่อขาดหาย</li>
            <li>• ไม่มีสิทธิ์เข้าถึงระบบ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
