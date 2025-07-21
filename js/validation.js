document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    // Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validate a single field
    function validateField(input) {
        const errorDiv = input.nextElementSibling;
        
        if (input.id === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                input.classList.add('is-invalid');
                errorDiv.style.display = 'block';
                return false;
            }
        }
        
        if (input.required && !input.value.trim()) {
            input.classList.add('is-invalid');
            errorDiv.style.display = 'block';
            return false;
        }
        
        input.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
        return true;
    }
    
    // Check if all fields are valid
    function checkFormValidity() {
        let allValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });
        
        submitButton.disabled = !allValid;
        submitButton.classList.toggle('disabled', !allValid);
    }
    
    // Add event listeners
    inputs.forEach(input => {
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', function () {
            validateField(input);
            checkFormValidity();
        });
        
        // Also validate on input to clear errors as user types
        input.addEventListener('input', function () {
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
            checkFormValidity();
        });
    });
    
    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default initially
    
        // Re-check form validity on submit
        checkFormValidity();
    
        // If form is invalid, do not proceed
        if (submitButton.disabled) return;
    
        // Disable the button and show loading text
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        submitButton.textContent = 'Sending...';
    
        // Remove the submit event listener to avoid recursion
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
    
        // Now submit the form
        newForm.submit();
    });

    // Show success message if redirected from Formspree
    if (window.location.hash === '#success') {
        const successMessage = document.getElementById('submitSuccessMessage');
        if (successMessage) {
            successMessage.classList.remove('d-none');
        }
    }
});