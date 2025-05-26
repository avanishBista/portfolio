document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // Matrix Background
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const drops = Array(Math.floor(canvas.width/10)).fill(0);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.font = '14px monospace';

        drops.forEach((y, i) => {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i*10, y);
            drops[i] = y > canvas.height ? 0 : y + 10;
        });
    }
    setInterval(drawMatrix, 100);

    // Eye follow logic
    document.addEventListener('mousemove', (e) => {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width/2;
            const eyeY = rect.top + rect.height/2;
            const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
            const distance = Math.min(8, 
                Math.sqrt((e.clientX - eyeX)**2 + (e.clientY - eyeY)**2)/30
            );
            
            const pupil = eye.querySelector('.pupil');
            pupil.style.transform = `translate(
                ${distance * Math.cos(angle)}px,
                ${distance * Math.sin(angle)}px
            )`;
        });
    });

    // Glitch effect
    setInterval(() => {
        const glitch = document.querySelector('.hacker-glitch');
        glitch.style.opacity = Math.random();
        setTimeout(() => glitch.style.opacity = 0, 50);
    }, 3000);

    // Initialize other components
    const typewriter = document.querySelector('.typewriter');
    const messages = [
        "$> Establishing secure connection...",
        "$> Initializing network protocols...",
        "$> Scanning for vulnerabilities...",
        "$> System secure and operational"
    ];
    let currentMessage = 0;

    function typeNextMessage() {
        typewriter.style.animation = 'none';
        void typewriter.offsetWidth;
        typewriter.style.animation = null;
        typewriter.textContent = messages[currentMessage];
        currentMessage = (currentMessage + 1) % messages.length;
    }
    setInterval(typeNextMessage, 4000);
});