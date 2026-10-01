/** "Beyond work": teaching, judging, volunteering. Newest first. */
export interface BeyondItem {
  when: string;
  title: string;
  text: string;
}

export const beyond: BeyondItem[] = [
  {
    when: 'Jan 2026',
    title: 'Course instructor, Asian Cultures',
    text: 'Designed and co-taught a course on Asian identity through cinema, leading film analysis on culture, migration and class across East and Southeast Asia.',
  },
  {
    when: 'Jun 2023',
    title: 'Volunteer judge, World Robot Olympiad Thailand',
    text: 'Judged on a panel for fair, consistent scoring and organised more than 30 participants through registration and scheduling.',
  },
  {
    when: '2022 – 2023',
    title: 'Teaching assistant, Kasetsart University',
    text: 'Supported junior students with coursework, projects and exam preparation, and ran exams and quizzes.',
  },
];
