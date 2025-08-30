import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const FeaturedArticles = () => {
  const featuredArticles = [
    {
      title: "Building Scalable Web Applications with Modern React Patterns",
      excerpt: "Explore advanced React patterns including compound components, render props, and custom hooks to build maintainable and scalable applications that can grow with your team.",
      author: {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/400?img=5",
        initials: "SC"
      },
      publishedAt: "2 days ago",
      readTime: "8 min read",
      category: "React",
      image: article1,
      likes: 234,
      comments: 42,
      isLiked: true,
      isBookmarked: false
    },
    {
      title: "The Future of AI in Web Development: Tools and Techniques",
      excerpt: "Discover how artificial intelligence is revolutionizing web development workflows, from automated code generation to intelligent debugging and testing strategies.",
      author: {
        name: "Marcus Johnson",
        avatar: "https://i.pravatar.cc/400?img=7",
        initials: "MJ"
      },
      publishedAt: "1 week ago",
      readTime: "12 min read",
      category: "AI & ML",
      image: article2,
      likes: 189,
      comments: 28,
      isLiked: false,
      isBookmarked: true
    },
    {
      title: "Mobile-First Design Principles for Modern Web Apps",
      excerpt: "Learn essential mobile-first design strategies that ensure your web applications provide exceptional user experiences across all device types and screen sizes.",
      author: {
        name: "Emily Rodriguez",
        avatar: "https://i.pravatar.cc/400?img=9",
        initials: "ER"
      },
      publishedAt: "3 days ago",
      readTime: "6 min read",
      category: "UI/UX",
      image: article3,
      likes: 156,
      comments: 31,
      isLiked: false,
      isBookmarked: false
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked by our editorial team: the most insightful and impactful 
            articles from our developer community.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Featured Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;