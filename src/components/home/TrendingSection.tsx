import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Clock, Eye } from "lucide-react";

const TrendingSection = () => {
  const trendingArticles = [
    {
      rank: 1,
      title: "Understanding JavaScript Closures: A Deep Dive",
      author: {
        name: "Alex Kumar",
        avatar: "https://i.pravatar.cc/400?img=3",
        initials: "AK"
      },
      category: "JavaScript",
      readTime: "5 min read",
      views: "12.4k",
      growth: "+234%"
    },
    {
      rank: 2,
      title: "CSS Grid vs Flexbox: When to Use Which?",
      author: {
        name: "Lisa Wang",
        avatar: "https://i.pravatar.cc/400?img=1",
        initials: "LW"
      },
      category: "CSS",
      readTime: "7 min read",
      views: "9.8k",
      growth: "+189%"
    },
    {
      rank: 3,
      title: "Building RESTful APIs with Node.js and Express",
      author: {
        name: "David Park",
        avatar: "https://i.pravatar.cc/400?img=8",
        initials: "DP"
      },
      category: "Backend",
      readTime: "10 min read",
      views: "8.7k",
      growth: "+156%"
    },
    {
      rank: 4,
      title: "React Hooks: useState vs useReducer",
      author: {
        name: "Maria Santos",
        avatar: "https://i.pravatar.cc/400?img=4",
        initials: "MS"
      },
      category: "React",
      readTime: "6 min read",
      views: "7.2k",
      growth: "+142%"
    },
    {
      rank: 5,
      title: "TypeScript Best Practices for Large Projects",
      author: {
        name: "John Mitchell",
        avatar: "https://i.pravatar.cc/400?img=6",
        initials: "JM"
      },
      category: "TypeScript",
      readTime: "12 min read",
      views: "6.1k",
      growth: "+128%"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold font-heading">Trending Now</h2>
            </div>
            <p className="text-muted-foreground">
              Most popular articles this week based on views and engagement
            </p>
          </div>
          <Button variant="outline">View All Trending</Button>
        </div>

        {/* Trending List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trendingArticles.map((article) => (
            <Card key={article.rank} className="group transition-all hover:shadow-medium border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {article.rank}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {article.growth}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold font-heading mb-3 group-hover:text-primary transition-fast line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={article.author.avatar} alt={article.author.name} />
                          <AvatarFallback className="text-xs">
                            {article.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {article.author.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;