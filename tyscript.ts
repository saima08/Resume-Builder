// Define HTML element types
const cvForm = document.getElementById('cvForm') as HTMLFormElement | null;
const nameInput = document.getElementById('name') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
const ageInput = document.getElementById('age') as HTMLInputElement | null;
const aboutInput = document.getElementById('about') as HTMLInputElement | null;
const objectiveInput = document.getElementById('objective') as HTMLInputElement | null;
const profileImageInput = document.getElementById('profileImage') as HTMLInputElement | null;

const cvName = document.getElementById('cvName') as HTMLElement | null;
const cvEmail = document.getElementById('cvEmail') as HTMLElement | null;
const cvPhone = document.getElementById('cvPhone') as HTMLElement | null;
const cvAge = document.getElementById('cvAge') as HTMLElement | null;
const cvAbout = document.getElementById('cvAbout') as HTMLElement | null;
const cvObjective = document.getElementById('cvObjective') as HTMLElement | null;

const cvEducation = document.getElementById('cvEducation') as HTMLElement | null;
const cvSkills = document.getElementById('cvSkills') as HTMLElement | null;
const cvHobbies = document.getElementById('cvHobbies') as HTMLElement | null;

const resumeContainer = document.getElementById('resumeContainer') as HTMLElement | null;
const formContainer = document.querySelector('.form-container') as HTMLElement | null;
const toggleBtn = document.getElementById('toggleBtn') as HTMLElement | null;
const editBtn = document.getElementById('editBtn') as HTMLElement | null;

// Handle form submission
cvForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const name = nameInput?.value || '';
    const email = emailInput?.value || '';
    const phone = phoneInput?.value || '';
    const age = ageInput?.value || '';
    const about = aboutInput?.value || '';
    const objective = objectiveInput?.value || '';
    const skills = nameInput?.value.split(',') || [];
    const hobbies = (document.getElementById('hobbies') as HTMLInputElement)?.value.split(',') || [];
    const education = (document.getElementById('education') as HTMLInputElement)?.value.split(',') || [];

    // Populate CV fields
    if (cvName) cvName.textContent = name;
    if (cvEmail) cvEmail.textContent = `Email: ${email}`;
    if (cvPhone) cvPhone.textContent = `Phone: ${phone}`;
    if (cvAge) cvAge.textContent = `Age: ${age}`;
    if (cvAbout) cvAbout.textContent = about;
    if (cvObjective) cvObjective.textContent = objective;

    // Dynamically add education
    if (cvEducation) {
        cvEducation.innerHTML = '';
        education.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.trim();
            cvEducation.appendChild(li);
        });
    }

    // Add skills dynamically
    if (cvSkills) {
        cvSkills.innerHTML = '';
        skills.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill.trim();
            cvSkills.appendChild(li);
        });
    }

    // Add hobbies dynamically
    if (cvHobbies) {
        cvHobbies.innerHTML = '';
        hobbies.forEach((hobby) => {
            const li = document.createElement('li');
            li.textContent = hobby.trim();
            cvHobbies.appendChild(li);
        });
    }

    // Handle image update
    const imageFile = profileImageInput?.files?.[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('cvProfileImage') as HTMLImageElement | null;
            if (img && e.target?.result) img.src = e.target.result.toString();
        };
        reader.readAsDataURL(imageFile);
    }

    // Hide the form and show the CV
    if (formContainer) formContainer.style.display = 'none';
    if (resumeContainer) resumeContainer.style.display = 'block';
    if (toggleBtn) toggleBtn.style.display = 'block';
});

// Toggle CV visibility
function toggleResume(): void {
    if (!resumeContainer || !toggleBtn) return;
    if (resumeContainer.style.display === 'none' || resumeContainer.style.display === '') {
        resumeContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide CV';
    } else {
        resumeContainer.style.display = 'none';
        toggleBtn.textContent = 'Show CV';
    }
}

// Edit Resume
function editResume(): void {
    if (formContainer) formContainer.style.display = 'block';
    if (resumeContainer) resumeContainer.style.display = 'none';
    if (toggleBtn) toggleBtn.style.display = 'none';
}

// Share Resume
function shareResume(): void {
    const name = nameInput?.value.replace(/\s+/g, '').toLowerCase() || 'resume';
    const userURL = `https://${name}.vercel.app/resume`;
    navigator.clipboard
        .writeText(userURL)
        .then(() => alert(`Resume link copied to clipboard: ${userURL}`))
        .catch((error) => console.error('Copy failed', error));
}

// Download Resume as PDF
declare const html2pdf: any; // Declare html2pdf globally
function downloadPDF(): void {
    const shareBtn = document.querySelector("button[onclick='shareResume()']") as HTMLButtonElement | null;
    const downloadBtn = document.querySelector("button[onclick='downloadPDF()']") as HTMLButtonElement | null;

    // Hide the buttons
    if (editBtn) editBtn.style.display = 'none';
    if (shareBtn) shareBtn.style.display = 'none';
    if (downloadBtn) downloadBtn.style.display = 'none';

    if (resumeContainer) {
        const name = nameInput?.value || 'resume'; // Use CV name if provided
        const options = {
            margin: 0.5,
            filename: `${name}_resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
        };

        html2pdf()
            .set(options)
            .from(resumeContainer)
            .save()
            .then(() => {
                // Show the buttons again after PDF is generated
                if (editBtn) editBtn.style.display = 'inline-block';
                if (shareBtn) shareBtn.style.display = 'inline-block';
                if (downloadBtn) downloadBtn.style.display = 'inline-block';
            });
    }
}
