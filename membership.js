document.addEventListener("DOMContentLoaded", () => {
    // Select buttons to auto-fill the plan and show the form
    const planButtons = document.querySelectorAll(".select-plan-button");
    const planInput = document.getElementById("membership-type");
    const planInfo = document.querySelector(".selected-plan-info");
    const formContainer = document.querySelector(".membership-form-container");

    planButtons.forEach(button => {
        button.addEventListener("click", function() { // Changed to a regular function
            const selectedPlan = this.dataset.plan; // 'this' now refers to the clicked button
            planInput.value = selectedPlan;
            planInfo.textContent = `Selected plan: ${selectedPlan}`;
            formContainer.style.display = "block"; // Show form when plan is selected
        });
    });

    // Handle form submission and redirect to confirmation page
    const form = document.getElementById("membership-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent actual submission

        const name = form.name.value;
        const email = form.email.value;
        const membershipType = form["membership-type"].value;

        if (!membershipType) {
            alert("Please select a membership plan before submitting.");
            return;
        }

        // Save data to localStorage and redirect
        localStorage.setItem("memberName", name);
        localStorage.setItem("memberPlan", membershipType);

        window.location.href = "confirmation.html";
    });

    // Toggle payment fields visibility based on selection
    const paymentSelect = document.getElementById("payment-method");
    const paypalInfo = document.querySelector(".paypal-info");
    const creditFields = document.querySelectorAll('[data-payment="credit-card"]');

    function togglePaymentFields() {
        if (paymentSelect.value === "paypal") {
            paypalInfo.style.display = "block";
            creditFields.forEach(f => f.parentElement.style.display = "none");
        } else {
            paypalInfo.style.display = "none";
            creditFields.forEach(f => f.parentElement.style.display = "block");
        }
    }

    paymentSelect.addEventListener("change", togglePaymentFields);
    togglePaymentFields(); // Initialize on load
});