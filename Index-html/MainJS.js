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
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // Position below the link

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


// Track whether we should show the custom menu or the default browser menu
let showCustomMenu = true;

// Add event listener for right-click to show custom menu
document.addEventListener('contextmenu', function(event) {
    // Prevent default right-click behavior if showing custom menu
    if (showCustomMenu) {
        event.preventDefault();

        // If custom menu exists, remove it
        const existingMenu = document.getElementById('customMenu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Create a new custom context menu
        const customMenu = document.createElement('div');
        customMenu.id = 'customMenu';

        // Menu items (custom actions)
        const menuContent = `
            <ul>
                <li onclick="alert('Custom Action 1')">Custom Action 1</li>
                <li onclick="alert('Custom Action 2')">Custom Action 2</li>
                <li onclick="alert('Custom Action 3')">Custom Action 3</li>
                <li onclick="showDefaultMenu(event)">Show Default Right-Click Menu</li>
            </ul>
        `;
        customMenu.innerHTML = menuContent;

        // Position the custom menu at the mouse click location
        customMenu.style.top = `${event.clientY}px`;
        customMenu.style.left = `${event.clientX}px`;
        customMenu.style.display = 'block';
        customMenu.style.position = 'absolute';
        customMenu.style.background = '#fff';
        customMenu.style.border = '1px solid #ccc';
        customMenu.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        customMenu.style.zIndex = '1000';

        // Append the custom menu to the document body
        document.body.appendChild(customMenu);

        // Hide the custom menu when clicking elsewhere
        document.addEventListener('click', function() {
            if (customMenu) {
                customMenu.remove();
            }
        });
    }
});

// Function to show the default right-click menu on demand
function showDefaultMenu(event) {
    // Remove the custom menu
    const customMenu = document.getElementById('customMenu');
    if (customMenu) {
        customMenu.remove();
    }

    // Temporarily disable the custom menu
    showCustomMenu = false;

    // Create and dispatch a new contextmenu event to simulate a right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: event.clientX, // Use the same X position
        clientY: event.clientY  // Use the same Y position
    });

    // Dispatch the contextmenu event to simulate the right-click
    event.target.dispatchEvent(contextMenuEvent);

    // Re-enable the custom menu after the default menu is shown
    document.addEventListener('contextmenu', function() {
        showCustomMenu = true; // Switch back to the custom menu after this
    }, { once: true });
}
