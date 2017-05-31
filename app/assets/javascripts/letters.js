// LETTERS JS
var name = "Jordan Foster",
  alphabet = "abcdefghijklnopqrstuvxyz".split(""),
  scatterName = "".split(""),
  scatterIndex = 0;

$(document).ready(function() {
  var svg, width, height, g;
  resize();


  // Resize function sets size of svg on load and window resize
  function resize() {
    d3.select("g").remove();
    svg = d3.select("#letter-tester");
    width = +((document.getElementById("jumbo-jordi").clientWidth) * 0.9 );
    height = +((document.getElementById("jumbo-jordi").clientHeight) * 0.34 );
    g = svg.append("g").attr("transform", "translate(0," + (height / 2) + ")");
    // Setting size of svg based on jumbotron size. 
    svg
      .attr("width", width)
      .attr("height", height);
  }


  // RandoSwap function uses a temp Variable and Math functions to make 1 letter in Name a random letter
  function randoSwap() {
    scatterName = name.split("");
    do {
      scatterIndex = Math.floor(Math.random() * (name.split("").length - 1));
    } while (scatterName[scatterIndex] == " ");
    
    scatterName[scatterIndex] = alphabet[Math.floor(Math.random() * 23)];
    return scatterName;
  }


  // TODO: Create function to return letter spacing with svg width as param.  Enforce maximum spacing value (Try 40).


  // Shuffle makes the actual change to the group with a nice transition
  function shuffle(data) {
    // 750 ms transition
    var t = d3.transition()
      .duration(750);

    // Bind data
    var text = g.selectAll("text")
      .data(data, function(d) { return d; });

    // Exit old elements
    text.exit()
        .attr("class", "exit")
      .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();

    // Update old elements
    text.attr("class", "update")
        .attr("y", 0)
        .style("fill-opacity", 1)
      .transition(t)
        .attr("x", function(d, i) { return i * (width/14); }); // TODO: dabble with sizes

    // Enter new elements
    text.enter().append("text")
        .attr("class", "enter")
        .attr("dy", ".35em")
        .attr("y", 60)
        .attr("x", function(d, i) { return i * (width/14); }) // TODO: dibble with sizes
        .style("fill-opacity", 1e-6)
        .text(function(d) { return d; })
      .transition(t)
        .attr("y", 0)
        .style("fill-opacity", 1);
  }

  // Initial Display
  shuffle(name);

  // Shuffle name with randomized name every 3 seconds
  d3.interval(function() {
    shuffle(randoSwap()); // TODO: Make use of a d3 timer (instead of interval), allowing for onclick pause and resume.
  }, 3000);

  // Run function resize on window resize
  d3.select(window).on('resize', resize);

  // Undo current shuffle on svg click
  svg.on('click', function() {
    shuffle(name); // remove current instance before shuffle ?
  });
});

// TODO: Successfully disable bfcache
// window.onunload = function(){};