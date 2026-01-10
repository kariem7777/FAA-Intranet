import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsDetailsPageProps {
  news: any;
  onBack: () => void;
}

export function NewsDetailsPage({ news, onBack }: NewsDetailsPageProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-4 ">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-3 text-[#ec2227] hover:text-[#7b282d] hover:bg-[rgba(236,34,39,0.1)] mt-3"
        >
          <ArrowLeft className="h-4 w-4 " />
          Back to Home
        </Button>
      </div>

      {/* Featured Image - Full Width */}
      {news.image && (
        <div className="w-full h-[400px] overflow-hidden">
          <ImageWithFallback
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          <Card className="faa-card -mt-16 relative z-10">
            {/* Header */}
            <div className="mb-6">
              <Badge className="mb-3 bg-[#ec2227] hover:bg-[#ec2227]">
                {news.category}
              </Badge>
              <h1 className="mb-4">{news.title}</h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{news.date}</span>
                </div>
                {news.author && (
                  <div className="flex items-center gap-2">
                    <span>By {news.author}</span>
                  </div>
                )}
                {news.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{news.readTime} read</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="max-w-none">
              {news.excerpt && (
                <p className="text-[15px] text-gray-700 mb-6 leading-[1.8]">
                  {news.excerpt}
                </p>
              )}
              
              {news.content ? (
                <div 
                  className="space-y-5 text-[14px] text-gray-700 leading-[1.8] news-content"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              ) : (
                <div className="space-y-5 text-[14px] text-gray-700 leading-[1.8]">
                  <p className="text-justify">
                    The Federal Audit Authority continues to enhance transparency and accountability 
                    across all government entities. This initiative represents a significant step 
                    forward in our commitment to excellence and public service.
                  </p>
                  <p className="text-justify">
                    Our dedicated team works tirelessly to ensure that all audit processes meet 
                    international standards while addressing the unique needs of our federal 
                    governance structure. Through comprehensive analysis and detailed reporting, 
                    we maintain the highest levels of integrity in public finance management.
                  </p>
                  <p className="text-justify">
                    This development aligns with our strategic vision to modernize audit practices 
                    and leverage technology for better outcomes. We remain committed to supporting 
                    national development goals through rigorous oversight and constructive 
                    recommendations.
                  </p>
                  <p className="text-justify">
                    Stakeholders and interested parties are encouraged to review the detailed 
                    reports available through our official channels. For more information or 
                    specific inquiries, please contact our communications department.
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onBack}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-[#ec2227] text-[#ec2227] hover:bg-[#ec2227] hover:text-white"
                >
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}