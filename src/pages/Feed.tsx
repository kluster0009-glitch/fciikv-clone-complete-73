import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Heart, MessageSquare, Share } from 'lucide-react';

const Feed = () => {
  const posts = [
    {
      id: 1,
      author: 'Student Services',
      date: 'Sep 12, 2024',
      category: 'College',
      title: 'Reminder: Financial Aid Application Deadline',
      content: "Just a friendly reminder that the deadline for Fall semester financial aid applications is this Friday, September 13th. Don't miss out! Contact the Financial Aid Office if you have questions.",
      likes: 24,
      comments: 8,
      image: true
    },
    {
      id: 2,
      author: 'UniConnect News',
      date: 'Sep 11, 2024',
      category: 'College',
      title: 'Student Spotlight: Internship Success!',
      content: "Congratulations to Mark Johnson from State University for securing a prestigious summer internship at Tech Innovations Inc.! Share your own success stories and inspire others in the community.",
      likes: 45,
      comments: 12,
      image: true
    },
    {
      id: 3,
      author: 'Dr. Sarah Chen',
      date: 'Sep 10, 2024',
      category: 'Academic',
      title: 'Research Opportunities in Computer Science',
      content: "I'm looking for motivated undergraduate students to join my research team working on machine learning applications in healthcare. Great opportunity to gain research experience!",
      likes: 67,
      comments: 23,
      image: false
    }
  ];

  const trendingTopics = [
    { name: 'Computer Science', count: 50 },
    { name: 'Mathematics', count: 53 },
    { name: 'Physics', count: 47 },
    { name: 'Chemistry', count: 54 },
    { name: 'Biology', count: 57 }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
              Community Feed
            </h1>
          </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10 bg-cyber-card/50 border-cyber-border"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                  All Posts
                </Button>
                <Button variant="ghost" size="sm">My College</Button>
                <Button variant="ghost" size="sm">Global</Button>
              </div>
            </div>

            {/* Create Post */}
            <Card className="p-6 bg-cyber-card/50 backdrop-blur-sm border-cyber-border">
              <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </Card>

            {/* Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="p-6 bg-cyber-card/50 backdrop-blur-sm border-cyber-border hover:border-cyber-border/60 transition-all duration-300">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-sm">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`
                      ${post.category === 'College' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-neon-purple/20 text-neon-purple'}
                    `}>
                      {post.category}
                    </Badge>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                    
                    {post.image && (
                      <div className="w-full h-48 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-lg border border-cyber-border flex items-center justify-center">
                        <span className="text-muted-foreground">📊 Image Content</span>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-cyber-border">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-pink">
                      <Heart className="w-4 h-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-cyan">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-purple">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="p-6 bg-cyber-card/50 backdrop-blur-sm border-cyber-border">
              <h3 className="text-lg font-semibold text-neon-cyan mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-foreground">{topic.name}</span>
                    <Badge variant="outline" className="text-neon-purple border-neon-purple/30">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-cyber-card/50 backdrop-blur-sm border-cyber-border">
              <h3 className="text-lg font-semibold text-neon-green mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Posts</span>
                  <span className="text-foreground font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="text-foreground font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="text-neon-cyan font-semibold">+89 posts</span>
                </div>
              </div>
            </Card>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Feed;