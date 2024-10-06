 // Create a popup element and add it to the body
 const popup = document.createElement('div');
 popup.classList.add('embed-popup');
 document.body.appendChild(popup);

 // Function to get the domain name from a URL
 function getDomain(url) {
     try {
         return new URL(url).hostname.replace('www.', ''); // Remove 'www.' if present
     } catch (error) {
         return 'Unknown';
     }
 }

 // Function to show the popup
 function showPopup(event) {
     const link = event.target.closest('a'); // Ensure it targets the closest <a> element
     if (!link) return;  // Exit if the target is not a link

     const domain = getDomain(link.href);
     const embedContent = `
         <div class="title">${domain}</div>
         <iframe src="${link.href}"></iframe>
     `;
     
     popup.innerHTML = embedContent;

     // Make popup visible and move it near the mouse
     popup.style.display = 'block';
     popup.style.left = event.pageX + 10 + 'px';  // Add offset to prevent overlapping the cursor
     popup.style.top = event.pageY + 10 + 'px';
 }

 // Function to hide the popup
 function hidePopup() {
     popup.style.display = 'none';
 }

 // Attach hover listeners to all <a> elements
 document.querySelectorAll('a').forEach(link => {
     link.addEventListener('mouseenter', showPopup);  // Show popup on hover
     link.addEventListener('mousemove', showPopup);   // Update position as mouse moves
     link.addEventListener('mouseleave', hidePopup);  // Hide popup when leaving the link
 });