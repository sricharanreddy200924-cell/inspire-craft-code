import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MoreHorizontal
} from "lucide-react";

const AdminDashboard = () => {
  const pendingArticles = [
    {
      id: 1,
      title: "Advanced React Patterns for Enterprise Applications",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/400?img=12",
        initials: "JS"
      },
      submittedAt: "2 hours ago",
      category: "React",
      wordCount: "2,850",
      status: "pending"
    },
    {
      id: 2,
      title: "Building Microservices with Node.js and Docker",
      author: {
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/400?img=13",
        initials: "SW"
      },
      submittedAt: "5 hours ago",
      category: "Backend",
      wordCount: "3,200",
      status: "pending"
    },
    {
      id: 3,
      title: "Machine Learning Ethics in Modern Applications",
      author: {
        name: "Dr. Michael Chen",
        avatar: "https://i.pravatar.cc/400?img=14",
        initials: "MC"
      },
      submittedAt: "1 day ago",
      category: "AI/ML",
      wordCount: "4,100",
      status: "under_review"
    }
  ];

  const stats = [
    {
      title: "Total Articles",
      value: "2,847",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: "10,234",
      change: "+8%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Monthly Views",
      value: "156.2k",
      change: "+24%",
      icon: Eye,
      color: "text-purple-600"
    },
    {
      title: "Engagement Rate",
      value: "68.4%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage content and monitor platform performance</p>
            </div>
            <Button variant="hero">
              Publish Scheduled
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold font-heading">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Management */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Articles Pending Review</CardTitle>
                <CardDescription>
                  Review and moderate submitted articles before publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg gradient-card">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={article.author.avatar} alt={article.author.name} />
                          <AvatarFallback>{article.author.initials}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold font-heading mb-1">{article.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {article.author.name}</span>
                            <span>•</span>
                            <span>{article.submittedAt}</span>
                            <span>•</span>
                            <span>{article.wordCount} words</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            <Badge 
                              variant={article.status === 'pending' ? 'secondary' : 'outline'}
                              className="capitalize"
                            >
                              {article.status === 'under_review' ? (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Under Review
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Pending
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button variant="default" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="published">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Published Articles</h3>
                  <p className="text-muted-foreground">View and manage published content</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">View detailed platform analytics and insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;