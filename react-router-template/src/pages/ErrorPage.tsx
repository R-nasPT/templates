import { Button } from '@/shared/components/ui/Button';
import { ButtonStyled } from '@/shared/components/ui/ButtonStyled';
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorInfo = () => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        message: error.statusText || 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
      };
    }

    if (error instanceof Error) {
      const status = error.message.match(/status code (\d+)/)?.[1];
      return {
        status: status ? Number(status) : 500,
        message: error.message,
      };
    }

    return {
      status: 500,
      message: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
    };
  };

  const { status, message } = getErrorInfo();

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
        <div className="mb-4 text-9xl font-bold text-blue-600 dark:text-blue-400">
          {status}
        </div>

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/50">
            <AlertCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          เกิดข้อผิดพลาด
        </h1>
        <p className="mb-8 line-clamp-2 text-gray-600 dark:text-gray-400">
          {message}
        </p>

        <div className="mb-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonStyled
            variant="solid-blue"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 size-4" />
            ลองใหม่อีกครั้ง
          </ButtonStyled>
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 size-4" />
            ย้อนกลับ
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-gray-600 dark:text-gray-400"
        >
          <Home className="mr-2 size-4" />
          กลับหน้าหลัก
        </Button>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          หากปัญหานี้เกิดขึ้นซ้ำ กรุณาติดต่อฝ่ายสนับสนุน
        </p>
      </div>
    </div>
  );
}
