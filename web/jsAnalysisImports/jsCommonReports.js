    var print;
    var city = "Caloocan City";
    var chartSelected;
    var reportSelected; 
    var year = [];
    var district = [];
    var barangay = [];
    var gender = [];
    var analysischart = []; 

    function filterYear(){
        var year = $('#years').find(":selected").text();
        if(reportSelected === 'maritalStatus'){
            if(chartSelected=="0"||chartSelected=="Pie Chart"){
                drawMaritalStatusBar(print, year,'pie');
            }
            else if(chartSelected=="0"||chartSelected=="Bar Chart"){
                drawMaritalStatusBar(print, year,'column');
            }
        }
        
        if(reportSelected === 'ageGroup'){
            if(chartSelected=="0"||chartSelected=="Population Pyramid"){
                drawHHPopPyramid(print, year);
            }
            else if(chartSelected=="0"||chartSelected=="Pie Chart"){
                drawMaritalStatusBar(print, year);
            }
        }
    }
    
    //CLICK location
    $(document).on("click", '.filter', function () {
        gender = [];
        barangay = [];
        analysischart[0] = print[0];

        $('[id="barangayss"]:checked').each(function (e) {
            var id = $(this).attr('value');
            barangay.push(id);
        });
        
        $('[id="genders"]:checked').each(function (e) {
            var id = $(this).attr('value');
            gender.push(id);
        });

        removeGender(analysischart, gender);
        removeBarangay(analysischart, barangay);
        
        if(reportSelected === 'maritalStatus'){
            if(chartSelected=="0"||chartSelected=="Pie Chart"){
                drawMaritalStatusBar(analysischart, 2015,'pie');
            }
            else if(chartSelected=="0"||chartSelected=="Bar Chart"){
                drawMaritalStatusBar(analysischart, 2015,'column');
            }
        } 
    });

    function removeGender(analysischart, gender){
        analysischart[0].genders.length = 0;
        for (var x = 0; x < gender.length; x++) {
            item = {};
            item['gender'] = gender[x];
            analysischart[0].genders.push(item);
        }
    }
    
    function removeDistrict(analysischart, district){
        analysischart[0].districts.length = 0;
        for (var x = 0; x < district.length; x++) {
            item = {};
            item['district'] = district[x];
            analysischart[0].districts.push(item);
        }
    }
    
    function removeBarangay(analysischart, barangay){
        analysischart[0].barangays.length = 0;
        for (var x = 0; x < barangay.length; x++) {
            item = {};
            item["barangay"] = barangay[x];
            analysischart[0].barangays.push(item);
            
        }
    }



