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
  {
    id: "2",
    title: "COVID-19 Cases on the Rise",
    source: "Ministry of Health",
    date: "2024-07-03",
    summary: "The Ministry of Health has reported a sharp increase in COVID-19 cases in the past week...",
  },
  {
    id: "3",
    title: "Government Tenders for Infrastructure Projects",
    source: "Ministry of Infrastructure",
    date: "2024-07-02",
    summary: "The Ministry of Infrastructure has released tenders for various infrastructure projects across the country...",
  },
  {
    id: "4",
    title: "University Admissions Open for 2024",
    source: "Ministry of Higher Education",
    date: "2024-07-01",
    summary: "Universities across the country have opened admissions for the 2024 academic year. Apply now...",
  },
  {
    id: "5",
    title: "Job Market Analysis Report Released",
    source: "Ministry of Labor",
    date: "2024-06-30",
    summary: "The Ministry of Labor has released a report on the current job market trends and opportunities...",
  },
];

export const trendingTopics = [
  "Education Reform",
  "COVID-19 Updates",
  "Job Market Analysis",
  "Government Tenders",
  "University Admissions",
];
