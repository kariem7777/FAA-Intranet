import { X, Calendar, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsDetailModalProps {
  news: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    time: string;
    category: string;
    image?: string;
    author?: string;
  };
  onClose: () => void;
}

export function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Category Badge */}
          <Badge className="mb-4 bg-[#ec2227]">{news.category}</Badge>

          {/* Title */}
          <h2 className="mb-4">{news.title}</h2>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{news.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{news.time}</span>
            </div>
            {news.author && (
              <div className="flex items-center gap-2">
                <span>By {news.author}</span>
              </div>
            )}
          </div>

          {/* Image */}
          {news.image && (
            <div className="rounded-lg overflow-hidden mb-6">
              <ImageWithFallback
                src={news.image}
                alt={news.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </div>
    </div>
  );
}
