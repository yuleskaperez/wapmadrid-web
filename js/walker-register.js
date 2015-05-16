function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCredentials() {
    var id = getCookie("id");
    var token = getCookie("token");
    if (id == "" || token == "") {
        window.location.href = "index.html"
    }
}

function registerWalker(id_in, token_in) {
    var password = document.getElementById('Password').value;
    var username = document.getElementById('Username').value;
    var route = document.getElementById('Route').value;
    var name = document.getElementById('Name').value;
    var image = document.getElementById('Image').value;
    var address = document.getElementById('Address').value;
    var telephone = document.getElementById('Telephone').value;
    var openingHours = document.getElementById('OpeningHours').value;
    if (username == "") {
        alert("Se debe introcucir un nombre de usuario");
    } else if (password == "") {
        alert("Se debe introducir una contraseña");
    } else registerWalker_connect(id_in, token_in, username, password, route, name, image, address, telephone, openingHours);
}


function readCMS_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/read/" + id_in
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                $('#CMSname').append(r.responseJSON.name);               
            } else
                alert("Error al leer los cambios");
                return null;
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function registerWalker_connect(id_in, token_in, username_in, password_in, route_in, name_in, image_in, address_in, telephone_in, openingHours_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/walker/register/" + id_in
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "username": username_in,
            "password": password_in,
            //"route": route_in,
            "name": name_in,
           //"image": image_in,
            "address": address_in,
            "telephone": telephone_in,
            "openingHours": openingHours_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                window.location.href = "cms-list.html"
            } else
                alert("Error al guardar los cambios");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}