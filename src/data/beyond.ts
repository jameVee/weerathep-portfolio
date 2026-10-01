import type { ImageMetadata } from 'astro';
import asianCultures1 from '../assets/beyond/asian-cultures-1.jpg';
import asianCultures2 from '../assets/beyond/asian-cultures-2.jpg';
import wro1 from '../assets/beyond/wro-2023-1.jpg';
import wro2 from '../assets/beyond/wro-2023-2.jpg';
import wro3 from '../assets/beyond/wro-2023-3.jpg';

/**
 * "Beyond work": teaching, judging, volunteering. Newest first.
 * Optional `images` show as small thumbnails under the text (put files in src/assets/beyond/).
 */
export interface BeyondItem {
  when: string;
  title: string;
  text: string;
  images?: { src: ImageMetadata; alt: string }[];
}

export const beyond: BeyondItem[] = [
  {
    when: 'Jan 2026',
    title: 'Course instructor, Asian Cultures',
    text: 'Designed and co-taught a course on Asian identity through cinema, leading film analysis on culture, migration and class across East and Southeast Asia.',
    images: [
      { src: asianCultures1, alt: 'Teaching the Asian Cultures class, pointing at a slide about Bangkok' },
      { src: asianCultures2, alt: 'Group photo with the Asian Cultures class at Skoltech' },
    ],
  },
  {
    when: 'Jun 2023',
    title: 'Volunteer judge, World Robot Olympiad Thailand',
    text: 'Judged on a panel for fair, consistent scoring and organised more than 30 participants through registration and scheduling.',
    images: [
      { src: wro1, alt: 'Judging a team’s robot run at World Robot Olympiad Thailand 2023' },
      { src: wro2, alt: 'Recording scores beside a competition table at World Robot Olympiad Thailand 2023' },
      { src: wro3, alt: 'Volunteer certificate from World Robot Olympiad Thailand 2023, Central Si Racha, 24 to 25 June 2023' },
    ],
  },
  {
    when: '2022 – 2023',
    title: 'Teaching assistant, Kasetsart University',
    text: 'Supported junior students with coursework, projects and exam preparation, and ran exams and quizzes.',
  },
];
