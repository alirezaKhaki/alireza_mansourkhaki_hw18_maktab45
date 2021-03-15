$(function() {
    $('body').on('click', '#signup', function() {
        window.location.href = '/api/register'
    })
    $('body').on('click', '#register', function() {
        const username = $('#username').val()
        const password = $('#password').val()
        if (username.length === 0 || password.length === 0) {
            return $('.modal-body').html(''), $('.modal-body').html('please fill the inputs'), $("#triger").click();
        }

        const newUser = {
            username: username,
            password: password
        }


        $.ajax({
            type: "POST",
            url: "/api/login",
            data: newUser,
            success: function(data) {
                console.log(data.msg);
                if (data.msg === 'login sucssesfull') {
                    alert('login successfull you will now redirect to your dashboard')

                    window.location.href = '/api/dashboard'


                } else if (data.msg === 'incorrect username or password') {
                    $('.modal-body').html('')
                    $('.modal-body').html('incorrect username or password')
                    $("#triger").click();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    alert('user already exist')
                }

            }

        });
    })
});
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    console.log(1);
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}