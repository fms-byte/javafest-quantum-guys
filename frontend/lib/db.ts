export type FeedItemProps = {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
};

export const feedData: FeedItemProps[] = [
  {
    id: "1",
    title: "New Job Openings at Ministry of Education",
    source: "Ministry of Education",
    date: "2024-07-04",
    summary:
      "The Ministry of Education has announced new job openings for teachers and administrative staff...",
  },
];

export const trendingTopics = [
  "Education Reform",
  "COVID-19 Updates",
  "Job Market Analysis",
  "Government Tenders",
  "University Admissions",
];

export type PostDataProps = {
  slug: string;
  date: string;
  title: string;
  type: string;
  premium: boolean;
  reaction: string;
  reacted: boolean;
  reported: boolean;
  commented: boolean;
  subscribed: boolean;
  content: string;
  status: string;
  views: number;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  sharesCount: number;
  reportsCount: number;
  tagCount: number;
  thread: {
    slug: string;
    name: string;
    premium: boolean;
    subscribed: boolean;
  };
  channel: {
    slug: string;
    name: string;
    premium: boolean;
    subscribed: boolean;
  };
  tags: {
    name: string;
  }[];
  media: {
    url: string;
    type: string;
  }[];
}

export const Posts: PostDataProps[] = [
  {
    slug: "1",
    date: "2024-07-04",
    title: "New Job Openings at Ministry of Education",
    type: "news",
    premium: false,
    reaction: "like",
    reacted: false,
    reported: false,
    commented: false,
    subscribed: false,
    content:
      "The Ministry of Education has announced new job openings for teachers and administrative staff...",
    status: "published",
    views: 100,
    likesCount: 10,
    dislikesCount: 2,
    commentsCount: 5,
    sharesCount: 3,
    reportsCount: 0,
    tagCount: 2,
    thread: {
      slug: "1",
      name: "Education",
      premium: false,
      subscribed: false,
    },
    channel: {
      slug: "1",
      name: "Ministry of Education",
      premium: false,
      subscribed: false,
    },
    tags: [
      {
        name: "Education",
      },
      {
        name: "Jobs",
      },
    ],
    media: [
      {
        url: "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "image",
      },
    ],
  },
  {
    slug: "2",
    date: "2024-07-04",
    title: "COVID-19 Vaccination Campaign",
    type: "news",
    premium: false,
    reaction: "like",
    reacted: false,
    reported: false,
    commented: false,
    subscribed: false,
    content:
      "The Ministry of Health has launched a nationwide vaccination campaign to combat the spread of COVID-19...",
    status: "published",
    views: 200,
    likesCount: 20,
    dislikesCount: 3,
    commentsCount: 10,
    sharesCount: 5,
    reportsCount: 0,
    tagCount: 2,
    thread: {
      slug: "2",
      name: "Health",
      premium: false,
      subscribed: false,
    },
    channel: {
      slug: "2",
      name: "Ministry of Health",
      premium: false,
      subscribed: false,
    },
    tags: [
      {
        name: "Health",
      },
      {
        name: "COVID-19",
      },
    ],
    media: [
      {
        url: "https://via.placeholder.com/150",
        type: "image",
      },
    ],
  },
  {
    slug: "3",
    date: "2024-07-04",
    title: "Government Tenders",
    type: "news",
    premium: false,
    reaction: "like",
    reacted: false,
    reported: false,
    commented: false,
    subscribed: false,
    content:
      "The Ministry of Finance has released new tenders for various government projects...",
    status: "published",
    views: 150,
    likesCount: 15,
    dislikesCount: 1,
    commentsCount: 7,
    sharesCount: 4,
    reportsCount: 0,
    tagCount: 2,
    thread: {
      slug: "3",
      name: "Finance",
      premium: false,
      subscribed: false,
    },
    channel: {
      slug: "3",
      name: "Ministry of Finance",
      premium: false,
      subscribed: false,
    },
    tags: [
      {
        name: "Finance",
      },
      {
        name: "Tenders",
      },
    ],
    media: [
      {
        url: "https://via.placeholder.com/150",
        type: "image",
      },
    ],
  },
  {
    slug: "4",
    date: "2024-07-04",
    title: "University Admissions Open",
    type: "news",
    premium: false,
    reaction: "like",
    reacted: false,
    reported: false,
    commented: false,
    subscribed: false,
    content:
      "Universities across the country have opened admissions for various undergraduate and postgraduate programs...",
    status: "published",
    views: 120,
    likesCount: 12,
    dislikesCount: 0,
    commentsCount: 6,
    sharesCount: 2,
    reportsCount: 0,
    tagCount: 2,
    thread: {
      slug: "4",
      name: "Education",
      premium: false,
      subscribed: false,
    },
    channel: {
      slug: "4",
      name: "Higher Education Commission",
      premium: false,
      subscribed: false,
    },
    tags: [
      {
        name: "Education",
      },
      {
        name: "Admissions",
      },
    ],
    media: [
      {
        url: "https://via.placeholder.com/150",
        type: "image",
      },
    ],
  }
];
