'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FeedbackItem, FeedbackType } from '@/lib/types';
import { useFeedback } from '@/hooks/useFeedback';
import { useAdmin } from '@/hooks/useAdmin';
import { ArrowLeft, Heart, Image, Video, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const feedbackId = params.id as string;
  
  const { 
    getFeedbackById, 
    toggleVote, 
    isVoted, 
    deleteFeedback, 
    resolveFeedback,
    isLoading
  } = useFeedback();
  const { isLoggedIn: isAdmin } = useAdmin();
  
  const [feedback, setFeedback] = useState<FeedbackItem | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // 피드백 찾기
      const foundFeedback = getFeedbackById(feedbackId);
      if (foundFeedback) {
        setFeedback(foundFeedback);
      } else {
        router.push('/');
      }
    }
  }, [feedbackId, getFeedbackById, router, isLoading]);

  if (isLoading || !feedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 삭제 처리
  const handleDelete = () => {
    deleteFeedback(feedback.id);
    toast.success('의견이 삭제되었습니다');
    setShowDeleteDialog(false);
    router.push('/');
  };

  // 해결 처리
  const handleResolve = () => {
    resolveFeedback(feedback.id);
    setFeedback(prev => prev ? { ...prev, status: 'resolved', updatedAt: new Date() } : null);
    toast.success('의견이 해결 완료로 처리되었습니다');
    setShowResolveDialog(false);
  };

  const getTypeColor = (type: FeedbackType) => {
    switch (type) {
      case 'feedback':
        return 'bg-blue-100 text-blue-800';
      case 'idea':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: FeedbackType) => {
    switch (type) {
      case 'feedback':
        return '피드백';
      case 'idea':
        return '아이디어';
      case 'error':
        return '에러';
      default:
        return type;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

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
            <h1 className="text-2xl font-bold text-gray-900">의견 상세</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-3">
        <Card>
          <CardContent className="p-8">
            {/* 헤더 정보 */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Badge className={`${getTypeColor(feedback.type)} border-0`}>
                  {getTypeLabel(feedback.type)}
                </Badge>
                {feedback.status === 'resolved' && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    해결완료
                  </Badge>
                )}
              </div>
              
              {/* 관리자 액션 */}
              {isAdmin && feedback.status === 'active' && (
                <div className="flex gap-2">
                  <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                        <CheckCircle size={16} className="mr-1" />
                        해결완료
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>해결완료 처리</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>이 의견을 해결완료로 처리하시겠습니까?</p>
                        <p className="text-sm text-gray-500 mt-2">해결완료된 의견은 &apos;해결완료&apos; 탭으로 이동됩니다.</p>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
                          취소
                        </Button>
                        <Button onClick={handleResolve} className="bg-green-600 hover:bg-green-700">
                          해결완료 처리
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <Trash2 size={16} className="mr-1" />
                        삭제
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>의견 삭제</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>정말로 이 의견을 삭제하시겠습니까?</p>
                        <p className="text-sm text-gray-500 mt-2">삭제된 의견은 복구할 수 없습니다.</p>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                          취소
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          삭제
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {/* 제목 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {feedback.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-2 text-sm text-gray-500 mb-6 md:flex-row md:items-center md:gap-4">
              <span>작성자: {feedback.author}</span>
              <span>작성일: {formatDate(feedback.createdAt)}</span>
              {feedback.status === 'resolved' && (
                <span>해결일: {formatDate(feedback.updatedAt)}</span>
              )}
            </div>

            {/* 내용 */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {feedback.content}
              </p>
            </div>

            {/* 첨부파일 */}
            {feedback.files && feedback.files.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">첨부파일</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedback.files.map((file, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-3">
                        {file.type === 'image' ? (
                          <Image size={24} className="text-blue-500" />
                        ) : (
                          <Video size={24} className="text-green-500" />
                        )}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.mimeType}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 투표 섹션 */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2">
                <Button
                  variant={isVoted(feedback.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleVote(feedback.id)}
                  className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isVoted(feedback.id) 
                      ? "bg-red-500 hover:bg-red-600 border-red-500" 
                      : "hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={`transition-all duration-200 ${
                      isVoted(feedback.id) ? "fill-current animate-pulse" : "hover:fill-red-200"
                    }`} 
                  />
                  <span className="font-medium">{feedback.votes}</span>
                </Button>
                
                <Link href="/">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowLeft size={16} />
                    목록
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}