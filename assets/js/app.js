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
    var upper = (y==true) ? height: width;
    var linearScale = d3.scaleLinear()
                         .domain([d3.min(data, d=>d[chosenXAxis])*0.8, d3.max(data, d=>d[chosenXAxis])*1.2])
                         .range([0, upper])
    
    return linearScale;
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

    //Step b:- Create left and bottom axes
    var bottomAxis = d3.axisBottom(scale(data, chosenXAxis, false));
    var leftAxis = d3.axisLeft(scale(data, chosenYAxis, true));
    

}).catch(function(error){
    console.warn(error);
})

