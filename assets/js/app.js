//Step1:- Decide SVG and Group Frames
//This will be changed to window dependent later
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 20,
  bottom: 150,
  left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Step2:- Append the SVG and chartGroup to the html
var svg = d3.select("#scatter").append("svg")
                        .attr("height", svgHeight)
                        .attr("width", svgWidth);

var chartGroup =  svg.append("g")
                     .attr("transform", `translate(${margin.left}, ${margin.top})`)

//Step3:- Scale function
function scale(data, chosenXAxis, y=true){
    // Input:- data, chosenXAxis(attribute in the data)
    // Output:- Linear scale
    // y: Indicates y axis or not
    var upper = (y==true) ? [height,0]: [0,width];
    var linearScale = d3.scaleLinear()
                         .domain([d3.min(data, d=>d[chosenXAxis])*0.8, d3.max(data, d=>d[chosenXAxis])*1.2])
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
    //Step b:- Create scales
    var xScale = scale(data, chosenXAxis, false);
    var yScale = scale(data, chosenYAxis, true);

    //Step c:- Create left and bottom axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //Step d:- Render axes -> Need to refactor This
    var xAxis = chartGroup.append("g")
                          .attr("transform", `translate(0, ${height})`)
                          .call(bottomAxis);

    var yAxis = chartGroup.append("g")
                          .call(leftAxis);

    //Step e:- Render circles
    var circlesGroup = chartGroup.selectAll("circle")
                                 .data(data)
                                 .enter()
                                 .append("circle")
                                 .attr("cx", d=>xScale(d[chosenXAxis]))
                                 .attr("cy", d=>yScale(d[chosenYAxis]))
                                 .attr("r", 10)
                                 .attr("fill", "red")
                                 .attr("opacity", ".5");

    // Step f:- Create axes labels
    // // Step f. 1 Axes label group for x & y axis
    var xLabelGroup = chartGroup.append("g").attr("transform", `translate(${width/2}, ${height})`);
    var yLabelGroup = chartGroup.append("g")
                                .attr("transform", "rotate(-90)");
                                
    // // Step f. 2 Render axes labels
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
    
    //console.log(data);
    // Step g:- Create ToolTip
    circlesGroup = renderTooltip(circlesGroup, chosenXAxis, chosenYAxis);
    
}).catch(function(error){
    console.warn(error);
})

