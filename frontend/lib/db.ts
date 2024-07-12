export type FeedItem = {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
};

export const feedData: FeedItem[] = [
  {
    id: "1",
    title: "New Job Openings at Ministry of Education",
    source: "Ministry of Education",
    date: "2024-07-04",
    summary: "The Ministry of Education has announced new job openings for teachers and administrative staff...",
  },
];

export const trendingTopics = [
  "Education Reform",
  "COVID-19 Updates",
  "Job Market Analysis",
  "Government Tenders",
  "University Admissions",
];
