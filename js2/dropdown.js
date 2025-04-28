
document.addEventListener('DOMContentLoaded', function () {
    // Find all dropdown buttons on the page
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    // Add click event listener to each button
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the dropdown content element that follows this button
            const content = this.nextElementSibling;

            // Toggle aria-expanded attribute
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            // Toggle the show class on the content
            content.classList.toggle('show');

            // You can add additional logic here if needed, such as:
            // - Closing other open dropdowns when a new one is clicked
            // - Adding focus management for accessibility
            // - Handling keyboard navigation
        });
    });

    // Optional: Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        // Check if the click was outside any dropdown
        if (!event.target.closest('.dropdown-container')) {
            // Close all open dropdowns
            const openContents = document.querySelectorAll('.dropdown-content.show');
            const expandedButtons = document.querySelectorAll('.dropdown-btn[aria-expanded="true"]');

            openContents.forEach(content => {
                content.classList.remove('show');
            });

            expandedButtons.forEach(button => {
                button.setAttribute('aria-expanded', 'false');
            });
        }
    }, true);

    // Optional: Add keyboard support
    dropdownButtons.forEach(button => {
        button.addEventListener('keydown', function (event) {
            // Handle keyboard events for accessibility
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            } else if (event.key === 'Escape') {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    this.setAttribute('aria-expanded', 'false');
                    this.nextElementSibling.classList.remove('show');
                }
            }
        });
    });
});


document.getElementById("dropdownGift").innerHTML = `
<div class="dropdown-container" style="text-align: center;">
<button class="dropdown-btn" aria-expanded="false" >
<span style="width:100%; font-size:25px;">Ver mas</span>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    class="dropdown-icon bi bi-chevron-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
</svg>
</button>
<div class="dropdown-content">
<p>Buzón de sobres en el salón</p>
<p>Mercado pago:CVU: 0000003100030615441020</p>
  <p>  Alias: sofi.juan.041025</p>
<p> ING España: ES58 1465 0120 35 1759782005</p>
</div>
</div>
`;