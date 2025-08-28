import { useState, useEffect } from 'react';
import { AdminSession } from '@/lib/types';
import { ADMIN_CREDENTIALS } from '@/lib/data/mockData';

export function useAdmin() {
  const [session, setSession] = useState<AdminSession>({
    isLoggedIn: false,
    loginTime: new Date(),
    expiresAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  // 초기 세션 확인
  useEffect(() => {
    const checkSession = () => {
      try {
        const adminSession = localStorage.getItem('reportvoice_admin_session');
        if (adminSession) {
          const parsedSession = JSON.parse(adminSession);
          const expiresAt = new Date(parsedSession.expiresAt);
          const loginTime = new Date(parsedSession.loginTime);
          
          if (parsedSession.isLoggedIn && new Date() < expiresAt) {
            setSession({
              isLoggedIn: true,
              loginTime,
              expiresAt
            });
          } else {
            // 만료된 세션 정리
            localStorage.removeItem('reportvoice_admin_session');
            setSession({
              isLoggedIn: false,
              loginTime: new Date(),
              expiresAt: new Date()
            });
          }
        }
      } catch (error) {
        console.error('세션 확인 실패:', error);
        localStorage.removeItem('reportvoice_admin_session');
        setSession({
          isLoggedIn: false,
          loginTime: new Date(),
          expiresAt: new Date()
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // 세션 만료 체크를 위한 간격 설정 (1분마다)
    const interval = setInterval(checkSession, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // 로그인
  const login = async (username: string, password: string): Promise<boolean> => {
    // 인증 확인
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return false;
    }

    const loginTime = new Date();
    const expiresAt = new Date(loginTime.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일 후

    const newSession: AdminSession = {
      isLoggedIn: true,
      loginTime,
      expiresAt
    };

    // 세션 저장
    localStorage.setItem('reportvoice_admin_session', JSON.stringify({
      isLoggedIn: true,
      loginTime: loginTime.toISOString(),
      expiresAt: expiresAt.toISOString()
    }));

    setSession(newSession);
    return true;
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('reportvoice_admin_session');
    setSession({
      isLoggedIn: false,
      loginTime: new Date(),
      expiresAt: new Date()
    });
  };

  // 세션 연장
  const extendSession = () => {
    if (!session.isLoggedIn) return false;

    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 연장
    const extendedSession: AdminSession = {
      ...session,
      expiresAt: newExpiresAt
    };

    localStorage.setItem('reportvoice_admin_session', JSON.stringify({
      isLoggedIn: true,
      loginTime: session.loginTime.toISOString(),
      expiresAt: newExpiresAt.toISOString()
    }));

    setSession(extendedSession);
    return true;
  };

  // 세션 유효성 확인
  const isValidSession = (): boolean => {
    return session.isLoggedIn && new Date() < session.expiresAt;
  };

  // 남은 시간 계산 (밀리초)
  const getTimeRemaining = (): number => {
    if (!session.isLoggedIn) return 0;
    return Math.max(0, session.expiresAt.getTime() - new Date().getTime());
  };

  // 남은 시간을 문자열로 포맷
  const getTimeRemainingFormatted = (): string => {
    const remaining = getTimeRemaining();
    if (remaining <= 0) return '만료됨';

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}일 ${hours}시간`;
    if (hours > 0) return `${hours}시간 ${minutes}분`;
    return `${minutes}분`;
  };

  return {
    session,
    isLoading,
    isLoggedIn: session.isLoggedIn,
    login,
    logout,
    extendSession,
    isValidSession,
    getTimeRemaining,
    getTimeRemainingFormatted
  };
}