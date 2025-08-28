'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/hooks/useAdmin';
import { ArrowLeft, Eye, EyeOff, LogOut } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { 
    isLoggedIn, 
    isLoading, 
    session, 
    login, 
    logout, 
    getTimeRemainingFormatted 
  } = useAdmin();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 시뮬레이션 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = await login(credentials.username, credentials.password);
    
    if (success) {
      toast.success('로그인되었습니다');
      
      // 2초 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      toast.error('아이디 또는 비밀번호가 올바르지 않습니다');
    }
    
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다');
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">관리자</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isLoggedIn ? '관리자 대시보드' : '관리자 로그인'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              // 로그인된 상태
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-green-600 font-medium">로그인 성공</p>
                  <p className="text-sm text-gray-500 mt-1">관리자 권한이 활성화되었습니다</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">로그인 시간:</span>
                    <span className="font-medium">
                      {formatDate(session.loginTime.toISOString())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">남은 시간:</span>
                    <span className="font-medium">
                      {getTimeRemainingFormatted()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/" className="w-full">
                    <Button className="w-full">
                      의견 관리하러 가기
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    로그아웃
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>• 관리자는 의견을 삭제하거나 해결완료 처리할 수 있습니다</p>
                  <p>• 세션은 7일 후 자동 만료됩니다</p>
                </div>
              </div>
            ) : (
              // 로그인 폼
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    아이디
                  </label>
                  <Input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="관리자 아이디를 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '로그인 중...' : '로그인'}
                </Button>

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>관리자 테스트 계정:</p>
                  <p>아이디: <code className="bg-gray-100 px-1 rounded">admin</code></p>
                  <p>비밀번호: <code className="bg-gray-100 px-1 rounded">admin123!</code></p>
                </div>
              </form>
            )}
          </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}