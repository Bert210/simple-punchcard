<html>
    <head>
        <title>Simple Punchcard</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
            .circle-btn {
                /* padding: 1rem; */
                width: 40px;
                height: 40px;
                color: white;
                font-weight: bold;
                background-color: red;
                border-radius: 50%;
            }

            .circle-btn:hover {
                /* padding: 1rem; */
                background-color: maroon;
            }
        </style>
    </head>
    <body>
        <div id="app" class="container">
            <h1 class="display-4 text-center">Simple Punchcard</h1>
            <div style="height: 1px; background-color: black;"></div>

            <div class="row">
                <Days></Days>
                <time-view></time-view>
            </div>
            <div class="row">
                <total-time></total-time>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="js/app.js"></script>
    </body>
</html>
