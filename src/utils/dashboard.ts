export interface ApplicationStatus {
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  submissionDate: string;
  documents: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

export function getApplicationStatus(): ApplicationStatus {
  // Simulate API call to get status
  return {
    status: 'under_review',
    submissionDate: '2024-03-15',
    documents: [
      {
        name: 'Resume.pdf',
        type: 'pdf',
        url: '#'
      }
    ]
  };
}

export function updateDashboard(): void {
  const status = getApplicationStatus();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Update status card
  document.getElementById('applicationStatus')!.textContent = status.status.replace('_', ' ').toUpperCase();
  document.getElementById('submissionDate')!.textContent = status.submissionDate;

  // Update documents list
  const documentsList = document.getElementById('documentsList');
  if (documentsList) {
    documentsList.innerHTML = status.documents.map(doc => `
      <li class="flex items-center justify-between">
        <span class="text-gray-300">
          <i class="fas fa-file-pdf text-red-400 mr-2"></i>
          ${doc.name}
        </span>
        <a href="${doc.url}" class="text-primary-400 hover:text-primary-300">
          <i class="fas fa-download"></i>
        </a>
      </li>
    `).join('');
  }

  // Update profile details
  document.getElementById('profileName')!.textContent = user.name || '';
  document.getElementById('profileEmail')!.textContent = user.email || '';
}