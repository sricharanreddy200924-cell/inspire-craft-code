import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, Share2, Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  image?: string;
  likes: number;
  comments: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

const ArticleCard = ({
  title,
  excerpt,
  author,
  publishedAt,
  readTime,
  category,
  image,
  likes,
  comments,
  isBookmarked = false,
  isLiked = false,
}: ArticleCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-medium border-border/50 gradient-card">
      <div className="aspect-video overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full gradient-hero flex items-center justify-center">
            <div className="text-6xl text-primary/20 font-bold font-heading">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Category Badge */}
        <Badge variant="secondary" className="mb-3 text-xs">
          {category}
        </Badge>

        {/* Title */}
        <h3 className="text-xl font-bold font-heading mb-3 line-clamp-2 group-hover:text-primary transition-fast">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Author and Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-xs font-medium">
                {author.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{author.name}</p>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <span>{publishedAt}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {readTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;