import { FeedbackItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Image, Video } from 'lucide-react';
import Link from 'next/link';

interface FeedbackCardProps {
  feedback: FeedbackItem;
  onVote: (id: string) => void;
  isVoted: boolean;
}

export function FeedbackCard({ feedback, onVote, isVoted }: FeedbackCardProps) {
  const getTypeColor = (type: FeedbackItem['type']) => {
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

  const getTypeLabel = (type: FeedbackItem['type']) => {
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

  const hasImages = feedback.files?.some(f => f.type === 'image');
  const hasVideos = feedback.files?.some(f => f.type === 'video');

  return (
    <Link href={`/feedback/${feedback.id}`} className="block">
      <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 hover:border-blue-200 group cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Badge className={`${getTypeColor(feedback.type)} border-0 group-hover:scale-105 transition-transform`}>
              {getTypeLabel(feedback.type)}
            </Badge>
            {feedback.status === 'resolved' && (
              <Badge variant="outline" className="text-green-600 border-green-600 group-hover:scale-105 transition-transform">
                해결완료
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 cursor-pointer line-clamp-1 transition-colors">
            {feedback.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {feedback.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
              <span className="flex items-center gap-1">
                👤 {feedback.author}
              </span>
              <div className="flex items-center gap-2">
                {hasImages && <Image size={16} className="text-blue-500" />}
                {hasVideos && <Video size={16} className="text-green-500" />}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isVoted ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onVote(feedback.id);
                }}
                className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isVoted 
                    ? "bg-red-500 hover:bg-red-600 border-red-500" 
                    : "hover:border-red-300 hover:text-red-600"
                }`}
              >
                <Heart 
                  size={16} 
                  className={`transition-all duration-200 ${
                    isVoted ? "fill-current animate-pulse" : "hover:fill-red-200"
                  }`} 
                />
                <span className="font-medium">{feedback.votes}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}