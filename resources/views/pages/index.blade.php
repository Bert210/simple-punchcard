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
        <div class="container">
            <h1 class="display-4 text-center">Simple Punchcard</h1>

            <div class="row">
                <div class="col-3 text-center" style="border-right: 1px solid #000">
                    <h4 class="display-5">Days</h4>
                    <div class="list-group" id="day-list">
                        <a href="#sunday" class="list-group-item active">Sunday</a>
                        <a href="#monday" class="list-group-item">Monday</a>
                        <a href="#tuesday" class="list-group-item">Tuesday</a>
                        <a href="#wednesday" class="list-group-item">Wednesday</a>
                        <a href="#thursday" class="list-group-item">Thursday</a>
                        <a href="#friday" class="list-group-item">Friday</a>
                        <a href="#saturday" class="list-group-item">Saturday</a>
                    </div>
                </div>
                <div class="col-9  text-center">
                    <h4 class="display-5">Times</h4>
                    <div id="time-list">
                    </div>
                    <div class="btn circle-btn text-center" id="add-time-btn">+</div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">Total: </div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script>
            // Handler for time view
            let timeHandler = $('#time-list');

            let index = "Sunday";
            let days = [];

            days["Monday"] = [{
                inTime: +new Date(),
                outTime: +new Date() + (60*60)
            }]

            $(document).ready(function(){
                refreshView();
            });

            $('.list-group-item').on('click', function(){
                toggleActive($(this));
                refreshView();
            });


            
            function toggleActive(item) {
                $('#day-list a').removeClass('active');

                //Set the index so we know what day we are on
                index = item.text();

                item.addClass('active');
            }

            $('#add-time-btn').on('click', function(){
                if(typeof(days[index]) !== "object"){
                    days[index] = [];
                }
                days[index].push({
                    inTime: +new Date(),
                    outTime: +new Date() + (1000 * 60 * 60)
                });

                $('time-list').append("")

                refreshView()
            });

            function refreshView() {
                clearTimeView();
                addTimesView();
            }

            function clearTimeView() {
                timeHandler.empty();
            }

            function addTimesView(){

                if(typeof(days[index]) !== "object"){
                    timeHandler.append("<p>Add a time to get started!</p>");
                }else {
                    days[index].forEach(function(el){
                        var formattedDate = new Date(el.inTime);

                        let h = formattedDate.getHours();
                        let m = formattedDate.getMinutes();


                        timeHandler.append("<div> IN:" + new Date(el.inTime) + "</div> <div>OUT: " + new Date(el.outTime) + "</div>")
                    })
                }
            }

            function createTimeInput(parent){
                
            }


        </script>
    </body>
</html>