function setHHPopAgeGroupSex (chart){
    $.ajax({
        url: "SetHHPopAgeGroupSex",
        type: 'POST',
        dataType: "JSON",
        success: function(data){
            reportSelected = 'ageGroup';
            print = data;
            chartSelected = 'Population Pyramid';
            $('#years').empty();
            $('#districts').empty();
            $('#barangays').empty();
            $('#sex').empty();
            
            $('#years').append("<option selected disabled id='year' value='"+print[0].years[print[0].years.length-1].year+"'>Choose Year for Report</option>");
            for (var i = print[0].years.length-1; i >= 0; i--) {
                $('#years').append('<option id="year" value="' 
                        +print[0].years[i].year+ '">'
                        +print[0].years[i].year+'</option></br>');
            }
            console.log(JSON.stringify(print[0].years));
            //barangay
            for (var i = 0; i < print[0].barangays.length; i++) {
                    $('#barangays').append('<input type="checkbox" class="filter" id="barangayss" value="' 
                            + print[0].barangays[i].barangay + '" checked>'+'&nbsp;Barangay '+print[0].barangays[i].barangay+'</input></br>');
            }
            
            for (var i = 0; i < print[0].genders.length; i++) {
                    $('#sex').append('<input type="checkbox" class="filter" id="genders" value="' 
                            + print[0].genders[i].gender + '" checked>'+'&nbsp; '+print[0].genders[i].gender+'</input></br>');
            }
            
            var year = $('#years').find(":selected").val();
            
            if(chart=="0"||chart=="Population Pyramid"){
                drawHHPopPyramid(print, print[0].years[print[0].years.length-1].year);
            }
            else if(chart=="0"||chart=="Pie Chart"){
                drawHHPopPyramid(print, print[0].years[print[0].years.length-1].year);
            }
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert(XMLHttpRequest.responseText);
        }
    });}
            
    function drawHHPopPyramid(print, year){
        var topCategories = [];
        for (var i = 0; i < print[0].ageGroups.length; i++) {
            topCategories.push(print[0].ageGroups[i].ageGroup);
        }
        
        var male = [];
        
        for(var a = 0; a < print[0].ageGroups.length; a++){
            var item = {};
            var total = 0;
            item["name"] = print[0].ageGroups[a].ageGroup;
            //item["drilldown"] = 'unknown';
            for(var i = 0; i < print[0].people.length; i++){
                if(print[0].people[i].year == year){
                    if(print[0].ageGroups[a].ageGroup == print[0].people[i].ageGroup){
                        for(var c = 0; c < print[0].genders.length; c++){
                            if(print[0].people[i].gender == print[0].genders[c].gender){
                                if(print[0].people[i].gender == 'Male'){
                                    for(var b = 0; b < print[0].barangays.length; b++){
                                        if(print[0].people[i].barangay == print[0].barangays[b].barangay){
                                            total+=print[0].people[i].people;
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
            item["y"] = -total;
            male.push(item);
        }
        
        
        var female = [];
        for(var a = 0; a < print[0].ageGroups.length; a++){
            var item = {};
            var total = 0;
            item["name"] = print[0].ageGroups[a].ageGroup;
            //item["drilldown"] = 'unknown';
            for(var i = 0; i < print[0].people.length; i++){
                
                if(print[0].people[i].year == year){
                    if(print[0].ageGroups[a].ageGroup == print[0].people[i].ageGroup){
                        for(var c = 0; c < print[0].genders.length; c++){
                            if(print[0].people[i].gender === print[0].genders[c].gender){
                                if(print[0].people[i].gender == 'Female'){
                                    for(var b = 0; b < print[0].barangays.length; b++){
                                        if(print[0].people[i].barangay == print[0].barangays[b].barangay){
                                            total+=print[0].people[i].people;
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
            item["y"] = total;
            female.push(item);
        }
    
        // Create the chart
            $('#output').highcharts({
                chart: {
                    type: 'bar',
                    zoomType: 'x',
                    panning: true,
                    panKey: 'shift'
//                    events: {
//                        drilldown: function (e) {
//                            var chart = this;
//                            Highcharts.charts[0].xAxis[0].update({categories: drilldownCategories,
//                                reversed: true,
//                                labels: {
//                                    step: 1
//                                }});
//                        },
//                        drillup: function (e) {
//                            var chart = this;
//                            chart.xAxis[0].update({categories: topCategories,
//                                reversed: false,
//                                labels: {
//                                    step: 1
//                                }
//                            });
//                        }
//                    }
                },
                title: {
                    text: 'Household Population by Age Group and Sex for ' + year
                },
                subtitle: {
                    text: 'Click and drag to zoom in. Hold down shift key to pan.'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            stacking: 'normal'
                        }
                    }
                },
                xAxis: [{
                        categories: topCategories,
                        reversed: false,
                        labels: {
                            step: 1
                        }
                    }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                                'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },
                series: [{
                        name: 'Male',
                        data: male
                    }, {
                        name: 'Female',
                        color: '#FF9999',
                        data: female
                    }]//,
//                drilldown: {
//                series: male
//                }
            });
    }
    
    
    function setMaritalStatus(chart) {
        $.ajax({
        url: "SetMaritalStatusServlet",
        type: 'POST',
        dataType: "JSON",
        success: function (data) {
            reportSelected = 'maritalStatus';
            print = data;
            chartSelected = chart;
            $('#years').empty();
            $('#districts').empty();
            $('#barangays').empty();
            $('#sex').empty();
            
            $('#years').append("<option selected disabled id='year' value='"+print[0].years[print[0].years.length-1].year+"'>Choose Year for Report</option>");
            for (var i = print[0].years.length-1; i >= 0; i--) {
                $('#years').append('<option id="year" value="' 
                        + print[0].years[i].year + '">'
                        +print[0].years[i].year+'</option></br>');
            }
            //barangay
            for (var i = 0; i < print[0].barangays.length; i++) {
                    $('#barangays').append('<input type="checkbox" class="filter" id="barangayss" value="' 
                            + print[0].barangays[i].barangay + '" checked>'+'&nbsp;Barangay '+print[0].barangays[i].barangay+'</input></br>');
            }
            
            for (var i = 0; i < print[0].genders.length; i++) {
                    $('#sex').append('<input type="checkbox" class="filter" id="genders" value="' 
                            + print[0].genders[i].gender + '" checked>'+'&nbsp; '+print[0].genders[i].gender+'</input></br>');
            }
            
            var year = $('#years').find(":selected").val();
            
            if(chart=="0"||chart=="Pie Chart"){
                drawMaritalStatusBar(print, year, 'pie');
            }
            else if(chart=="0"||chart=="Bar Chart"){
                drawMaritalStatusBar(print, year, 'column');
            }
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert(XMLHttpRequest.responseText);
        }
    });
    }
    
    function drawMaritalStatusBar(print, year, chart){
            var total = [];
            widowedItem = {};
            var widowedTotal = 0;
            widowedItem["name"] = 'Widowed';
            widowedItem["drilldown"] = 'widowed';
            for (var i = 0; i < print[0].people.length; i++) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                for(var z = 0; z < print[0].genders.length; z++){
                                    if(print[0].people[i].gender == print[0].genders[z].gender){
                                        widowedTotal+=print[0].people[i].widowed;
                                    }
                                }
                            }
                        }
                    }
            }
            widowedItem["y"] = widowedTotal;
            total.push(widowedItem);
            
            unknownItem = {};
            var unknownTotal = 0;
            unknownItem["name"] = 'Unknown';
            unknownItem["drilldown"] = 'unknown';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    unknownTotal+=print[0].people[i].unknown;
                                }
                            }
                        }
                    }
                }
            }
            unknownItem["y"] = unknownTotal;
            total.push(unknownItem);
            
            marriedItem = {};
            var marriedTotal = 0;
            marriedItem["name"] = 'Married';
            marriedItem["drilldown"] = 'married';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    marriedTotal+=print[0].people[i].married;
                                }
                            }
                        }
                    }
                }
            }
            marriedItem["y"] = marriedTotal;
            total.push(marriedItem);
            
            divorcedItem = {};
            var divorcedTotal = 0;
            divorcedItem["name"] = 'Divorced';
            divorcedItem["drilldown"] = 'divorced';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    divorcedTotal+=print[0].people[i].divorced;
                                }
                            }
                        }
                    }
                }
            }
            divorcedItem["y"] = divorcedTotal;
            total.push(divorcedItem);
            
            liveInItem = {};
            var liveInTotal = 0;
            liveInItem["name"] = 'Live-In';
            liveInItem["drilldown"] = 'liveIn';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    liveInTotal+=print[0].people[i].liveIn;
                                }
                            }
                        }
                    }
                }
            }
            liveInItem["y"] = liveInTotal;
            total.push(liveInItem);
            
            singleItem = {};
            var singleTotal = 0;
            singleItem["name"] = 'Single';
            singleItem["drilldown"] = 'single';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    singleTotal+=print[0].people[i].single;
                                }
                            }
                        }
                    }
                }
            }
            singleItem["y"] = singleTotal;
            total.push(singleItem);
            
            var drilldowns = [];
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Widowed';
            item["id"] = 'widowed';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                    if(print[0].people[i].gender == print[0].genders[z].gender){
                                        if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].widowed;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].widowed;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'widowedNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'widowedSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);
            
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Married';
            item["id"] = 'married';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].married;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].married;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'marriedNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'marriedSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);
            
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Unknown';
            item["id"] = 'unknown';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].unknown;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].unknown;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'unknownNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'unknownSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);
            
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Divorced';
            item["id"] = 'divorced';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].divorced;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].divorced;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'divorcedNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'divorcedSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);
            
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Live-In';
            item["id"] = 'liveIn';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].liveIn;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].liveIn;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'liveInNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'liveInSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);
            
            var south = 0; 
            var north = 0;
            item={};
            item["name"] = 'Single';
            item["id"] = 'single';
            for (var i = 0; i < print[0].people.length; i++) {
                for(var y = 0; y < print[0].barangays.length; y++){
                    if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                        if(print[0].people[i].year == year){
                            for(var z = 0; z < print[0].genders.length; z++){
                                if(print[0].people[i].gender == print[0].genders[z].gender){
                                    if(print[0].people[i].zone==='NORTH'){
                                        north+=print[0].people[i].single;
                                    }
                                    else if(print[0].people[i].zone==='SOUTH'){
                                        south+=print[0].people[i].single;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            data = [];
            item2 = {};
            item2["name"] = 'North';
            item2["y"] = north;
            item2["drilldown"] = 'singleNorth';
            data.push(item2);
            item2 = {};
            item2["name"] = 'South';
            item2["y"] = south;
            item2["drilldown"] = 'singleSouth';
            data.push(item2);
            item['data'] = data;
            drilldowns.push(item);

            genderLength = print[0].genders.length;
            var zones = ["North", "South"];
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'liveIn'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].liveIn + print[0].people[i+1].liveIn;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].liveIn;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'single'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].single + print[0].people[i+1].single;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].single;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'married'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].married + print[0].people[i+1].married;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].married;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'divorced'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].divorced + print[0].people[i+1].divorced;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].divorced;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'unknown'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].unknown + print[0].people[i+1].unknown;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].unknown;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            for(var a = 0; a < zones.length; a++){
                item={};
                item["id"] = 'widowed'+zones[a];
                item["name"] = zones[a]+' Caloocan';
                data = [];
                var add;
                if(genderLength === 2 || genderLength == 0){
                    add = 2;
                } else {
                    add = 1;
                }
                for (var i = 0; i < print[0].people.length; i+=add) {
                    for(var y = 0; y < print[0].barangays.length; y++){
                        if(print[0].people[i].barangay == print[0].barangays[y].barangay){
                            if(print[0].people[i].year == year){
                                if(print[0].people[i].zone.toUpperCase() === zones[a].toUpperCase()){
                                    if(genderLength == 2){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = print[0].people[i].widowed + print[0].people[i+1].widowed;
                                        data.push(item2);
                                    }
                                    else if(genderLength == 1){
                                        for(var z = 0; z < print[0].genders.length; z++){
                                            if(print[0].people[i].gender == print[0].genders[z].gender){
                                                item2 = {};
                                                item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                                item2["y"] = print[0].people[i].widowed;
                                                data.push(item2);
                                            }
                                        }
                                    }
                                    else if(genderLength == 0){
                                        item2 = {};
                                        item2["name"] =  'Barangay '+print[0].people[i].barangay;
                                        item2["y"] = 0;
                                        data.push(item2);
                                    }
                                }
                            }
                        }
                    }
                }
                item['data'] = data;
                drilldowns.push(item);
            }
            
            $('#output').highcharts({
                chart: {
                    type: chart,
                    drilled: false,
                    zoomType: 'xy',
                    panning: true,
                    panKey: 'shift'//,
                },
                title: {
                    text: 'Household Population 10 Yrs Old and Over by Age Group, Sex, and Marital Status for ' + year
                },
                xAxis: {
                    type: 'category'
                },
                series: [{
                    name: 'Caloocan City',
                    data: total
                }],
                drilldown: {
                    series: drilldowns
                    }
            });
        }



