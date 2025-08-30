import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedBlogs } from "@/hooks/useBlogs";
import { formatDistanceToNow } from "date-fns";

const FeaturedArticles = () => {
  const { data: blogs, isLoading, error } = useFeaturedBlogs();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Featured Content</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Editor's Picks
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most insightful articles handpicked by our editorial team
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-soft hover:shadow-medium transition-all animate-pulse">
                <div className="aspect-video bg-muted" />
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full" />
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                    <div className="h-4 bg-muted rounded w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !blogs) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-muted-foreground">Failed to load featured articles</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Featured Content</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Editor's Picks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most insightful articles handpicked by our editorial team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`}>
              <Card className="overflow-hidden shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer">
                {blog.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={blog.featured_image} 
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {blog.categories && (
                      <Badge variant="secondary" className="text-xs">
                        {blog.categories.name}
                      </Badge>
                    )}
                    
                    <h3 className="text-xl font-semibold font-heading line-clamp-2 hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={blog.profiles?.avatar_url} />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{blog.profiles?.full_name}</p>
                          <p className="text-muted-foreground text-xs">@{blog.profiles?.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{blog.like_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDistanceToNow(new Date(blog.published_at!), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Featured Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;