export interface Application {
  name: string;
  email: string;
  skills: string;
  message: string;
}

export const applications: Application[] = [
  { name: 'undefined', email: 'undefined', skills: 'undefined', message: 'undefined' },
  { name: 'undefined', email: 'undefined', skills: 'undefined', message: 'undefined' },
];

export let currentIndex = -1;

export function resetCurrentIndex(): void {
  currentIndex = -1;
}

export function setCurrentIndex(index: number): void {
  currentIndex = index;
}

export function addApplication(application: Application): void {
  applications.push(application);
}

export function updateApplication(index: number, application: Application): void {
  applications[index] = application;
}

export function deleteApplication(index: number): void {
  applications.splice(index, 1);
}