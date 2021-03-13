$(function() {

    $('body').on('click', '#register', function() {
        const username = $('#username').val()
        const password = $('#password').val()
        if (username.length === 0 || password.length === 0) {
            return alert("please fill the inputs")
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
                    alert('incorrect username or password')
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