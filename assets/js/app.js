function renderGraph(){


    //Step3:- Scale function
    function scale(data, chosenXAxis, y=true){
        // Input:- data, chosenXAxis(attribute in the data)
        // Output:- Linear scale
        // y: Indicates y axis or not
        var upper = (y==true) ? [height,0]: [0,width];
        var linearScale = d3.scaleLinear()
                            .domain([d3.min(data, d=>d[chosenXAxis])*0.9, d3.max(data, d=>d[chosenXAxis])*1.1])
                            .range(upper)
        
        return linearScale;
    }

    //Step6:- Render ToolTip
    // Creates and Render tooltip 
    //Returns the group with rendered tooltip
    function renderTooltip(circlesGroup, chosenXAxis, chosenYAxis){
        
        var toolTip = d3.tip()
                        .attr("class", "d3-tip")
                        .offset([-10,0])
                        .html(function(d){
                            return (`${d.state}<hr>${chosenXAxis}:${d[chosenXAxis]}<br>${chosenYAxis}:${d[chosenYAxis]}`);
                        });
        
        circlesGroup.call(toolTip);
        
        //Show and hide tooltip
        circlesGroup.on("mouseover", function(d){
            toolTip.show(d, this);
        }).on("mouseout", function(d){
            toolTip.hide();
        })
        return circlesGroup;
    }

    function updateChart(data, chosenXAxis, chosenYAxis){

        //Step 1:- Create scales
        var xScale = scale(data, chosenXAxis, false);
        var yScale = scale(data, chosenYAxis, true);

        //Step 2:- Create left and bottom axes
        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);

        //Step 3:- Render axes 
        var xAxis = chartGroup.append("g")
                                  .attr("transform", `translate(0, ${height})`)
                                  .call(bottomAxis);


        var yAxis = chartGroup.append("g")
                            .call(leftAxis);

        // Step 4:- Render circles
        // var circlesGroup = chartGroup.selectAll("circle")
        //                             .data(data)
        //                             .enter()
        //                             .append("g")
        //                             .append("circle")
        //                             .attr("cx", d=>xScale(d[chosenXAxis]))
        //                             .attr("cy", d=>yScale(d[chosenYAxis]))
        //                             .attr("r", radius)
        //                             .attr("fill", "red")
        //                             .attr("opacity", ".5");
        var gGroup = chartGroup.selectAll("circle")
                                    .data(data)
                                    .enter()
                                    .append("g");
        
        var circlesGroup = gGroup.append("circle")
            .attr("cx", d=>xScale(d[chosenXAxis]))
            .attr("cy", d=>yScale(d[chosenYAxis]))
            .attr("r", radius)
            .attr("fill", "red")
            .attr("opacity", ".5");
                                    
        var textGroup = gGroup.append("text")
              .attr("x", d=>xScale(d[chosenXAxis]))
              .attr("y", d=>yScale(d[chosenYAxis])+radius/2)
              .attr("text-anchor", "middle")
              .attr("fill", "white")
              .text(d=>d["abbr"]);
                                            

        // Step 5:- Create axes labels
        // // Step 5. 1 Axes label group for x & y axis
        var xLabelGroup = chartGroup.append("g").attr("transform", `translate(${width/2}, ${height})`);
        var yLabelGroup = chartGroup.append("g")
                                    .attr("transform", "rotate(-90)");
                                    
        // // Step 5. 2 Render axes labels
        var povertyLabel = xLabelGroup.append("text")
                                    .attr("x", 0)
                                    .attr("y", 30)
                                    .attr("value", "poverty")
                                    .classed("active", true)
                                    .text("In poverty (%)");

        var ageLabel = xLabelGroup.append("text")
            .attr("x", 0)
            .attr("y", 50)
            .attr("value", "age")
            .classed("inactive", true)
            .text("Age (Median)");

        var incomeLabel = xLabelGroup.append("text")
            .attr("x", 0)
            .attr("y", 70)
            .attr("value", "income")
            .classed("inactive", true)
            .text("Household Income (Median)");

        var healthcareLabel = yLabelGroup.append("text")
            .attr("x", 0 - (height / 2))
            .attr("y", -30)
            .attr("value", "healthcare")
            .classed("inactive", true)
            .text("Lacks Healthcare (%)");
        
        var smokesLabel = yLabelGroup.append("text")
            .attr("x", 0 - (height / 2))
            .attr("y", -50)
            .attr("value", "smokes")
            .classed("inactive", true)
            .text("Smokes (%)");

        var obesityLabel = yLabelGroup.append("text")
            .attr("x", 0 - (height / 2))
            .attr("y", -70)
            .attr("value", "obesity")
            .classed("active", true)
            .text("Obese (%)");

        // Step 6:- Create ToolTip
        circlesGroup = renderTooltip(circlesGroup, chosenXAxis, chosenYAxis);
        return [circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale];
    }

    function modifyChart(data, circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale, chosenXAxis, chosenYAxis, axis){
        
        if(axis=="x"){
            //Step 1:- Create scales
            var xScale = scale(data, chosenXAxis, false);
            //Step 2:- Axis Transition
            // updates x axis with transition
            var bottomAxis = d3.axisBottom(xScale);
            xAxis.transition()
                .duration(1000)
                .call(bottomAxis);

            //Step 3:- Transition circles
            circlesGroup.transition()
                .duration(1000)
                .attr("cx", d => xScale(d[chosenXAxis]));
            //Step 4:- Update tooltip
            circlesGroup = renderTooltip(circlesGroup, chosenXAxis, chosenYAxis);

            //Step5:- Transition Texts
            textGroup.transition()
                .duration(1000)
                .attr("x", d=>xScale(d[chosenXAxis]));
                


        }else{
            //Step 1:- Create scales
            var yScale = scale(data, chosenYAxis, true);
            //Step 2:- Axis Transition
            // updates x axis with transition
            var leftAxis = d3.axisLeft(yScale);
            yAxis.transition()
                .duration(1000)
                .call(leftAxis);
            //Step 3:- Transition circles
            circlesGroup.transition()
                .duration(1000)
                .attr("cy", d => yScale(d[chosenYAxis]));
            //Step 4:- Update tooltip
            circlesGroup = renderTooltip(circlesGroup, chosenXAxis, chosenYAxis);

            //Step5:- Transition Texts
            textGroup.transition()
                .duration(1000)
                .attr("y", d=>yScale(d[chosenYAxis])+radius/2);
                
        }
        // Step 5:- changes classes to change bold text
        var xOptions = ["poverty", "age", "income"];
        var yOptions = ["healthcare", "smokes", "obesity"];
        var xData = new Array(3).fill(0);
        var yData = new Array(3).fill(0);
        xData[xOptions.indexOf(chosenXAxis)]=1;
        yData[yOptions.indexOf(chosenYAxis)]=1;

        xLabelGroup.selectAll("text")
        .data(xData)
        .classed("active", d=>d==1?true:false)
        .classed("inactive", d=>d==0?true:false)

        yLabelGroup.selectAll("text")
        .data(yData)
        .classed("active", d=>d==1?true:false)
        .classed("inactive", d=>d==0?true:false)
        //Return
        return [circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale];
        
    }

    //Step1:- Decide SVG and Group Frames
    //This will be changed to window dependent later
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
    var radius = 2 + 20*(d3.mean([svgWidth, svgHeight])-100)/1100;
    //console.log(svgWidth, svgHeight);

    var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svgArea = d3.select("#scatter>svg");

    // If there is already an svg container on the page, remove it
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    //Step2:- Append the SVG and chartGroup to the html
    var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var chartGroup =  svg.append("g")
                        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    //Step5:- Explore CSV
    d3.csv('assets/data/data.csv').then(function(data, err){
        //Throw err if exists
        if (err) throw err;

        //console.log(data);
        //abbr, poverty, age, income, obesity, smokes, healthcare are the attributes to be considered
        //data is in the form of array of objects

        //Step a:- //Convert the below attributes to numeric
        // age, poverty, income, obesity, smokes, healthcare
        data.forEach(entry => {
            entry.age = +entry.age;
            entry.poverty = +entry.poverty;
            entry.income = +entry.income;
            entry.obesity = +entry.obesity;
            entry.smokes = +entry.smokes;
            entry.healthcare = +entry.healthcare;
        });
        //Testing scale:- console.log(scale(data, "age", false)(data[0]["age"]));

        //By default, show povert Vs obesity
        var chosenXAxis = "poverty", chosenYAxis = "obesity";
        var circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale;
        [circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale] = updateChart(data, chosenXAxis, chosenYAxis);
        
        //Event Listeners on xLabelGroup, yLabelGroup
        xLabelGroup.selectAll("text").on("click", function(){
            var value = d3.select(this).attr("value");
            if (value!=chosenXAxis){
                chosenXAxis = value;
                [circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale] = modifyChart(data, circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale, chosenXAxis, chosenYAxis, axis="x");
            }
        })
        yLabelGroup.selectAll("text").on("click", function(){
            var value = d3.select(this).attr("value");
            if (value!=chosenYAxis){
                chosenYAxis = value;
                [circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale] = modifyChart(data, circlesGroup, textGroup, xLabelGroup, yLabelGroup, xAxis, yAxis, xScale, yScale, chosenXAxis, chosenYAxis, axis="y");
            }
        })
        
    }).catch(function(error){
        console.warn(error);
    })



}
renderGraph();

d3.select(window).on("resize", renderGraph);

