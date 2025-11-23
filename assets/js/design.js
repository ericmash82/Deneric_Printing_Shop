/* File: assets/js/design.js */

// --- VARIABLES ---
const imageUpload = document.getElementById('imageUpload');
const userDesign = document.getElementById('user-design');
const productImage = document.getElementById('product-image');
const adjustmentsPanel = document.getElementById('adjustments-panel');
const productTint = document.getElementById('product-tint');
const priceDisplay = document.getElementById('display-price');

// Control Groups
const controlsTshirt = document.getElementById('controls-tshirt');
const controlsBanner = document.getElementById('controls-banner');
const controlsMug = document.getElementById('controls-mug');

// Dropdowns
const bannerSelect = document.getElementById('banner-select');
const mugSelect = document.getElementById('mug-select');

// Sliders
const sizeSlider = document.getElementById('sizeSlider');
const xSlider = document.getElementById('xSlider');
const ySlider = document.getElementById('ySlider');

// --- PRICING DATABASE (Edit these prices as needed) ---
const prices = {
    tshirt: 1000, // Base price for any T-shirt
    banner: {
        'rollup-std': 5500,
        'broadbase': 8500,
        'xbanner': 3500,
        'backdrop': 15000
    },
    mug: {
        'white': 600,
        'magic': 1200,
        'twotone': 800,
        'cone': 1000
    }
};

let currentProduct = 'tshirt'; // Default selection

// --- 1. CHANGE PRODUCT LOGIC ---
function changeProduct(productType) {
    currentProduct = productType;

    // A. Update Active Button State
    document.querySelectorAll('.prod-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // B. Hide All Control Sections
    controlsTshirt.style.display = 'none';
    controlsBanner.style.display = 'none';
    controlsMug.style.display = 'none';

    // C. Reset Tint (Banners/Mugs don't use color swatches)
    productTint.style.backgroundColor = 'transparent';

    // D. Show Correct Controls & Image
    if(productType === 'tshirt') {
        productImage.src = 'assets/images/products/tshirt-blank.jpg';
        controlsTshirt.style.display = 'block';
    } 
    else if (productType === 'banner') {
        productImage.src = 'assets/images/products/banner-blank.jpg';
        controlsBanner.style.display = 'block';
    } 
    else if (productType === 'mug') {
        productImage.src = 'assets/images/products/mug-blank.jpg';
        controlsMug.style.display = 'block';
    }

    // E. Update Price immediately
    updatePrice();
}

// --- 2. UPDATE PRICE LOGIC ---
function updatePrice() {
    let cost = 0;

    if (currentProduct === 'tshirt') {
        cost = prices.tshirt; 
    } 
    else if (currentProduct === 'banner') {
        const type = bannerSelect.value;
        cost = prices.banner[type];
    } 
    else if (currentProduct === 'mug') {
        const type = mugSelect.value;
        cost = prices.mug[type];
    }

    // Format Number with Commas (e.g., 1,200)
    priceDisplay.innerText = "KES " + cost.toLocaleString();
}

// --- 3. COLOR CHANGER (For T-Shirts) ---
function changeColor(colorCode) {
    productTint.style.backgroundColor = colorCode;
    
    // Visual update for Swatches
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// --- 4. FILE UPLOAD LOGIC ---
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            userDesign.src = e.target.result;
            userDesign.style.display = 'block';
            adjustmentsPanel.classList.add('active'); // Enable sliders
        }
        
        reader.readAsDataURL(file);
    }
});

// --- 5. SLIDER ADJUSTMENT LOGIC ---
sizeSlider.addEventListener('input', updateDesign);
xSlider.addEventListener('input', updateDesign);
ySlider.addEventListener('input', updateDesign);

function updateDesign() {
    userDesign.style.width = sizeSlider.value + 'px';
    userDesign.style.top = ySlider.value + '%';
    userDesign.style.left = xSlider.value + '%';
}

// Initialize on Load
updatePrice();


// --- 6. TRANSFER TO QUOTE PAGE LOGIC ---
function transferToQuote() {
    // 1. Gather the details
    const product = currentProduct; // 'tshirt', 'banner', etc.
    const price = document.getElementById('display-price').innerText;
    
    // 2. Build a description string based on what is visible
    let details = "";
    
    if (product === 'tshirt') {
        const size = document.querySelector('#controls-tshirt .form-select').value;
        // Find active color
        let color = "Default";
        document.querySelectorAll('.swatch').forEach(s => {
            if(s.classList.contains('active')) color = s.title;
        });
        details = `T-Shirt (Color: ${color}, Size: ${size})`;
    } 
    else if (product === 'banner') {
        const type = document.getElementById('banner-select');
        const typeName = type.options[type.selectedIndex].text;
        details = `Banner: ${typeName}`;
    }
    else if (product === 'mug') {
        const type = document.getElementById('mug-select');
        const typeName = type.options[type.selectedIndex].text;
        details = `Mug: ${typeName}`;
    }

    // 3. Create the URL with data attached
    // We use encodeURIComponent to make sure spaces/symbols don't break the link
    const url = `quote.html?service=${product}&details=${encodeURIComponent(details)}&price=${encodeURIComponent(price)}`;

    // 4. Go there!
    window.location.href = url;
}