function setClassroomRequirement(){
    $.ajax({
        url: "SetClassroomRequirementServlet",
        type: 'POST',
        dataType: "JSON",
        success: function (data) {
            var print = data;   
            var totalEnrollees = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 'e';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].enrollment.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].enrollment[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].enrollment[x].year) {
                                totals = totals + parseInt(print[0].enrollment[x].enrollment); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalEnrollees.push(item);
            }
            
            var totalClassrooms = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 'c';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].classrooms.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].classrooms[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].classrooms[x].year) {
                                totals = totals + (parseInt(print[0].classrooms[x].classrooms)*45); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalClassrooms.push(item);
            }
            
            var totalGaps = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 'g';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].gaps.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].gaps[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].gaps[x].year) {
                                totals = totals + parseInt(print[0].gaps[x].gap); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalGaps.push(item);
            }
            
            $('#output').highcharts({
            chart: {
                type: 'column',
                drilled: false,
                zoomType: 'xy',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: 'Classroom Requirements in Public Elementary School'
            },
            xAxis: {
                type: 'category'
            },
            plotOptions: {
                column: {
//        stacking: 'normal'
                    dataLabels: {
                        enabled: true
                    },
                    series: {
                        allowPointSelect: true
                    }
                },
            },
            series: [{
                    name: 'Enrollees',
                    type: 'column',
                    data: totalEnrollees
                },  {
                    name: 'Classrooms',
                    type: 'column',
                    data: totalClassrooms
                }, {
                    name: 'Gaps',
                    type: 'column',
                    color: '#FF3232',
                    data: totalGaps
                    
                }
            ],
            drilldown: {
                //series: drilldownsHospital
            }
        });
            
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert(XMLHttpRequest.responseText);
        }
    });
}

