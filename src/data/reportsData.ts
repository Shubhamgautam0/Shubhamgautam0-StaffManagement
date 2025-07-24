export interface CustomReport {
  id: string;
  name: string;
  color: string;
  selected: boolean;
  fields?: ReportField[];
}

export interface ReportField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[]; // For dropdown, radio, checkbox fields
}

export interface NewReport {
  id: string;
  name: string;
  assignToAllSites: boolean;
  priority: string;
  fields: ReportField[];
}

export const defaultReports: CustomReport[] = [
  {
    id: '1',
    name: 'office',
    color: 'var(--clr-warning)',
    selected: false,
  },
];

export const priorityColors = {
  high: 'var(--clr-orange)',
  medium: 'var(--clr-warning)',
  low: 'var(--clr-success)',
};

export const fieldTypes = [
  'Text',
  'Number',
  'Date',
  'Time',
  'Email',
  'Phone',
  'Textarea',
  'Dropdown',
  'Checkbox',
  'Radio',
];
