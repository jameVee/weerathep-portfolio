export interface School {
  dates: string;
  degree: string;
  school: string;
  /** Shown as "GPAX 3.83 / 4.00" with a filled bar */
  gpa?: { value: number; scale: number; label?: string };
  honours: string[];
}

export const education: School[] = [
  {
    dates: 'Sep 2025 – Jun 2027',
    degree: 'Master of Artificial Intelligence and Machine Learning',
    school: 'Skolkovo Institute of Science and Technology (Skoltech), Russia',
    honours: ['HRH Princess Maha Chakri Sirindhorn Scholarship, full funding'],
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
  },
];
