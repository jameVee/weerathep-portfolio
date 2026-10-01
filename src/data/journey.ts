/** The dated strip under the hero. Mark the latest stop with `now: true`. */
export interface JourneyStop {
  year: string;
  title: string;
  place: string;
  now?: boolean;
}

export const journey: JourneyStop[] = [
  { year: '2020', title: 'Starts B.Eng.', place: 'Kasetsart, Sriracha' },
  { year: '2023', title: 'ML Engineer intern', place: 'KBTG, Bangkok' },
  { year: '2024', title: 'Data Analyst', place: 'AIS, Bangkok' },
  { year: '2025', title: 'Starts M.S. AI & ML', place: 'Skoltech, Moscow' },
  { year: '2026', title: 'AI Engineer', place: 'Genotek, Moscow', now: true },
];
