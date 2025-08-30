import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Calendar, User, Eye } from 'lucide-react';
import { useState } from 'react';
import { useBlog, useBlogLike, useAddComment } from '@/hooks/useBlogs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  
  const { data: blog, isLoading, error } = useBlog(slug!);
  const likeMutation = useBlogLike();
  const addCommentMutation = useAddComment();

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like articles",
        variant: "destructive",
      });
      return;
    }

    if (blog) {
      likeMutation.mutate({
        blogId: blog.id,
        isLiked: false // This should be determined by checking if user already liked
      });
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) return;

    if (blog) {
      addCommentMutation.mutate({
        blogId: blog.id,
        content: comment,
        parentId: replyTo
      });
      setComment('');
      setReplyTo(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
        {/* Article Header */}
        <article className="prose prose-reading max-w-none">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {blog.categories?.name}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {blog.excerpt}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blog.profiles?.avatar_url} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{blog.profiles?.full_name}</p>
                  <p className="text-sm text-muted-foreground">@{blog.profiles?.username}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDistanceToNow(new Date(blog.published_at!), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{blog.view_count} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="mb-8">
              <img 
                src={blog.featured_image} 
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose-reading"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between py-8 border-t border-b border-border my-8">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className="flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>{blog.like_count} likes</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>{blog.comments?.length || 0} comments</span>
            </Button>
          </div>
          
          <Button variant="ghost" size="sm">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Comments Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-heading">Comments</h2>
          
          {/* Add Comment */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleComment} className="space-y-4">
                <Textarea
                  placeholder={user ? "Write a comment..." : "Sign in to write a comment"}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={!user}
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={!user || !comment.trim() || addCommentMutation.isPending}
                  >
                    {addCommentMutation.isPending ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {blog.comments?.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.profiles?.avatar_url} />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-semibold">{comment.profiles?.full_name}</p>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-foreground">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <p className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;