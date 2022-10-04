import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();

      expect(foundPosts).toHaveLength(posts.length);
      expect(foundPosts).toEqual(
        expect.arrayContaining(posts.map(expect.objectContaining)),
      );
    });

    it('should return correct posts for skip and limit options', () => {
      const limit = 2;
      const skip = 1;

      const foundPosts = postsService.findMany({ skip, limit });

      expect(foundPosts).toHaveLength(limit);
      expect(foundPosts).toEqual(
        expect.arrayContaining(
          posts.slice(skip, limit).map(expect.objectContaining),
        ),
      );
    });

    it('should return correct posts for skip option', () => {
      const skip = 2;
      const foundPosts = postsService.findMany({ skip });

      expect(foundPosts).toHaveLength(posts.length - skip);
      expect(foundPosts).toEqual(
        expect.arrayContaining(posts.slice(skip).map(expect.objectContaining)),
      );
    });

    it('should return correct posts for limit option', () => {
      const limit = 3;
      const foundPosts = postsService.findMany({ limit });

      expect(foundPosts).toHaveLength(limit);
      expect(foundPosts).toEqual(
        expect.arrayContaining(
          posts.slice(0, limit).map(expect.objectContaining),
        ),
      );
    });
  });
});