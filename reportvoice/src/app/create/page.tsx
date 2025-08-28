'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedbackType, CreateFeedbackForm } from '@/lib/types';
import { useFeedback } from '@/hooks/useFeedback';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';
import { Tags, TagsTrigger, TagsValue, TagsContent, TagsList, TagsItem } from '@/components/ui/tags';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateFeedbackPage() {
  const router = useRouter();
  const { addFeedback } = useFeedback();
  const [form, setForm] = useState<CreateFeedbackForm>({
    type: 'feedback',
    title: '',
    content: '',
    author: '',
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (form.files.length + acceptedFiles.length > 3) {
      toast.error('최대 3개 파일까지만 업로드 가능합니다');
      return;
    }
    setForm(prev => ({
      ...prev,
      files: [...prev.files, ...acceptedFiles]
    }));
  };

  const handleDropError = (error: Error) => {
    if (error.message.includes('invalid')) {
      toast.error('JPG, PNG, MP4 파일만 업로드 가능합니다');
    } else {
      toast.error('파일 업로드에 실패했습니다');
    }
  };

  const removeFile = (index: number) => {
    setForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!form.author.trim()) {
      toast.error('이름을 입력해주세요');
      return false;
    }
    if (form.author.length > 10) {
      toast.error('이름은 10자 이내로 입력해주세요');
      return false;
    }
    if (!form.title.trim()) {
      toast.error('제목을 입력해주세요');
      return false;
    }
    if (form.title.length > 40) {
      toast.error('제목은 40자 이내로 입력해주세요');
      return false;
    }
    if (!form.content.trim()) {
      toast.error('내용을 입력해주세요');
      return false;
    }
    if (form.content.length > 500) {
      toast.error('내용은 500자 이내로 입력해주세요');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 피드백 추가
      addFeedback({
        type: form.type,
        title: form.title,
        content: form.content,
        author: form.author,
        files: form.files
      });
      
      toast.success('의견이 성공적으로 등록되었습니다!');
      
      // 1초 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch {
      toast.error('등록 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = (type: FeedbackType) => {
    switch (type) {
      case 'feedback':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'idea':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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

  const getTypeDescription = (type: FeedbackType) => {
    switch (type) {
      case 'feedback':
        return '서비스 개선 의견';
      case 'idea':
        return '새로운 기능 제안';
      case 'error':
        return '버그 및 오류 신고';
      default:
        return '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            <h1 className="text-2xl font-bold text-gray-900">의견 작성</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-3">
        <Card>
          <CardHeader>
            <CardTitle>새로운 의견을 들려주세요</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 카테고리 선택 */}
              <div>
                <label className="block text-sm font-medium mb-3">카테고리</label>
                <Tags 
                  value={form.type} 
                  setValue={(value) => setForm(prev => ({ ...prev, type: value as FeedbackType }))}
                >
                  <TagsTrigger>
                    {form.type && (
                      <TagsValue className={getTypeColor(form.type)}>
                        {getTypeLabel(form.type)}
                      </TagsValue>
                    )}
                  </TagsTrigger>
                  <TagsContent>
                    <TagsList>
                      {(['feedback', 'idea', 'error'] as FeedbackType[]).map((type) => (
                        <TagsItem
                          key={type}
                          value={type}
                          onSelect={() => {
                            setForm(prev => ({ ...prev, type }));
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Badge className={`${getTypeColor(type)} border-0`}>
                              {getTypeLabel(type)}
                            </Badge>
                            <span>{getTypeDescription(type)}</span>
                          </div>
                        </TagsItem>
                      ))}
                    </TagsList>
                  </TagsContent>
                </Tags>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="이름을 입력하세요 (10자 이내)"
                  maxLength={10}
                />
                <p className="text-sm text-gray-500 mt-1">{form.author.length}/10자</p>
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="제목을 입력하세요 (40자 이내)"
                  maxLength={40}
                />
                <p className="text-sm text-gray-500 mt-1">{form.title.length}/40자</p>
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  내용 <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="자세한 내용을 입력하세요 (500자 이내)"
                  rows={6}
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">{form.content.length}/500자</p>
              </div>

              {/* 파일 업로드 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  첨부파일 (선택사항)
                </label>
                
                <Dropzone
                  accept={{
                    'image/jpeg': [],
                    'image/png': [],
                    'video/mp4': []
                  }}
                  maxFiles={3}
                  onDrop={handleFileDrop}
                  onError={handleDropError}
                  src={form.files}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>

                {/* 업로드된 파일 목록 */}
                {form.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {form.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? '등록 중...' : '의견 등록'}
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline">
                    취소
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}