$(function () {

    const makeAppointment = $('#umowSie');
    const prev = $('#prev');
    const next = $('#next');

    makeAppointment.next().slideUp()
    prev.slideUp()
    next.slideUp()

    makeAppointment.on('click', event => {
        $(event.currentTarget).next().slideToggle();

    });

    const calendar = $('#calendar');

    calendar.next().slideUp()

    calendar.on('click', event => {
        $(event.currentTarget).next().slideToggle();
        prev.slideToggle();
        next.slideToggle();
        generateCalendar(today, month)
    });

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth()+1).padStart(2, '0');
    const today = new Date().getDate();
    console.log(today);
   // console.log(today.getFullYear());

    const currentCal = $('#currentCalendar');
    const hours = ['10:00', '12:00', '14:00', '16:00', '18:00']

    function generateCalendar(today, month) {
        const toDelete = $('.calendarContainer');
        toDelete.remove();


        const mainDiv = $('<div>', {class: "calendarContainer"});
        currentCal.append(mainDiv);
        const div = $('<div>', {class: "nodate"});
        mainDiv.append(div)
        for (let j = 0; j < hours.length; j++) {
            const div = $('<div>', {class: "nodate"}).text(hours[j]);
            mainDiv.append(div);
        }
        for (let i=0; i<7; i++) {
            const mainDiv = $('<div>', {class: "calendarContainer"});
            currentCal.append(mainDiv);
            const longMonth = ['01', '03', '05', '07', '08', '10', '12'];
            const shortMonth = ['02', '04', '06', '09', '11'];
            const dayOfWeek = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
            if (longMonth.indexOf(month)=== -1 && Number(today+i)>=61) {
                const newMonth = String(Number(month)+3).padStart(2, '0');
                const newDay = String(today+i-60).padStart(2, '0');
                const dayDiv = $('<div>', {class: "nodate"}).text(year + "-" + newMonth + "-" + newDay);
                mainDiv.append(dayDiv);
            } else if(shortMonth.indexOf(month)=== -1 && Number(today+i)>=62) {
                const newMonth = String(Number(month)+2).padStart(2, '0');
                const newDay = String(today+i-61).padStart(2, '0');
                const dayDiv = $('<div>', {class: "nodate"}).text(year + "-" + newMonth + "-" + newDay);
                mainDiv.append(dayDiv);
            }  else if (longMonth.indexOf(month)=== -1 && Number(today+i)>=31) {
                const newMonth = String(Number(month)+2).padStart(2, '0');
                const newDay = String(today+i-30).padStart(2, '0');
                const dayDiv = $('<div>', {class: "nodate"}).text(year + "-" + newMonth + "-" + newDay);
                mainDiv.append(dayDiv);
            } else if(shortMonth.indexOf(month)=== -1 && Number(today+i)>=32) {
                const newMonth = String(Number(month)+1).padStart(2, '0');
                const newDay = String(today+i-31).padStart(2, '0');
                const dayDiv = $('<div>', {class: "nodate"}).text(year + "-" + newMonth + "-" + newDay);
                mainDiv.append(dayDiv);
            }else {
                const dayDiv = $('<div>', {class: "nodate"}).text(year + "-" + month + "-" + Number(today + i));
                mainDiv.append(dayDiv);
            }

            for (let j = 0; j < hours.length; j++) {




                const div = $('<div>', {class: "nodate"}).attr('data-day', mainDiv.children().eq(0).text()).attr('data-hour', hours[j]);
                mainDiv.append(div);

            }
            const exDayDiv = $('<div>', {class: "nodate"}).text(dayOfWeek[new Date().getDay()+i-1]);
            mainDiv.append(exDayDiv);
        }
        getApointment()
    }

    function getApointment() {
        console.log("Aniaa");
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/appointments/',
            dataType: 'json',
        }).done(insertContent);
    };
    function insertContent(appointments) {
        for (var app of appointments){
            console.log("Aniaaa");
            const day = app.day;
            const hour = app.hour;
            const name = app.name;
            const surname = app.surname;
            $(`[data-day="${day}"][data-hour="${hour}"]`).addClass("activ").text(name, surname);
        }
    }


    const calendarUrl = 'http://localhost:3000/appointments/';
    let newName = $('#name');
    let newSurname = $('#surname');
    let newDay = $('#day');
    let newHour = $('#hour');
    let checkbox = $('#checkbox');
    const info = $('#info')
    const button = $('#button');


    function validate(event) {
        event.preventDefault();


        let error = false;
        let errorMessage = [];

        if (newName.val().length === 0){
            error = true,
            errorMessage.push('Proszę uzupełnić wszystkie pola;) Pole "imię" jest puste');
        }
        if (newSurname.val().length === 0){
            error = true,
            errorMessage.push('Proszę uzupełnić wszystkie pola;) Pole "nazwisko" jest puste');
        }
        if (newHour.val().length === 0){
            error = true,
            errorMessage.push('Proszę uzupełnić wszystkie pola;) Pole "godzina" jest puste');
        }
        if (newDay.val().length === 0){
            error = true,
            errorMessage.push('Proszę uzupełnić wszystkie pola;) Pole "dzień" jest puste');
        }
        if (checkbox.checked === false){
            error = true,
            errorMessage.push('Żeby dodać spotkanie musisz wyrazić zgodę na przetwarzanie danych:) ');
        }
        if (error){
            info.text(...errorMessage);
        }
        if (error === false) {
            addAppointment(event);
            info.text("Dodano spotkanie")
        }
    }

    function addAppointment(event) {
        event.preventDefault();
        console.log("Ania");
        const newApp = {
            name: newName.val(),
            surname: newSurname.val(),
            day: newDay.val(),
            hour: newHour.val(),
        };
        console.log(newApp);

        $.ajax({
            method: "POST",
            url: calendarUrl,
            dataType: "json",
            data: newApp
        }).done(function(response) {
            //console.log(response);
        });
     generateCalendar(today, month)
    }

    button.on('click', validate);

    let click = 0;

    function changePlus() {
        if(click <8) {
            click = click + 1;
            let day = today + 7 * click;
            generateCalendar(day, month)
        }return click
    }

    function changeMinus() {
          if (click >= 1) {
            click = click - 1;
            let day = today + 7 * click;
            generateCalendar(day, month);
            return click;
            }
    }

  next.on('click', changePlus);
    prev.on('click', changeMinus);


});