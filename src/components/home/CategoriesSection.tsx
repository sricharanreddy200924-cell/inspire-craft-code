import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  Smartphone, 
  Database, 
  Palette, 
  Brain, 
  Shield,
  ArrowRight
} from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Frontend Development",
      description: "React, Vue, Angular, and modern web technologies",
      icon: Code2,
      articleCount: "1,234",
      color: "bg-blue-500"
    },
    {
      name: "Mobile Development",
      description: "iOS, Android, React Native, and Flutter",
      icon: Smartphone,
      articleCount: "856",
      color: "bg-green-500"
    },
    {
      name: "Backend & APIs",
      description: "Node.js, Python, databases, and server architecture",
      icon: Database,
      articleCount: "743",
      color: "bg-purple-500"
    },
    {
      name: "UI/UX Design",
      description: "Design systems, user experience, and interfaces",
      icon: Palette,
      articleCount: "592",
      color: "bg-pink-500"
    },
    {
      name: "AI & Machine Learning",
      description: "Neural networks, data science, and automation",
      icon: Brain,
      articleCount: "487",
      color: "bg-orange-500"
    },
    {
      name: "Security & DevOps",
      description: "Cybersecurity, deployment, and infrastructure",
      icon: Shield,
      articleCount: "423",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into your areas of interest with our curated content categories, 
            each featuring expert insights and practical tutorials.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="group transition-all hover:shadow-medium hover:-translate-y-1 border-border/50 gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${category.color}/10`}>
                      <IconComponent className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Articles</div>
                      <div className="font-bold text-lg">{category.articleCount}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-fast">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium group-hover:text-primary">
                    Explore Category
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Categories Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Categories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;