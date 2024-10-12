// script.js

document.querySelectorAll('a').forEach(link => {
    // Check if the link is within a header element
    if (link.closest('header')) {
        return; // Skip this link if it's inside a <header>
    }

    link.addEventListener('mouseenter', function() {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');

        // Create the tooltip content
        const tooltipName = document.createElement('span');
        tooltipName.textContent = link.textContent.trim(); // Set the name from the link text

        // Create the iframe
        const tooltipIframe = document.createElement('iframe');
        tooltipIframe.classList.add('tooltip-iframe');
        tooltipIframe.src = link.href; // Set iframe source to the link URL

        // Append content to tooltip
        tooltip.appendChild(tooltipName);
        tooltip.appendChild(tooltipIframe);

        // Append tooltip to the body
        document.body.appendChild(tooltip);

        // Position the tooltip near the hovered link
        const rect = link.getBoundingClientRect();
        let tooltipLeft = rect.left + window.scrollX; // Calculate left position
        let tooltipTop = rect.bottom + window.scrollY + 5; // Position below the link

        // Set the initial position of the tooltip
        tooltip.style.left = `${tooltipLeft}px`;
        tooltip.style.top = `${tooltipTop}px`;

        // Get tooltip dimensions after it's been added to the DOM
        const tooltipWidth = tooltip.offsetWidth; // Get actual width of the tooltip
        const windowWidth = window.innerWidth; // Get window width

        // Adjust the position if the tooltip is touching the edge of the screen
        if (tooltipLeft + tooltipWidth > windowWidth) {
            tooltipLeft = windowWidth - tooltipWidth - 10; // Move left if touching the right edge
        }
        
        // Check if the tooltip goes beyond the left edge
        if (tooltipLeft < 0) {
            tooltipLeft = 10; // Move it right to ensure it is within the view
        }

        // Update the tooltip position
        tooltip.style.left = `${tooltipLeft}px`;

        // Show tooltip with growing effect
        setTimeout(() => {
            tooltip.style.display = 'block'; // Make tooltip visible
            tooltip.style.width = '300px'; // Set final width for tooltip
            tooltip.style.height = 'auto'; // Allow height to adjust based on content
        }, 10); // Delay to allow the display change to take effect

    });

    link.addEventListener('mouseleave', function() {
        // Remove the tooltip on mouse leave
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove(); // Remove tooltip from the DOM
        }
    });
});
