import { MessageSquare, ThumbsUp, ThumbsDown, Star, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useState } from 'react';
import { HeroBanner } from './HeroBanner';
import { useLanguage } from './LanguageContext';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';

export function FeedbackPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [rating, setRating] = useState(0);

  const feedbackStats = [
    { label: 'Total Submissions', value: '1,234', change: '+12%', icon: MessageSquare, color: 'text-[#ec2227]' },
    { label: 'Avg. Rating', value: '4.2/5', change: '+0.3', icon: Star, color: 'text-[#7b282d]' },
    { label: 'Resolved Issues', value: '89%', change: '+5%', icon: ThumbsUp, color: 'text-[#971b1e]' },
  ];

  const recentFeedback = [
    {
      id: 1,
      category: 'Navigation',
      feedback: 'The new search functionality is much faster and more intuitive.',
      rating: 5,
      date: '2025-11-26',
      status: 'Reviewed',
      response: 'Thank you for your positive feedback! We\'re glad the improvements are working well.',
    },
    {
      id: 2,
      category: 'Content',
      feedback: 'Would like to see more video tutorials in the Knowledge Hub.',
      rating: 4,
      date: '2025-11-25',
      status: 'In Progress',
      response: 'Great suggestion! Our team is working on expanding the video content library.',
    },
    {
      id: 3,
      category: 'Performance',
      feedback: 'The document download speeds have improved significantly.',
      rating: 5,
      date: '2025-11-24',
      status: 'Resolved',
      response: 'We\'re happy to hear about the performance improvements!',
    },
  ];

  return (
    <div 
      className="min-h-screen" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
    >
      {/* Hero Banner */}
      <div className="px-20 pt-6 relative mb-8">
        <HeroBanner 
          title={{
            en: 'Employee Feedback',
            ar: 'ملاحظات الموظفين'
          }}
          description={{
            en: 'Help us improve your intranet experience',
            ar: 'ساعدنا على تحسين تجربة الإنترانت الخاصة بك'
          }}
        />
        
        {/* Stats Cards - Overlapping Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-[160px] translate-y-1/2 pt-12 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbackStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-3xl mb-1">{stat.value}</h3>
                      <p className="text-gray-600 mb-0">{stat.label}</p>
                      <p className="text-sm text-green-600 mb-0">{stat.change} this month</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-20 pt-24 pb-8 space-y-8">
        {/* Feedback Form & Quick Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedback Form */}
          <Card className="p-6 rounded-xl shadow-lg bg-white">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#ec2227]/10">
                <MessageSquare className="h-6 w-6 text-[#ec2227]" />
              </div>
              <div>
                <h3 className="mb-2">Submit Feedback</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-[#ec2227] to-[#7b282d] rounded-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Feedback Category</Label>
                <Select>
                  <SelectTrigger id="category" className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="navigation">Navigation & Usability</SelectItem>
                    <SelectItem value="content">Content & Information</SelectItem>
                    <SelectItem value="performance">Performance & Speed</SelectItem>
                    <SelectItem value="features">Features & Functionality</SelectItem>
                    <SelectItem value="design">Design & Layout</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Overall Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think about the intranet. What works well? What could be improved?"
                  className="mt-2 min-h-32"
                />
              </div>

              <div>
                <Label>Would you recommend this intranet to colleagues?</Label>
                <RadioGroup defaultValue="yes" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="mb-0 cursor-pointer">Yes, definitely</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="mb-0 cursor-pointer">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="mb-0 cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="suggestions">Suggestions for Improvement</Label>
                <Textarea
                  id="suggestions"
                  placeholder="What specific changes or features would you like to see?"
                  className="mt-2 min-h-24"
                />
              </div>

              <Button className="w-full bg-[#ec2227] hover:bg-[#7b282d]">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </Card>

          {/* Quick Feedback */}
          <Card className="p-6 rounded-xl shadow-lg bg-white">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#7b282d]/10">
                <ThumbsUp className="h-6 w-6 text-[#7b282d]" />
              </div>
              <div>
                <h3 className="mb-2">Quick Feedback</h3>
                <div className="h-1 w-20 bg-gradient-to-r from-[#7b282d] to-[#971b1e] rounded-full" />
              </div>
            </div>
            <p className="text-gray-600 mb-6">How useful did you find the intranet today?</p>
            <div className="flex gap-4 justify-center mb-8">
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all">
                <ThumbsUp className="h-8 w-8 text-green-500" />
                <span className="text-sm">Very Useful</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                <span className="text-2xl">😐</span>
                <span className="text-sm">Okay</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all">
                <ThumbsDown className="h-8 w-8 text-red-500" />
                <span className="text-sm">Not Useful</span>
              </button>
            </div>

            {/* Common Feedback Topics */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h5 className="mb-4">Common Feedback Topics</h5>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { topic: 'Search Functionality', count: 45 },
                  { topic: 'Mobile Experience', count: 38 },
                  { topic: 'Document Access', count: 32 },
                  { topic: 'Navigation', count: 28 },
                  { topic: 'Performance', count: 24 },
                  { topic: 'Content Quality', count: 21 },
                ].map((topic) => (
                  <div key={topic.topic} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h5 className="mb-1 text-[#7b282d]">{topic.count}</h5>
                    <p className="text-xs text-gray-600 mb-0">{topic.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Feedback & Responses */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-2">Recent Feedback & Responses</h2>
            <p className="text-gray-600 mb-0">See how we're responding to employee feedback</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {recentFeedback.map((item) => (
              <Card key={item.id} className="p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <MessageSquare className="h-5 w-5 text-[#ec2227]" />
                    </div>
                    <div>
                      <span className="font-medium">{item.category}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">• {item.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    item.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{item.feedback}</p>
                <div className="pl-4 border-l-4 border-[#ec2227] bg-gray-50 p-3 rounded-r-lg">
                  <p className="text-xs text-gray-500 mb-1">Response:</p>
                  <p className="text-sm text-gray-700 mb-0">{item.response}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}