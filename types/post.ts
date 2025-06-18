export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
  author?: string;
  coverImage?: string;
  readingTime?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface ComponentLoadResult {
  components: Record<string, React.ComponentType<any>>;
  hasCustomComponents: boolean;
  loadedFrom: 'static-mapping' | 'global-only';
}