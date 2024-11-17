// Define HTML element types
var cvForm = document.getElementById('cvForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var ageInput = document.getElementById('age');
var aboutInput = document.getElementById('about');
var objectiveInput = document.getElementById('objective');
var profileImageInput = document.getElementById('profileImage');
var cvName = document.getElementById('cvName');
var cvEmail = document.getElementById('cvEmail');
var cvPhone = document.getElementById('cvPhone');
var cvAge = document.getElementById('cvAge');
var cvAbout = document.getElementById('cvAbout');
var cvObjective = document.getElementById('cvObjective');
var cvEducation = document.getElementById('cvEducation');
var cvSkills = document.getElementById('cvSkills');
var cvHobbies = document.getElementById('cvHobbies');
var resumeContainer = document.getElementById('resumeContainer');
var formContainer = document.querySelector('.form-container');
var toggleBtn = document.getElementById('toggleBtn');
var editBtn = document.getElementById('editBtn');
// Handle form submission
cvForm === null || cvForm === void 0 ? void 0 : cvForm.addEventListener('submit', function (event) {
    var _a, _b, _c;
    event.preventDefault();
    // Get form values
    var name = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || '';
    var email = (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || '';
    var phone = (phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value) || '';
    var age = (ageInput === null || ageInput === void 0 ? void 0 : ageInput.value) || '';
    var about = (aboutInput === null || aboutInput === void 0 ? void 0 : aboutInput.value) || '';
    var objective = (objectiveInput === null || objectiveInput === void 0 ? void 0 : objectiveInput.value) || '';
    var skills = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.split(',')) || [];
    var hobbies = ((_a = document.getElementById('hobbies')) === null || _a === void 0 ? void 0 : _a.value.split(',')) || [];
    var education = ((_b = document.getElementById('education')) === null || _b === void 0 ? void 0 : _b.value.split(',')) || [];
    // Populate CV fields
    if (cvName)
        cvName.textContent = name;
    if (cvEmail)
        cvEmail.textContent = "Email: ".concat(email);
    if (cvPhone)
        cvPhone.textContent = "Phone: ".concat(phone);
    if (cvAge)
        cvAge.textContent = "Age: ".concat(age);
    if (cvAbout)
        cvAbout.textContent = about;
    if (cvObjective)
        cvObjective.textContent = objective;
    // Dynamically add education
    if (cvEducation) {
        cvEducation.innerHTML = '';
        education.forEach(function (item) {
            var li = document.createElement('li');
            li.textContent = item.trim();
            cvEducation.appendChild(li);
        });
    }
    // Add skills dynamically
    if (cvSkills) {
        cvSkills.innerHTML = '';
        skills.forEach(function (skill) {
            var li = document.createElement('li');
            li.textContent = skill.trim();
            cvSkills.appendChild(li);
        });
    }
    // Add hobbies dynamically
    if (cvHobbies) {
        cvHobbies.innerHTML = '';
        hobbies.forEach(function (hobby) {
            var li = document.createElement('li');
            li.textContent = hobby.trim();
            cvHobbies.appendChild(li);
        });
    }
    // Handle image update
    var imageFile = (_c = profileImageInput === null || profileImageInput === void 0 ? void 0 : profileImageInput.files) === null || _c === void 0 ? void 0 : _c[0];
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var img = document.getElementById('cvProfileImage');
            if (img && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result))
                img.src = e.target.result.toString();
        };
        reader.readAsDataURL(imageFile);
    }
    // Hide the form and show the CV
    if (formContainer)
        formContainer.style.display = 'none';
    if (resumeContainer)
        resumeContainer.style.display = 'block';
    if (toggleBtn)
        toggleBtn.style.display = 'block';
});
// Toggle CV visibility
function toggleResume() {
    if (!resumeContainer || !toggleBtn)
        return;
    if (resumeContainer.style.display === 'none' || resumeContainer.style.display === '') {
        resumeContainer.style.display = 'block';
        toggleBtn.textContent = 'Hide CV';
    }
    else {
        resumeContainer.style.display = 'none';
        toggleBtn.textContent = 'Show CV';
    }
}
// Edit Resume
function editResume() {
    if (formContainer)
        formContainer.style.display = 'block';
    if (resumeContainer)
        resumeContainer.style.display = 'none';
    if (toggleBtn)
        toggleBtn.style.display = 'none';
}
// Share Resume
function shareResume() {
    var name = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.replace(/\s+/g, '').toLowerCase()) || 'resume';
    var userURL = "https://".concat(name, ".vercel.app/resume");
    navigator.clipboard
        .writeText(userURL)
        .then(function () { return alert("Resume link copied to clipboard: ".concat(userURL)); })
        .catch(function (error) { return console.error('Copy failed', error); });
}
function downloadPDF() {
    var shareBtn = document.querySelector("button[onclick='shareResume()']");
    var downloadBtn = document.querySelector("button[onclick='downloadPDF()']");
    // Hide the buttons
    if (editBtn)
        editBtn.style.display = 'none';
    if (shareBtn)
        shareBtn.style.display = 'none';
    if (downloadBtn)
        downloadBtn.style.display = 'none';
    if (resumeContainer) {
        var name_1 = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || 'resume'; // Use CV name if provided
        var options = {
            margin: 0.5,
            filename: "".concat(name_1, "_resume.pdf"),
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
        };
        html2pdf()
            .set(options)
            .from(resumeContainer)
            .save()
            .then(function () {
            // Show the buttons again after PDF is generated
            if (editBtn)
                editBtn.style.display = 'inline-block';
            if (shareBtn)
                shareBtn.style.display = 'inline-block';
            if (downloadBtn)
                downloadBtn.style.display = 'inline-block';
        });
    }
}
