/** The dated strip under the hero. Mark the latest stop with `now: true`. */
export interface JourneyStop {
  year: string;
  title: string;
  detail: string;
  place: string;
  now?: boolean;
}

export const journey: JourneyStop[] = [
  { year: '2020', title: 'Starts B.Eng.', detail: 'Computer Engineering & Informatics', place: 'Kasetsart, Sriracha' },
  { year: '2022', title: 'Teaching assistant', detail: 'Tesa Top Gun Rally, Top 10', place: 'Kasetsart, Sriracha' },
  { year: '2023', title: 'ML Engineer intern', detail: 'CARLA Contest, 2nd Runner-Up', place: 'KBTG, Bangkok' },
  { year: '2024', title: 'Data Analyst', detail: 'Graduates with Gold Medal', place: 'AIS, Bangkok' },
  { year: '2025', title: 'Starts M.S. AI & ML', detail: 'On full scholarship', place: 'Skoltech, Moscow' },
  { year: '2026', title: 'AI Engineer', detail: 'Two-tier agent validation', place: 'Genotek, Moscow', now: true },
];
