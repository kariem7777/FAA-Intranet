import { useState } from 'react';
import { ArrowLeft, Calendar, User, MessageCircle, Clock, CheckCircle, Edit, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';

interface TimelineItem {
  id: number;
  type: 'created' | 'updated' | 'comment' | 'status';
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
}

interface Comment {
  id: number;
  author: string;
  role: string;
  department: string;
  content: string;
  date: string;
  time: string;
  avatar?: string;
}

interface AnnouncementDetailPageProps {
  announcementId: number;
  onBack: () => void;
}

export function AnnouncementDetailPage({ announcementId, onBack }: AnnouncementDetailPageProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Ahmed Al Maktoum',
      role: 'Senior Auditor',
      department: 'Financial Audit',
      content: 'This is a very important update. I\'ve reviewed the new standards and they align well with our current practices. Looking forward to the implementation workshop.',
      date: '2025-11-26',
      time: '10:30 AM',
    },
    {
      id: 2,
      author: 'Noura Abdullah',
      role: 'Compliance Manager',
      department: 'Compliance',
      content: 'Thank you for sharing this. Will there be training sessions for all departments? We need to ensure everyone is up to date with these changes.',
      date: '2025-11-26',
      time: '11:15 AM',
    },
    {
      id: 3,
      author: 'Khalid Rahman',
      role: 'Quality Assurance Lead',
      department: 'Quality Control',
      content: 'Excellent news! These updated standards will significantly improve our audit quality. I recommend scheduling a comprehensive training program.',
      date: '2025-11-26',
      time: '2:45 PM',
    },
    {
      id: 4,
      author: 'Fatima Al Zaabi',
      role: 'Lead Auditor',
      department: 'Audit Operations',
      content: 'I appreciate the detailed documentation provided. The knowledge hub link is very helpful. This will streamline our audit processes.',
      date: '2025-11-27',
      time: '9:20 AM',
    },
  ]);

  const announcement = {
    id: 1,
    title: 'New Audit Standards Released',
    category: 'Policy',
    author: 'Policy Department',
    publishDate: '2025-11-26',
    publishTime: '9:00 AM',
    content: `<p>We are pleased to announce the release of updated international audit standards, which are now available in the Knowledge Hub. These new standards reflect the latest developments in audit practices and regulatory requirements.</p>

<h5>Key Updates Include:</h5>
<ul>
  <li><strong>Enhanced Risk Assessment Procedures</strong> - New methodologies for identifying and evaluating audit risks in complex environments.</li>
  <li><strong>Digital Audit Tools Integration</strong> - Guidelines for incorporating AI and data analytics into audit processes.</li>
  <li><strong>Sustainability Reporting Standards</strong> - Updated requirements for environmental and social governance audits.</li>
  <li><strong>Fraud Detection Protocols</strong> - Advanced techniques for identifying potential fraud indicators.</li>
  <li><strong>Quality Control Measures</strong> - Strengthened requirements for internal quality reviews.</li>
</ul>

<h5>Implementation Timeline:</h5>
<p>All audit teams are expected to review and implement these standards by Q1 2026. Training sessions will be scheduled throughout December and January to ensure smooth adoption.</p>

<h5>Resources:</h5>
<p>Complete documentation, implementation guides, and training materials are available in the Knowledge Hub under "Audit Standards 2025". Please contact the Policy Department for any questions or clarifications.</p>

<p>We encourage all team members to familiarize themselves with these updates and participate in the upcoming training sessions.</p>`,
  };

  const timeline: TimelineItem[] = [
    {
      id: 1,
      type: 'created',
      title: 'Announcement Created',
      description: 'Initial draft created and reviewed',
      author: 'Policy Department',
      date: '2025-11-20',
      time: '3:00 PM',
    },
    {
      id: 2,
      type: 'updated',
      title: 'Content Updated',
      description: 'Added implementation timeline and resource links',
      author: 'Policy Department',
      date: '2025-11-24',
      time: '11:30 AM',
    },
    {
      id: 3,
      type: 'status',
      title: 'Approved for Publishing',
      description: 'Reviewed and approved by Senior Management',
      author: 'Executive Office',
      date: '2025-11-25',
      time: '4:15 PM',
    },
    {
      id: 4,
      type: 'created',
      title: 'Published',
      description: 'Announcement published to all employees',
      author: 'Policy Department',
      date: '2025-11-26',
      time: '9:00 AM',
    },
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: 'You',
        role: 'Current User',
        department: 'Your Department',
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Edit className="w-4 h-4" />;
      case 'updated':
        return <Edit className="w-4 h-4" />;
      case 'status':
        return <CheckCircle className="w-4 h-4" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'bg-[#8cd4e4]';
      case 'updated':
        return 'bg-[#54367]';
      case 'status':
        return 'bg-[#ec2227]';
      case 'comment':
        return 'bg-[#7b282d]';
      default:
        return 'bg-[#908e81]';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 text-[#ec2227] hover:text-[#7b282d] hover:bg-[rgba(236,34,39,0.1)]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Announcements
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Announcement Header */}
          <Card className="faa-card">
            <Badge className="mb-3 bg-[#ec2227]">{announcement.category}</Badge>
            <h2 className="mb-4">{announcement.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{announcement.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{announcement.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{announcement.publishTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length} comments</span>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: announcement.content }}
            />
          </Card>

          {/* Comments Section */}
          <Card className="faa-card">
            <h4 className="faa-section-header mb-6">Comments ({comments.length})</h4>

            {/* Add Comment Form */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <Textarea
                placeholder="Share your thoughts or questions..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 min-h-[120px] resize-none border-gray-300 focus:border-[#ec2227] focus:ring-[#ec2227]"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  className="bg-[#ec2227] hover:bg-[#7b282d]"
                  disabled={!newComment.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#ec2227] text-white">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{comment.author}</p>
                          <p className="text-xs text-gray-500">
                            {comment.role} • {comment.department}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {comment.date} at {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - Timeline */}
        <div className="lg:col-span-1">
          <Card className="faa-card sticky top-24">
            <h4 className="faa-section-header mb-6">Activity Timeline</h4>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gray-200" />

              {/* Timeline Items */}
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.id} className="relative pl-10">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 top-1 w-8 h-8 rounded-full ${getTimelineColor(
                        item.type
                      )} flex items-center justify-center text-white shadow-lg`}
                    >
                      {getTimelineIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="pb-6">
                      <p className="font-medium text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="text-xs text-gray-500">
                        <p>{item.author}</p>
                        <p>
                          {item.date} at {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
