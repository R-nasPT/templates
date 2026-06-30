import { useAuthStore } from '@/core/stores/auth.store';
import { Button } from '@/shared/components/ui/Button';
import { ButtonStyled } from '@/shared/components/ui/ButtonStyled';
import { ArrowLeft, Home, LogOut, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleGoBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4 dark:bg-blue-950/30">
      <div className="w-full max-w-md text-center">
        {/* 404 Number */}
        <div className="mb-4 text-9xl font-bold text-blue-600 dark:text-blue-400">
          404
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/50">
            <Search className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Content */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          ไม่พบหน้าที่คุณต้องการ
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          ขอโทษด้วย หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบ หรือไม่เคยมีอยู่จริง
        </p>

        {/* Actions */}
        <div className="mb-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonStyled
            variant="solid-blue"
            render={
              <Link to="/">
                <Home className="mr-2 size-4" />
                กลับหน้าหลัก
              </Link>
            }
          ></ButtonStyled>
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 size-4" />
            ย้อนกลับ
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={logout}
          className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
        >
          <LogOut className="mr-2 size-4" />
          ออกจากระบบ
        </Button>

        {/* Additional Info */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          หากคุณคิดว่านี่เป็นข้อผิดพลาด กรุณาติดต่อฝ่ายสนับสนุน
        </p>
      </div>
    </div>
  );
}
