import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles:author_id(username, full_name, avatar_url),
          categories(name, slug),
          _count:blog_likes(count)
        `)
        .eq('status', 'approved')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedBlogs = () => {
  return useQuery({
    queryKey: ['featured-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles:author_id(username, full_name, avatar_url),
          categories(name, slug),
          _count:blog_likes(count)
        `)
        .eq('status', 'approved')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles:author_id(username, full_name, avatar_url),
          categories(name, slug),
          comments(
            id,
            content,
            created_at,
            profiles:user_id(username, full_name, avatar_url)
          ),
          _count:blog_likes(count)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};

export const useBlogLike = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, isLiked }: { blogId: string; isLiked: boolean }) => {
      if (!user) throw new Error('Must be logged in to like');

      if (isLiked) {
        const { error } = await supabase
          .from('blog_likes')
          .delete()
          .eq('blog_id', blogId)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_likes')
          .insert({ blog_id: blogId, user_id: user.id });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featured-blogs'] });
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

export const useAddComment = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blogId, content, parentId }: { blogId: string; content: string; parentId?: string }) => {
      if (!user) throw new Error('Must be logged in to comment');

      const { error } = await supabase
        .from('comments')
        .insert({
          blog_id: blogId,
          user_id: user.id,
          content,
          parent_id: parentId
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast({
        title: "Success",
        description: "Comment added successfully",
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