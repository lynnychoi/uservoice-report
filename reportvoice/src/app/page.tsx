'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FeedbackCard } from '@/components/feedback/FeedbackCard';
import { CardSkeleton } from '@/components/ui/skeleton';
import { FeedbackType, SortOption } from '@/lib/types';
import { useFeedback } from '@/hooks/useFeedback';
import { useResponsiveToast } from '@/hooks/useResponsiveToast';
import { Search, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

type FilterTab = 'all' | FeedbackType | 'resolved';

export default function Home() {
  const { 
    isLoading, 
    toggleVote, 
    isVoted, 
    getFilteredFeedbacks 
  } = useFeedback();
  const { toastPosition } = useResponsiveToast();
  
  const [currentTab, setCurrentTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const filteredFeedbacks = getFilteredFeedbacks(currentTab, searchQuery, sortOption);

  // 로딩 스켈레톤 UI 개선
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position={toastPosition as 'top-center' | 'top-right'} />
        
        {/* 헤더 스켈레톤 */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-3">
          {/* 검색바 스켈레톤 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* 탭 스켈레톤 */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* 카드 스켈레톤 */}
          <div className="grid gap-6">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position={toastPosition as 'top-center' | 'top-right'} />
      
      {/* 헤더 개선 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              사용자 목소리
            </h1>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/create">
                <Button className="flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <Plus size={16} />
                  의견 작성
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="icon" className="hover:bg-gray-100">
                  <Settings size={16} />
                </Button>
              </Link>
            </div>
            
            {/* 모바일 관리자 버튼 */}
            <div className="md:hidden">
              <Link href="/admin/login">
                <Button variant="outline" size="icon" className="hover:bg-gray-100">
                  <Settings size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* FAB 버튼 (모바일 전용) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Link href="/create">
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-14 h-14 hover:scale-105">
            <Plus size={24} />
          </Button>
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-3">
        {/* 검색 및 정렬 개선 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="정렬 방식" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">📅 최신순</SelectItem>
              <SelectItem value="votes">❤️ 투표순</SelectItem>
              <SelectItem value="popular">🔥 인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 탭 필터 개선 (모바일 스크롤) */}
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as FilterTab)}>
          <div className="mb-6 overflow-x-auto">
            <TabsList className="flex w-max min-w-full justify-start md:justify-center">
              <TabsTrigger value="all" className="whitespace-nowrap">
                전체
              </TabsTrigger>
              <TabsTrigger value="feedback" className="whitespace-nowrap">
                피드백
              </TabsTrigger>
              <TabsTrigger value="idea" className="whitespace-nowrap">
                아이디어
              </TabsTrigger>
              <TabsTrigger value="error" className="whitespace-nowrap">
                에러
              </TabsTrigger>
              <TabsTrigger value="resolved" className="whitespace-nowrap">
                해결완료
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={currentTab}>
            {filteredFeedbacks.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  {searchQuery ? (
                    <>
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        검색 결과가 없습니다
                      </h3>
                      <p className="text-gray-500 mb-4">
                        &quot;{searchQuery}&quot;에 대한 결과를 찾을 수 없어요
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery('')}
                        className="hover:bg-gray-50"
                      >
                        검색어 지우기
                      </Button>
                    </>
                  ) : currentTab === 'resolved' ? (
                    <>
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        해결된 의견이 아직 없어요
                      </h3>
                      <p className="text-gray-500">
                        관리자가 처리한 의견들이 여기에 표시됩니다
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">💭</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        첫 번째 의견을 남겨주세요!
                      </h3>
                      <p className="text-gray-500 mb-6">
                        여러분의 소중한 의견을 기다리고 있어요
                      </p>
                      <Link href="/create">
                        <Button className="shadow-sm hover:shadow-md transition-shadow">
                          <Plus size={16} className="mr-2" />
                          의견 작성하기
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredFeedbacks.map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    onVote={toggleVote}
                    isVoted={isVoted(feedback.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}