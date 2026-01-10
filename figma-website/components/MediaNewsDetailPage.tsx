import { useState } from 'react';
import { ArrowLeft, Calendar, User, MessageCircle, Clock, CheckCircle, Edit, Send, Eye, Share2, Bookmark } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import galleryImg1 from 'figma:asset/cb64f9a87ac606d9926884eed9a827a7172105de.png';
import galleryImg2 from 'figma:asset/95993900bf37692651b8569a31368a3269db15e2.png';
import galleryImg3 from 'figma:asset/7de74e447ed1e5b77f01506bfd62f7dabad9ae03.png';
import galleryImg4 from 'figma:asset/33f312785d773855d5dfb38d16c5cfaeeaf99931.png';

interface TimelineItem {
  id: number;
  type: 'created' | 'updated' | 'published' | 'shared';
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
}

interface MediaNewsDetailPageProps {
  newsId: number;
  onBack: () => void;
}

export function MediaNewsDetailPage({ newsId, onBack }: MediaNewsDetailPageProps) {
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Mohammed Al Shamsi',
      role: 'IT Audit Manager',
      department: 'IT Audit',
      content: 'This is a significant milestone for the FAA! The new digital platform will greatly enhance our audit capabilities and efficiency. Looking forward to the training sessions.',
      date: '2025-11-26',
      time: '11:30 AM',
    },
    {
      id: 2,
      author: 'Sarah Abdullah',
      role: 'Data Analytics Specialist',
      department: 'Analytics',
      content: 'The AI-powered analytics feature sounds promising. Will this integrate with our existing systems? Excited to see it in action!',
      date: '2025-11-26',
      time: '2:15 PM',
    },
    {
      id: 3,
      author: 'Omar Hassan',
      role: 'Senior Auditor',
      department: 'Financial Audit',
      content: 'Great initiative! Real-time reporting will definitely streamline our processes. When can we expect the rollout to all departments?',
      date: '2025-11-27',
      time: '10:20 AM',
    },
  ]);

  // Mock data for different news articles
  const newsData: { [key: number]: any } = {
    1: {
      id: 1,
      title: 'Innovation Workshop: Building Tomorrow\'s Audit Solutions',
      category: 'Innovation',
      categoryColor: '#ec2227',
      author: 'Communications Department',
      publishDate: '2025-11-26',
      publishTime: '10:00 AM',
      views: 245,
      image: galleryImg1,
      content: `<p>Behind the scenes at our Innovation Workshop! Our teams are working on cutting-edge solutions to enhance audit efficiency and transparency. This two-day intensive workshop brings together our brightest minds to develop next-generation audit tools and methodologies.</p>

<h5>Workshop Highlights:</h5>
<ul>
  <li><strong>AI-Driven Audit Analytics</strong> - Developing machine learning models to identify patterns and anomalies in financial data.</li>
  <li><strong>Blockchain Integration</strong> - Exploring distributed ledger technology for immutable audit trails.</li>
  <li><strong>Automated Risk Assessment</strong> - Creating intelligent systems for real-time risk evaluation.</li>
  <li><strong>Collaborative Audit Tools</strong> - Building platforms for seamless team collaboration and knowledge sharing.</li>
  <li><strong>Data Visualization</strong> - Designing intuitive dashboards for complex audit data presentation.</li>
</ul>

<h5>Innovation Teams:</h5>
<p>Cross-functional teams from IT Audit, Financial Audit, Risk Management, and Analytics departments are collaborating on various projects. Each team is focused on addressing specific challenges in our audit processes.</p>

<h5>Expected Outcomes:</h5>
<p>The workshop aims to produce at least three pilot projects that will be tested in Q1 2026. Successful projects will be rolled out across all audit divisions by mid-2026.</p>

<p>We're committed to staying at the forefront of audit technology and methodology, ensuring that FAA continues to set the standard for excellence in government financial oversight.</p>`,
    },
    2: {
      id: 2,
      title: 'FAA Launches New Digital Audit Platform',
      category: 'Technology',
      categoryColor: '#8cd4e4',
      author: 'IT Department',
      publishDate: '2025-11-25',
      publishTime: '9:00 AM',
      views: 532,
      image: galleryImg2,
      content: `<p>The Financial Audit Authority has officially launched its new digital audit platform, revolutionizing how audits are conducted across government entities. This comprehensive platform represents a major technological leap forward in our operations.</p>

<h5>Platform Features:</h5>
<ul>
  <li><strong>AI-Powered Analytics</strong> - Advanced algorithms analyze financial data to identify trends, anomalies, and potential issues.</li>
  <li><strong>Real-Time Reporting</strong> - Instant report generation and distribution with customizable templates.</li>
  <li><strong>Cloud-Based Infrastructure</strong> - Secure, scalable architecture accessible from anywhere.</li>
  <li><strong>Integrated Workflows</strong> - Streamlined processes from audit planning to final reporting.</li>
  <li><strong>Mobile Access</strong> - Full functionality on tablets and smartphones for field audits.</li>
  <li><strong>Collaboration Tools</strong> - Built-in communication and document sharing capabilities.</li>
</ul>

<h5>Security & Compliance:</h5>
<p>The platform meets all UAE cybersecurity standards and includes end-to-end encryption, multi-factor authentication, and comprehensive audit logging. All data is stored in UAE-based data centers.</p>

<h5>Training & Rollout:</h5>
<p>Comprehensive training sessions will be conducted for all audit staff throughout December 2025. The platform will be rolled out in phases, starting with pilot departments in January 2026.</p>

<h5>Benefits:</h5>
<p>We expect a 40% reduction in audit completion time and a significant improvement in audit quality and consistency. The platform will also enable better resource allocation and workload management.</p>`,
    },
    3: {
      id: 3,
      title: 'Regional Cooperation Forum on Financial Governance',
      category: 'Events',
      categoryColor: '#971b1e',
      author: 'International Relations',
      publishDate: '2025-11-24',
      publishTime: '8:30 AM',
      views: 418,
      image: galleryImg3,
      content: `<p>FAA hosted the Regional Cooperation Forum bringing together audit authorities from across the Gulf region. This prestigious event focused on standardizing audit practices and sharing best practices in financial oversight.</p>

<h5>Participating Organizations:</h5>
<ul>
  <li>General Auditing Bureau of Saudi Arabia</li>
  <li>State Audit Bureau of Kuwait</li>
  <li>Financial Affairs Authority of Bahrain</li>
  <li>State Audit Institution of Qatar</li>
  <li>State Audit Institution of Oman</li>
  <li>UAE Federal Audit Authority (Host)</li>
</ul>

<h5>Key Discussion Topics:</h5>
<ul>
  <li><strong>Harmonization of Audit Standards</strong> - Creating unified standards across the region.</li>
  <li><strong>Digital Transformation</strong> - Sharing experiences in implementing digital audit platforms.</li>
  <li><strong>Capacity Building</strong> - Joint training programs and knowledge exchange initiatives.</li>
  <li><strong>Anti-Corruption Measures</strong> - Collaborative approaches to detecting and preventing fraud.</li>
  <li><strong>Sustainability Audits</strong> - New frameworks for environmental and social governance.</li>
</ul>

<h5>Memorandum of Understanding:</h5>
<p>The forum concluded with the signing of a comprehensive MoU establishing a permanent regional audit cooperation framework. This includes quarterly meetings, joint research projects, and staff exchange programs.</p>

<h5>Future Initiatives:</h5>
<p>A regional audit database will be established to share audit findings and best practices. Annual forums will rotate among member states, with the next meeting scheduled in Riyadh in November 2026.</p>`,
    },
    4: {
      id: 4,
      title: 'Annual Report 2024: Record Achievements in Financial Oversight',
      category: 'Reports',
      categoryColor: '#413f30',
      author: 'Executive Office',
      publishDate: '2025-11-23',
      publishTime: '3:00 PM',
      views: 687,
      image: galleryImg4,
      content: `<p>Our 2024 Annual Report highlights unprecedented achievements in financial governance and transparency. This year saw a 40% increase in audit coverage and significant improvements in compliance rates across all sectors.</p>

<h5>2024 Key Achievements:</h5>
<ul>
  <li><strong>Audit Coverage</strong> - 1,247 audits completed (40% increase from 2023)</li>
  <li><strong>Financial Impact</strong> - AED 2.3 billion in savings identified through audit recommendations</li>
  <li><strong>Compliance Rate</strong> - 94% compliance rate across audited entities (up from 87% in 2023)</li>
  <li><strong>Technology Adoption</strong> - 100% digital audit processes implemented</li>
  <li><strong>Staff Development</strong> - 3,200 training hours completed by audit staff</li>
  <li><strong>International Recognition</strong> - ISO 9001:2015 certification achieved</li>
</ul>

<h5>Sector Highlights:</h5>
<p><strong>Federal Government Entities:</strong> Completed 453 comprehensive audits covering AED 89 billion in expenditure.</p>
<p><strong>Local Authorities:</strong> Conducted 392 audits with a focus on infrastructure and development projects.</p>
<p><strong>Government-Owned Enterprises:</strong> Audited 234 entities, identifying efficiency improvements worth AED 1.2 billion.</p>
<p><strong>Special Investigations:</strong> Completed 168 investigative audits resulting in 23 referrals to relevant authorities.</p>

<h5>Strategic Initiatives:</h5>
<p>Launched the Digital Transformation Program, established the Center for Excellence in Government Auditing, and initiated partnerships with leading international audit institutions.</p>

<h5>Looking Ahead:</h5>
<p>Our 2025-2028 Strategic Plan focuses on AI integration, enhanced risk-based auditing, sustainability reporting, and regional leadership in government audit practices.</p>`,
    },
  };

  const newsArticle = newsData[newsId] || newsData[1];

  const timeline: TimelineItem[] = [
    {
      id: 1,
      type: 'created',
      title: 'Article Created',
      description: 'Initial draft created and reviewed',
      author: newsArticle.author,
      date: newsArticle.publishDate,
      time: '8:00 AM',
    },
    {
      id: 2,
      type: 'updated',
      title: 'Content Reviewed',
      description: 'Editorial review and fact-checking completed',
      author: 'Editorial Team',
      date: newsArticle.publishDate,
      time: '8:45 AM',
    },
    {
      id: 3,
      type: 'published',
      title: 'Published',
      description: 'Article published to all employees',
      author: newsArticle.author,
      date: newsArticle.publishDate,
      time: newsArticle.publishTime,
    },
    {
      id: 4,
      type: 'shared',
      title: 'Shared Externally',
      description: 'Published on FAA public website and social media',
      author: 'Communications Team',
      date: newsArticle.publishDate,
      time: '11:00 AM',
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
        return <CheckCircle className="w-4 h-4" />;
      case 'published':
        return <Eye className="w-4 h-4" />;
      case 'shared':
        return <Share2 className="w-4 h-4" />;
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
      case 'published':
        return 'bg-[#ec2227]';
      case 'shared':
        return 'bg-[#7b282d]';
      default:
        return 'bg-[#908e81]';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-3 text-[#ec2227] hover:text-[#7b282d] hover:bg-[rgba(236,34,39,0.1)]\ mt-3"
        >
          <ArrowLeft className="w-4 h-4 " />
          Back to Home
        </Button>
      </div>

      {/* Featured Image - Full Width */}
      <div className="w-full h-[400px] overflow-hidden">
        <ImageWithFallback
          src={newsArticle.image}
          alt={newsArticle.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {/* News Header */}
          <Card className="faa-card -mt-16 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Badge style={{ backgroundColor: newsArticle.categoryColor }}>
                {newsArticle.category}
              </Badge>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{newsArticle.views} views</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? 'text-[#ec2227]' : 'text-gray-500'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            <h2 className="mb-4">{newsArticle.title}</h2>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{newsArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{newsArticle.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{newsArticle.publishTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length} comments</span>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: newsArticle.content }}
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
      </div>
    </div>
  );
}