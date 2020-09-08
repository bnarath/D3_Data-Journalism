//Step1:- Explore CSV
d3.csv('assets/data/data.csv').then(function(data, err){
    //Throw err if exists
    if (err) throw err;

    console.log(data);
    //abbr, poverty, age, income, obesity, smokes, healthcare are the attributes to be considered
    //data is in the form of array of objects

}).catch(function(error){
    console.warn(error);
})

