export const state = () => ({
    posts: [
      // // Example posts structure
      // { id: 1, userId: 1, category: 'Technology', likes: 10, comments: 5, rating: 4.5, date: '2023-12-01' },
      // { id: 2, userId: 2, category: 'Health', likes: 5, comments: 3, rating: 3.8, date: '2023-12-03' },
      // // Add more posts here
    ],
  });
  
  export const getters = {
    getStats: (state) => (startDate, endDate) => {
      const filteredPosts = state.posts.filter((post) => {
        const postDate = new Date(post.date);
        return postDate >= new Date(startDate) && postDate <= new Date(endDate);
      });
  
      const categories = {};
      filteredPosts.forEach((post) => {
        if (!categories[post.category]) categories[post.category] = 0;
        categories[post.category]++;
      });
  
      return {
        totalPosts: filteredPosts.length,
        totalLikes: filteredPosts.reduce((sum, post) => sum + post.likes, 0),
        totalComments: filteredPosts.reduce((sum, post) => sum + post.comments, 0),
        averageRating: (filteredPosts.reduce((sum, post) => sum + post.rating, 0) / filteredPosts.length).toFixed(2),
        postsByCategory: categories,
      };
    },
  };
  