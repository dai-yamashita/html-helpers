# html-helpers

## Install

    $ npm install html-helpers

## Usage

The examples here are Express and EJS, but the underlying functions are just string
manipulation and are completely template/framework-agnostic. **:)**

    // Express 3
    app.locals.html = require("express-html-helpers");
    // Express 2
    app.helpers("html", require("express-html-helpers"));

    // view.ejs
    <%- html.tag("h1", "My Page Title"); %>
    <h1>My Page Title</h1>

    <% var form = html.form("/login", "post", { "class": "form-horizontal" }) %>
    <%- form.open() %>
    <form action="/login" class="form-horizontal" method="post">
        <%- form.label("Username", { for: "login-username" }) %>
        <label for="login-username">Username</label>
        <%- form.text("username", { id: "login-username" }) %>
        <input id="login-username" name="username" type="text">

        <%- form.label("Password", { for: "login-password" }) %>
        <label for="login-password">Password</label>
        <%- form.password("pass", { id: "login-password" }) %>
        <input id="login-password" name="pass" type="password">

        <%- html.button("Log In", { type: "submit" }) %>
        <button type="submit">Log In</button>
    <%- form.close() %>
    </form>

## Change Log

** 0.0.1 **
