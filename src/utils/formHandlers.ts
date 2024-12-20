import { applications, currentIndex, addApplication, updateApplication, resetCurrentIndex, type Application } from './applications';

export function submitApplication(): void {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
  const message = (document.getElementById('message') as HTMLTextAreaElement).value;

  if (!name || !email || !skills || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const application: Application = { name, email, skills, message };

  if (currentIndex === -1) {
    addApplication(application);
    alert('Application submitted successfully!');
  } else {
    updateApplication(currentIndex, application);
    alert('Application updated successfully!');
  }

  updateTable();
  resetForm();
  closeApplicationForm();
}

export function resetForm(): void {
  (document.getElementById('applicationFormFields') as HTMLFormElement).reset();
  document.getElementById('updateButton')!.style.display = 'none';
  document.getElementById('deleteButton')!.style.display = 'none';
  resetCurrentIndex();
}

export function updateTable(): void {
  const tableBody = document.getElementById('applicationsTable');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  applications.forEach((application, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-2 px-4">${application.name}</td>
      <td class="py-2 px-4">${application.email}</td>
      <td class="py-2 px-4">${application.skills}</td>
      <td class="py-2 px-4">${application.message}</td>
      <td class="py-2 px-4">
        <button class="px-2 py-1 bg-yellow-500 text-white rounded-lg" onclick="window.editApplication(${index})">Edit</button>
        <button class="px-2 py-1 bg-red-600 text-white rounded-lg" onclick="window.deleteApplication(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

export function saveApplicationAsJson(): void {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
  const message = (document.getElementById('message') as HTMLTextAreaElement).value;
  const resumeFile = (document.getElementById('resume') as HTMLInputElement).files?.[0];

  if (!name || !email || !skills || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const applicationData = {
    name,
    email,
    skills,
    message,
    resume: resumeFile ? resumeFile.name : null,
  };

  const jsonData = JSON.stringify(applicationData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'application.json';
  link.click();

  if (resumeFile) {
    const resumeLink = document.createElement('a');
    resumeLink.href = URL.createObjectURL(resumeFile);
    resumeLink.download = resumeFile.name;
    resumeLink.click();
  }
}