function setEnrollmentTeacherClassroom(){
    $.ajax({
        url: "EnrollmentTeachersClassrooms",
        type: 'POST',
        dataType: "JSON",
        success: function (data) {
            var print = data;   
            var totalEnrollees = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 'e';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].enrollment.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].enrollment[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].enrollment[x].year) {
                                totals = totals + parseInt(print[0].enrollment[x].enrollment); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalEnrollees.push(item);
            }
            
            var totalClassrooms = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 'c';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].classrooms.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].classrooms[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].classrooms[x].year) {
                                totals = totals + (parseInt(print[0].classrooms[x].classrooms)); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalClassrooms.push(item);
            }
            
            var totalTeachers = [];
            for (var i = 0; i < print[0].years.length; i++) {
                var totals = 0;
                item = {};
                item["name"] = print[0].years[i].year;
                item["drilldown"] = print[0].years[i].year + 't';
                item["type"] = 'column';
                data = [];
                for (var x = 0; x < print[0].classrooms.length; x++) {
                    for(var y = 0; y < print[0].districts.length; y++){
                        if(print[0].classrooms[x].district == print[0].districts[y].district){
                            if (print[0].years[i].year == print[0].classrooms[x].year) {
                                totals = totals + (parseInt(print[0].classrooms[x].teachers)); 
                            }
                        }
                    }
                }
                item["y"] = totals;
                totalTeachers.push(item);
            }
            
            
            $('#output').highcharts({
            chart: {
                type: 'column',
                drilled: false,
                zoomType: 'xy',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: 'Classroom Requirements in Public Elementary School'
            },
            xAxis: {
                type: 'category'
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    },
                    series: {
                        allowPointSelect: true
                    }
                },
            },
            series: [{
                    name: 'Enrollees',
                    type: 'column',
                    data: totalEnrollees
                },  {
                    name: 'Teachers',
                    type: 'column',
                    data: totalTeachers
                }, {
                    name: 'Classrooms',
                    type: 'column',
                    color: '#FF3232',
                    data: totalClassrooms
                    
                }
            ],
            drilldown: {
                //series: drilldownsHospital
            }
        });
            
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert(XMLHttpRequest.responseText);
        }
    });
}
