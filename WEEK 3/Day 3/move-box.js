// Exercise 2: Move the box

function myMove() {
  const animate = document.getElementById("animate");
  const container = document.getElementById("container");
  
  let pos = 0;
  
  // Get the maximum position (container width - box width)
  const maxPos = container.offsetWidth - animate.offsetWidth;
  
  const intervalId = setInterval(function () {
    // Move the box 1px to the right
    pos += 1;
    animate.style.left = pos + "px";
    
    // Stop when the box reaches the right end of the container
    if (pos >= maxPos) {
      clearInterval(intervalId);
      alert("Box reached the end!");
    }
  }, 1); // Every 1 millisecond (move 1px per millisecond)
}
