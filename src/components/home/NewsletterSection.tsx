import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Users, BookOpen, TrendingUp } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <Card className="relative overflow-hidden shadow-large">
          {/* Background Gradient */}
          <div className="absolute inset-0 gradient-primary opacity-5" />
          
          <CardContent className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Weekly Newsletter</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Stay Ahead of the Curve
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6">
                  Get the latest development insights, trending articles, and exclusive 
                  content delivered to your inbox every week. Join thousands of developers 
                  who trust our curated content.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Weekly Digest</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Exclusive Content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">No Spam Ever</span>
                  </div>
                </div>

                {/* Subscription Form */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-background border-border/50 focus:bg-background"
                  />
                  <Button variant="hero" className="whitespace-nowrap">
                    Subscribe Now
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-heading">25,000+</div>
                  <div className="text-sm text-muted-foreground">Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-heading">150+</div>
                  <div className="text-sm text-muted-foreground">Issues Sent</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-heading">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-heading">92%</div>
                  <div className="text-sm text-muted-foreground">Open Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;