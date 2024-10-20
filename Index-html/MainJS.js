// script.js
function navbarshow(){
    const allPages = [
        { href: 'Index.html', text: 'Home' },
        { href: 'about.html', text: 'About' },
        { href: 'games.html', text: 'Games' },
        { href: '90s.html', text: "90's Style Site" },
        { href: 'Playdraw.html', text: 'Draw!' } // Add more pages here
    ];

    // Function to create and insert the header
    function addHeader() {
        const header = document.createElement('header');
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        // Create the list items for all pages
        allPages.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        header.appendChild(nav);
        document.body.insertBefore(header, document.body.firstChild);
    }

    // Execute the function to add the header
    addHeader();
};
navbarshow();

function alttooltooltip(){
     // Dynamically create the AltToolTip div
     const AltToolTip = document.createElement('div');
     AltToolTip.className = 'AltToolTip';
     document.body.appendChild(AltToolTip);

     const images = document.querySelectorAll('img');

     images.forEach(image => {
         image.addEventListener('mouseenter', (e) => {
             const altText = image.getAttribute('alt');
             AltToolTip.textContent = altText;
             AltToolTip.style.display = 'flex';
             AltToolTip.style.visibility = 'visible';
             AltToolTip.style.opacity = '1';
         });

         image.addEventListener('mousemove', (e) => {
             // Position the AltToolTip near the mouse cursor
             AltToolTip.style.left = (e.pageX + 10) + 'px'; // Offset to the right
             AltToolTip.style.top = (e.pageY + 10) + 'px'; // Offset below
         });

         image.addEventListener('mouseleave', () => {
             AltToolTip.style.visibility = 'hidden';
             AltToolTip.style.display = 'none';
             AltToolTip.style.opacity = '0';
         });
     });
}
alttooltooltip();

function handleBrokenImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
        img.onerror = function() {
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = "Image not found, link is broken, or connection offline";
            errorMessage.style.color = "rgb(200, 0, 0)";
            errorMessage.style.textDecoration = "underline";

            img.replaceWith(errorMessage);
        };
    });
}

// Call the broken image handler
handleBrokenImages();

function HtmlLinkToolTip() {
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
        tooltipName.textContent = link.textContent.trim(); 
        // Set the name from the link text

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
};
HtmlLinkToolTip();

function CustomContextRunner() {
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
                <li onclick="showDefaultMenu()">Show Default Right-Click Menu</li>
            </ul>
        `;
        customMenu.innerHTML = menuContent;

        // Position the custom menu at the mouse click location
        customMenu.style.top = `${event.clientY}px`;
        customMenu.style.left = `${event.clientX}px`;
        customMenu.style.display = 'block';

        // Append the custom menu to the document body
        document.body.appendChild(customMenu);

        // Hide the custom menu when clicking elsewhere
        document.addEventListener('click', function() {
            customMenu.style.display = 'none';
        });
    }
});

// Function to show default right-click menu on demand
function showDefaultMenu() {
    // Remove the custom menu
    const customMenu = document.getElementById('customMenu');
    if (customMenu) {
        customMenu.remove();
    }

    // Temporarily allow the default right-click menu
    showCustomMenu = false;

    // Add a one-time event listener to show default context menu
    document.addEventListener('contextmenu', function(event) {
        showCustomMenu = true;  // Revert back to showing custom menu after this
    }, { once: true });
}

}
CustomContextRunner();