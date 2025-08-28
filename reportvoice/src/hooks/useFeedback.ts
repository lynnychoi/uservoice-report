import { useState, useEffect } from 'react';
import { FeedbackItem, VoteRecord, SortOption, FeedbackType } from '@/lib/types';
import { mockFeedbacks, mockVotes } from '@/lib/data/mockData';
import toast from 'react-hot-toast';

type FilterTab = 'all' | FeedbackType | 'resolved';

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드 및 캐시에서 복원
  useEffect(() => {
    const loadData = () => {
      try {
        // 캐시된 피드백 로드
        const cachedFeedbacks = localStorage.getItem('reportvoice_feedbacks');
        const cachedVotes = localStorage.getItem('reportvoice_votes');
        
        if (cachedFeedbacks && cachedVotes) {
          setFeedbacks(JSON.parse(cachedFeedbacks));
          setVotes(JSON.parse(cachedVotes));
        } else {
          // 초기 데이터 설정
          setFeedbacks(mockFeedbacks);
          setVotes(mockVotes);
          
          // 로컬스토리지에 저장
          localStorage.setItem('reportvoice_feedbacks', JSON.stringify(mockFeedbacks));
          localStorage.setItem('reportvoice_votes', JSON.stringify(mockVotes));
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setFeedbacks(mockFeedbacks);
        setVotes(mockVotes);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 데이터 변경 시 자동 캐싱
  useEffect(() => {
    if (!isLoading && feedbacks.length > 0) {
      localStorage.setItem('reportvoice_feedbacks', JSON.stringify(feedbacks));
    }
  }, [feedbacks, isLoading]);

  useEffect(() => {
    if (!isLoading && votes.length >= 0) {
      localStorage.setItem('reportvoice_votes', JSON.stringify(votes));
    }
  }, [votes, isLoading]);

  // 사용자 식별자 생성
  const getUserIdentifier = (): string => {
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('reportvoice_user_id');
      if (!userId) {
        userId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('reportvoice_user_id', userId);
      }
      return userId;
    }
    return 'anonymous';
  };

  // 새 피드백 추가
  const addFeedback = (feedbackData: {
    type: FeedbackType;
    title: string;
    content: string;
    author: string;
    files?: File[];
  }) => {
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      type: feedbackData.type,
      title: feedbackData.title,
      content: feedbackData.content,
      author: feedbackData.author,
      files: feedbackData.files?.map((file, index) => ({
        id: `${Date.now()}_${index}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: URL.createObjectURL(file),
        mimeType: file.type as 'image/jpeg' | 'image/png' | 'video/mp4',
        size: file.size
      })),
      votes: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    return newFeedback;
  };

  // 피드백 삭제
  const deleteFeedback = (feedbackId: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== feedbackId));
    setVotes(prev => prev.filter(v => v.feedbackId !== feedbackId));
  };

  // 피드백 해결 처리
  const resolveFeedback = (feedbackId: string) => {
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === feedbackId
          ? { ...feedback, status: 'resolved' as const, updatedAt: new Date() }
          : feedback
      )
    );
  };

  // 투표 처리
  const toggleVote = (feedbackId: string) => {
    const userIdentifier = getUserIdentifier();
    const existingVote = votes.find(
      vote => vote.feedbackId === feedbackId && vote.userIdentifier === userIdentifier
    );

    if (existingVote) {
      // 투표 취소
      setVotes(prev =>
        prev.filter(vote =>
          !(vote.feedbackId === feedbackId && vote.userIdentifier === userIdentifier)
        )
      );
      setFeedbacks(prev =>
        prev.map(feedback =>
          feedback.id === feedbackId
            ? { ...feedback, votes: Math.max(0, feedback.votes - 1) }
            : feedback
        )
      );
      toast.success('투표가 취소되었습니다');
      return false;
    } else {
      // 새 투표
      const newVote: VoteRecord = {
        feedbackId,
        userIdentifier,
        votedAt: new Date()
      };
      setVotes(prev => [...prev, newVote]);
      setFeedbacks(prev =>
        prev.map(feedback =>
          feedback.id === feedbackId
            ? { ...feedback, votes: feedback.votes + 1 }
            : feedback
        )
      );
      toast.success('투표가 완료되었습니다');
      return true;
    }
  };

  // 투표 여부 확인
  const isVoted = (feedbackId: string): boolean => {
    const userIdentifier = getUserIdentifier();
    return votes.some(
      vote => vote.feedbackId === feedbackId && vote.userIdentifier === userIdentifier
    );
  };

  // 피드백 필터링 및 정렬
  const getFilteredFeedbacks = (
    tab: FilterTab = 'all',
    searchQuery: string = '',
    sortOption: SortOption = 'latest'
  ): FeedbackItem[] => {
    let filtered = [...feedbacks];

    // 탭 필터링
    if (tab === 'resolved') {
      filtered = filtered.filter(feedback => feedback.status === 'resolved');
    } else if (tab !== 'all') {
      filtered = filtered.filter(feedback =>
        feedback.type === tab && feedback.status === 'active'
      );
    } else {
      // 전체 탭에서는 해결완료 제외
      filtered = filtered.filter(feedback => feedback.status === 'active');
    }

    // 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(feedback =>
        feedback.title.toLowerCase().includes(query) ||
        feedback.content.toLowerCase().includes(query) ||
        feedback.author.toLowerCase().includes(query)
      );
    }

    // 정렬
    switch (sortOption) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'votes':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'popular':
        // 투표수와 최신순 조합
        filtered.sort((a, b) => {
          if (b.votes !== a.votes) return b.votes - a.votes;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        break;
    }

    return filtered;
  };

  // 피드백 찾기
  const getFeedbackById = (id: string): FeedbackItem | null => {
    return feedbacks.find(feedback => feedback.id === id) || null;
  };

  return {
    feedbacks,
    votes,
    isLoading,
    addFeedback,
    deleteFeedback,
    resolveFeedback,
    toggleVote,
    isVoted,
    getFilteredFeedbacks,
    getFeedbackById
  };
}