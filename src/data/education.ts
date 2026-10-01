import type { ImageMetadata } from 'astro';
import skoltech1 from '../assets/education/skoltech-1.jpg';
import skoltech2 from '../assets/education/skoltech-2.jpg';
import kasetsart1 from '../assets/education/kasetsart-1.jpg';
import kasetsart2 from '../assets/education/kasetsart-2.jpg';

/**
 * Optional `images` show in a photo panel at the top of the card (2+ get arrow buttons);
 * put files in src/assets/education/. Optional `videos` show as play buttons.
 */
export interface School {
  dates: string;
  degree: string;
  school: string;
  /** Shown as "GPAX 3.83 / 4.00" with a filled bar */
  gpa?: { value: number; scale: number; label?: string };
  honours: string[];
  images?: { src: ImageMetadata; alt: string; label?: string }[];
  videos?: { label: string; url: string }[];
}

export const education: School[] = [
  {
    dates: 'Sep 2025 – Jun 2027',
    degree: 'Master of Artificial Intelligence and Machine Learning',
    school: 'Skolkovo Institute of Science and Technology (Skoltech), Russia',
    honours: ['HRH Princess Maha Chakri Sirindhorn Scholarship, full funding'],
    images: [
      { src: skoltech1, alt: 'The Skoltech campus in Moscow, with giant SKOLTECH letters on the lawn', label: 'Campus' },
      { src: skoltech2, alt: 'Performing with a band at the Skoltech talent show, Totally Talented', label: 'Talent show' },
    ],
    videos: [
      { label: 'Skoltech tour', url: 'https://www.youtube.com/watch?v=lWxhWcnVZ9g&t=106s' },
      { label: 'Skoltech vlog', url: 'https://www.youtube.com/watch?v=iSDGuMK7ItE&t=1157s' },
    ],
  },
  {
    dates: 'Jul 2020 – Apr 2024',
    degree: 'B.Eng. in Computer Engineering and Informatics',
    school: 'Kasetsart University, Sriracha Campus, Thailand',
    gpa: { value: 3.83, scale: 4, label: 'GPAX' },
    honours: [
      '1st Class Honours with a Gold Medal',
      "Dean's List in Academic Excellence",
      'Distinguished Engineering Student Award, 2023',
    ],
    images: [
      { src: kasetsart1, alt: 'Aerial view of the Kasetsart University campus', label: 'Campus' },
      { src: kasetsart2, alt: 'Graduation day at Kasetsart University with classmates and a professor', label: 'Graduation' },
    ],
  },
];
