/** The four numbers under the hero. `small` is the greyed suffix, e.g. "/4.00". */
export interface Fact {
  value: string;
  small?: string;
  text: string;
}

export const facts: Fact[] = [
  { value: '3.83', small: '/4.00', text: 'GPAX, 1st Class Honours with Gold Medal' },
  { value: '3', text: 'Industry roles across genomics, telecom and fintech' },
  { value: '+58%', text: 'Service availability from a failure-prediction model at KBTG' },
  { value: 'Full', text: 'HRH Princess Maha Chakri Sirindhorn Scholarship' },
];
