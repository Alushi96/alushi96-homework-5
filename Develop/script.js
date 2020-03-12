$(document).ready(function() {
      

    //Add Date

    var time = moment().format('MMMM Do YYYY');

    let nowHour24 = moment().format("H");
    let nowHour12 = moment().format("h");

    let timeD = $('#currentDay');
    timeD.text(time);

    //Get stored plans from storage

    var storedplans = JSON.parse(localStorage.getItem("StorePlans"));

    if (storedplans !== null) {
    plntxar = storedplans;
    }
    else {
    plntxar = new Array(9);
    }

    let plncont = $('#plncont');
    plncont.empty();

    for (let hour = 9; hour <=17; hour++) {
        let index = hour - 9;

        let rowdiv = $("<div>");
        rowdiv.addClass("row");
        rowdiv.attr("hour-index", hour);

        //Time Block

        let coltm = $("<div>");
        coltm.addClass("col-md-2");

        var tmbx = $("<span>");
        tmbx.attr("class" , "timeBox");

        let displayhour = 0;
        let ampm = "";
        if (hour > 12) {
            displayhour = hour - 12;
            ampm = "pm";
        }
        else {
            displayhour = hour;
            ampm = "am";
        }

        tmbx.text(`${displayhour} ${ampm}`);

        rowdiv.append(coltm);
        coltm.append(tmbx);

        //Center Input Row

        let dailyplan = $("<input>");

        dailyplan.attr("id", `input-${index}`);
        dailyplan.attr("hour-index", index);
        dailyplan.attr("type", "text");
        dailyplan.attr("class", "dailyPlan");

        dailyplan.val(plntxar[index]);

        let inputcol = $("<div>");
        inputcol.addClass("col-md-9");

        rowdiv.append(inputcol);
        inputcol.append(dailyplan);

        //Save Box

        let savebtn = $("<div>");
        savebtn.addClass("col-md-1");

        let svbtn = $("<i>")
        svbtn.attr("id", `saveid-${index}`);
        svbtn.attr("save-id", index);
        svbtn.attr("class", "far fa-save saveIcon");
        svbtn.on("hover", svbtn.addClass("saveBTN i:hover"));

        rowdiv.append(savebtn);
        savebtn.append(svbtn);

        updateRowColor(rowdiv, hour);

        plncont.append(rowdiv);
    };

    function updateRowColor (hourrow, hour) {

        if (hour < nowHour24) {
            hourrow.addClass("past")
        }
        else if (hour > nowHour24) {
            hourrow.addClass("future")
        }
        else {
            hourrow.addClass("present")
        }
    };
    $(document).on("click","i",function(event) {
        event.preventDefault();

        let index = $(this).attr("save-id");
        let inputId = "#input-"+index;
        let value = $(inputId).val();

        plntxar[index] = value;

        localStorage.setItem("StorePlans", JSON.stringify(plntxar));
    })

    $(document).on('change','input', function(event) {
        event.preventDefault();  
    
        let i = $(this).attr('hour-index');
    
      });

      $(document).ready(function(){
        $("i").hover(function(){
          $(this).css("background-color", "black");
          }, function(){
          $(this).css("background-color", "darkturquoise");
        });
      });

});