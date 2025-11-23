/* File: assets/js/main.js */

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PORTFOLIO FILTERING LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // 2. Add active class to clicked button
            btn.classList.add('active');

            // 3. Get the category to filter by
            const filterValue = btn.getAttribute('data-filter');

            // 4. Loop through items and hide/show based on category
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.style.display = 'block'; // Ensure it's visible
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none'; // Hide after animation potential
                    }, 0);
                }
            });
        });
    });

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--navy-blue)';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
            }
        });
    }

});