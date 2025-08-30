import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const usePendingBlogs = () => {
  return useQuery({
    queryKey: ['pending-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles:author_id(username, full_name, avatar_url),
          categories(name, slug)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Get total blogs count
      const { count: totalBlogs } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      // Get pending blogs count
      const { count: pendingBlogs } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get total users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get this month's views (using view_count sum)
      const { data: viewsData } = await supabase
        .from('blogs')
        .select('view_count')
        .eq('status', 'approved');

      const totalViews = viewsData?.reduce((sum, blog) => sum + (blog.view_count || 0), 0) || 0;

      return {
        totalBlogs: totalBlogs || 0,
        pendingBlogs: pendingBlogs || 0,
        totalUsers: totalUsers || 0,
        totalViews,
      };
    },
  });
};

export const useApproveBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogId: string) => {
      const { error } = await supabase
        .from('blogs')
        .update({ 
          status: 'approved',
          published_at: new Date().toISOString()
        })
        .eq('id', blogId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featured-blogs'] });
      toast({
        title: "Success",
        description: "Blog approved and published",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useRejectBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, feedback }: { blogId: string; feedback?: string }) => {
      const { error } = await supabase
        .from('blogs')
        .update({ 
          status: 'rejected',
          admin_feedback: feedback || ''
        })
        .eq('id', blogId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: "Success",
        description: "Blog rejected",
      });
    },
    onError: (error) => {
      toast({
        title: "Error", 
        description: error.message,
        variant: "destructive",
      });
    },
  });
};