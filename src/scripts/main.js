document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');

    burger.addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        burger.classList.toggle('open');
        sidebar.classList.toggle('open');
    }
})

