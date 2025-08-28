import { FeedbackItem, VoteRecord, MediaFile } from '../types';

export const mockMediaFiles: MediaFile[] = [
  {
    id: '1',
    name: 'screenshot.png',
    type: 'image',
    url: '/images/screenshot1.png',
    mimeType: 'image/png',
    size: 1024000
  },
  {
    id: '2', 
    name: 'error-video.mp4',
    type: 'video',
    url: '/videos/error-demo.mp4',
    mimeType: 'video/mp4',
    size: 5120000
  }
];

export const mockFeedbacks: FeedbackItem[] = [
  {
    id: '1',
    type: 'feedback',
    title: '사용자 인터페이스 개선 제안 💡',
    content: '현재 메인 페이지의 네비게이션이 조금 복잡해서 처음 사용하는 사용자들이 헤맬 수 있을 것 같습니다. 더 직관적인 메뉴 구조로 개선해주시면 좋을 것 같아요!',
    author: '김철수',
    votes: 23,
    status: 'active',
    files: [mockMediaFiles[0]],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    type: 'error',
    title: '로그인 페이지에서 오류 발생 🚨',
    content: '로그인 버튼을 클릭했을 때 간헐적으로 서버 오류가 발생합니다. 특히 모바일 환경에서 자주 발생하는 것 같아요. 첨부한 스크린샷을 참고해주세요.',
    author: '박영희',
    votes: 18,
    status: 'active',
    files: [mockMediaFiles[0], mockMediaFiles[1]],
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T14:20:00')
  },
  {
    id: '3',
    type: 'idea',
    title: '다크 모드 지원 요청 🌙',
    content: '최근에 다크 모드를 사용하는 사용자들이 많아지고 있는데, 우리 서비스도 다크 모드를 지원하면 어떨까요? 야간에 사용할 때 눈의 피로도를 줄일 수 있을 것 같습니다.',
    author: '이민수',
    votes: 45,
    status: 'active',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00')
  },
  {
    id: '4',
    type: 'feedback',
    title: '검색 기능 속도 개선 완료 ✅',
    content: '이전에 제안했던 검색 기능 속도 개선이 반영되었네요! 이제 훨씬 빠르게 검색 결과가 나옵니다. 감사합니다!',
    author: '정수진',
    votes: 12,
    status: 'resolved',
    createdAt: new Date('2024-01-12T16:45:00'),
    updatedAt: new Date('2024-01-16T11:20:00')
  },
  {
    id: '5',
    type: 'error',
    title: '파일 업로드 실패 문제',
    content: '10MB 이상의 파일을 업로드할 때 실패하는 경우가 있습니다. 프로그레스바는 100%까지 올라가는데 결국 실패 메시지가 나타납니다.',
    author: '최동훈',
    votes: 8,
    status: 'active',
    createdAt: new Date('2024-01-11T13:30:00'),
    updatedAt: new Date('2024-01-11T13:30:00')
  },
  {
    id: '6',
    type: 'idea',
    title: '키보드 단축키 기능 추가',
    content: 'Ctrl+S로 저장, Ctrl+Z로 실행 취소 등 기본적인 키보드 단축키를 지원하면 파워 유저들이 더 효율적으로 작업할 수 있을 것 같습니다.',
    author: '홍길동',
    votes: 31,
    status: 'active',
    createdAt: new Date('2024-01-10T11:00:00'),
    updatedAt: new Date('2024-01-10T11:00:00')
  }
];

export const mockVotes: VoteRecord[] = [
  {
    feedbackId: '1',
    userIdentifier: '192.168.1.1',
    votedAt: new Date('2024-01-15T11:00:00')
  },
  {
    feedbackId: '3',
    userIdentifier: '192.168.1.1', 
    votedAt: new Date('2024-01-13T10:00:00')
  }
];

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123!'
};