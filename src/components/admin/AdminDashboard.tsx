import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";
import { usePendingBlogs, useAdminStats, useApproveBlog, useRejectBlog } from "@/hooks/useAdmin";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AdminDashboard = () => {
  const { data: pendingBlogs, isLoading: pendingLoading } = usePendingBlogs();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const approveBlogMutation = useApproveBlog();
  const rejectBlogMutation = useRejectBlog();

  const handleApprove = (blogId: string) => {
    approveBlogMutation.mutate(blogId);
  };

  const handleReject = (blogId: string) => {
    rejectBlogMutation.mutate({ blogId, feedback: "Blog did not meet our content guidelines." });
  };

  if (pendingLoading || statsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your blog content and users</p>
          </div>
          <Button variant="default">
            <Calendar className="w-4 h-4 mr-2" />
            Publish Scheduled
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalBlogs || 0}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingBlogs || 0}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalViews.toLocaleString() || '0'}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Review ({stats?.pendingBlogs || 0})</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Articles Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingBlogs && pendingBlogs.length > 0 ? (
                  <div className="space-y-4">
                    {pendingBlogs.map((article) => (
                      <div key={article.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={article.profiles?.avatar_url} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="font-semibold">{article.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>By {article.profiles?.full_name}</span>
                              <span>{formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}</span>
                              {article.categories && (
                                <Badge variant="secondary" className="text-xs">
                                  {article.categories.name}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                            Preview
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleApprove(article.id)}
                            disabled={approveBlogMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleReject(article.id)}
                            disabled={rejectBlogMutation.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No articles pending review</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="published">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Published articles management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">User management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;