
$(function () {



    const calendarUrl = 'http://localhost:3000/appointments/';
    let newName = $('#name');
    let newSurname = $('#surname');
    let newDay = $('#day');
    let newHour = $('#hour');
    let checkbox = $('#checkbox');
    const button = $('#button');


    function validate(event) {
        event.preventDefault();
        if (newName.length == 0){
            console.log("Błąd");
        }  else if (newSurname.length == 0){
            console.log("Błąd");
        }  else if (newDay.length == 0){
            console.log("Błąd");
        } else if (newHour.length == 0){
            console.log("Błąd");
        } else if (checkbox.checked == false){
            console.log("nic");
        } else {
            addAppointment()
        }
    }


    function addAppointment(event) {
        event.preventDefault();
        
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
            console.log(response);
        });
        generateCalendar(today);
    }

    button.on('click', validate(event));





});