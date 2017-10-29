       const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  
  
  const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
  };
  
  const colorAr= ['rgb(242,71,56)','rgb(242,199,119)','rgb(2,73,89)', 'rgb(92,75,81)','rgb(243,181,98)', 'rgb(246,67,58)','rgb(255,204,194)','rgb(46,84,88)','rgb(34,66,85)','rgb(0,201,151)','rgb(255,132,107)','rgb(93,83,72)','rgb(80,17,23)','rgb(184,164,140)','rgb(54,10,13)'];
  
  const createPoint = function(count, canvasWidth, canvasHeight) {
    const a = [];
    const details = function(n) {
      if (n < 1) {return ""}
      a.push({
        x: rand(canvasWidth - 100),
        y: rand(canvasHeight - 100),
        width: 100,
        height: 100,
        xDelta: 5,
        yDelta: 5,
        color: colorAr[rand(15)-1]
      });
      details(n-1)
    }
    details(count);
    return a;
  };
  
  const points = createPoint(35,canvas.width, canvas.height);	
  
  
  const draw = function() {
    context.clearRect(0,0, canvas.width, canvas.height);
    const box = function(arr, i) {
      if(i === arr.length) {
        return "";
      }
      
      context.fillStyle = arr[i].color;
      context.fillRect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
      box(arr, i+1);
    };
    box(points, 0);
  };
  
  const updateData = function() {
    const update = function(arr, m){
      if(m === arr.length) {
        return "";
      }
      
      if(arr[m].x >= canvas.width-arr[m].width || arr[m].x<=0){
        arr[m].xDelta = -arr[m].xDelta;
		arr[m].color = colorAr[rand(15)-1];
      }
      
      if(arr[m].y >= canvas.height-arr[m].height || arr[m].y<=0){
        arr[m].yDelta = -arr[m].yDelta;
		arr[m].color = colorAr[rand(13)-1];
      }
      
      arr[m].x = arr[m].x + arr[m].xDelta;
      arr[m].y = arr[m].y + arr[m].yDelta;
      update(arr, m+1);
    };
    update(points, 0)
  };
  
  const loop = function(){
    
    draw();
    updateData();
    window.requestAnimationFrame(loop);
  };
  
  loop();