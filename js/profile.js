document.addEventListener("DOMContentLoaded", () => {
    const profileImgInput = document.getElementById("profile-img");
    const profilePreview = document.getElementById("profilePreview");

    profileImgInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const cancelBtn = document.querySelector(".cancel-btn");
    const saveBtn = document.querySelector(".save-btn");

    cancelBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to discard changes?")) {
            window.location.reload();
        }
    });

    document.querySelector(".profile-form").addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Profile updated successfully!");
    });
});
