// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Initialize EmailJS
emailjs.init("ZgFUYr7XIJwubbdvX"); // Replace with your actual public key from EmailJS dashboard

// Typed.js initialization
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Backend Developer', 'Frontend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* toggle icon navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/* scroll sections active links */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*sticky navbar*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* remove toggle icon and navbar when click navbar (scroll) */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('input[type="submit"]');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!fullName || !email || !mobile || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(mobile)) {
        alert('Please enter a valid phone number');
        return;
    }

    try {
        // Show loading state
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        const templateParams = {
            from_name: fullName,
            from_email: email,
            phone_number: mobile,
            subject: subject,
            message: message,
            to_name: 'service_td3b8l6'
        };

        await emailjs.send(
            'service_td3b8l6', // Replace with your service ID from EmailJS
            'template_azrmxn8', // Replace with your template ID from EmailJS
            templateParams
        );
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        alert('Failed to send message. Please try again later.');
        console.error('Error:', error);
    } finally {
        // Reset button state
        submitBtn.value = 'Send Message';
        submitBtn.disabled = false;
    }
});


