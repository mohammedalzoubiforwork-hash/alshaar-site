export type WorkType = "poetry" | "books" | "theater" | "biography";

export type WorkItem = {
  id: string;
  type: WorkType;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type HonorItem = {
  id: string;
  year: string;
  title: string;
  story: string;
  image: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

export type QuoteItem = {
  id: string;
  text: string;
  caption: string;
};

export type AudioTrack = {
  id: string;
  title: string;
  description: string;
  file: string;
  durationLabel: string;
};

export type SiteContent = {
  photos: {
    heroImage: string;
    writerImage: string;
  };
  works: WorkItem[];
  honors: HonorItem[];
  news: NewsItem[];
  quotes: QuoteItem[];
  audioTracks: AudioTrack[];
};
