# Data Journalism using D3 visuals!!

<p>
  
  <img align="right" src="https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif" alt="Newsroom" style="width:100, float:'right'"/>
  
Welcome to the newsroom! This project is to analyze the census data to find the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements using [D3.js](https://d3js.org/) to help readers understand the findings. We know how impactful visualization is to tell the underlying story; here we see how that is being done using a powerful tool like `D3`!

In this project, we sift through information from `the U.S. Census Bureau` and the `Behavioral Risk Factor Surveillance System` and visualize the health risks facing particular demographics.
 

</p>


## Dataset

The [data set](assets/data/data.csv) is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), The data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."


## Steps

### D3 Dabbler

![4-scatter](Images/4-scatter.jpg)

You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

* Include state abbreviations in the circles.

* Create and situate your axes and labels to the left and bottom of the chart.

* Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

- - -

### Bonus: Impress the Boss (Optional Assignment)

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

Include more demographics and more risk factors. Place additional labels in scatter plot and give them click events so that users can decide which data to display. Animate the transitions for circles' locations as well as the range of axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

- - -
