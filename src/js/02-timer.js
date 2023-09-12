document.addEventListener("DOMContentLoaded", function () {
    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            const currentDate = new Date();
            
            if (selectedDate <= currentDate) {
                alert("Please choose a date in the future");
            } else {
                startButton.disabled = false;
                countdown(selectedDate);
            }
        },
    };

    const datetimePicker = document.getElementById("datetime-picker");
    flatpickr(datetimePicker, options);

    const startButton = document.querySelector('[data-start]');
    startButton.disabled = true;
    startButton.addEventListener('click', () => {
        const selectedDate = datetimePicker._flatpickr.selectedDates[0];
        countdown(selectedDate);
    });

    function countdown(endDate) {
        const intervalId = setInterval(updateTimer, 1000);

        function updateTimer() {
            const currentDate = new Date();
            const timeRemaining = endDate - currentDate;

            if (timeRemaining <= 0) {
                clearInterval(intervalId);
                updateTimerDisplay(0, 0, 0, 0);
                alert("Timer has ended!");
                startButton.disabled = true;
            } else {
                const { days, hours, minutes, seconds } = convertMs(timeRemaining);
                updateTimerDisplay(days, hours, minutes, seconds);
            }
        }

        function updateTimerDisplay(days, hours, minutes, seconds) {
            document.querySelector('[data-days]').textContent = padNumber(days);
            document.querySelector('[data-hours]').textContent = padNumber(hours);
            document.querySelector('[data-minutes]').textContent = padNumber(minutes);
            document.querySelector('[data-seconds]').textContent = padNumber(seconds);
        }

        function padNumber(number) {
            return number.toString().padStart(2, '0');
        }
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor((ms % hour) / minute);
        const seconds = Math.floor((ms % minute) / second);

        return { days, hours, minutes, seconds };
    }
});