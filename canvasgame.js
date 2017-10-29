       const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  
const backgroundImage = new Image();
 backgroundImage.src ="http://www.covi.org.uk/wp-content/uploads/2016/11/Background-dots.png";

const badGuyImage = new Image();
badGuyImage.src = 'http://pluspng.com/img-png/png-needle-sewing-needle-png-600.png';
const adiosImage = new Image();
adiosImage.src ='https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/mgW44id/water-explosion-on-black-cg-slow-motion-with-alpha-matte-full-hd_sdatmvrl__F0003.png';

const heroImage = new Image();
heroImage.src ="https://vignette1.wikia.nocookie.net/battlefordreamislandfanfiction/images/2/25/Bubble_Pose.png/revision/latest?cb=20160711195710";
 const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
  };
const gameData = {
   hero:{
     x:10,
     y:520,
     width:150,
     height:110,
     xDelta:1,
     yDelta:0,
     img:heroImage

  },

a: []
 };
 const badGuy = gameData.a;
 const createPoint = function(count, canvasWidth, canvasHeight) {
    
    const details = function(n) {
      if (n < 1) {return ""}
      badGuy.push({
        x: rand(canvasWidth - 100),
        y: rand(canvasHeight - 100),
        width: 100,
        height: 100,
        xDelta: 5,
        yDelta: 5,
        img: badGuyImage
       });
      details(n-1)
    }
    details(count);
    return badGuy;
  };
  
  const points = createPoint(6,canvas.width, canvas.height);	

    

//const badGuy=gameData.badGuy;
const hero =gameData.hero;


  
const draw = function(){  
    context.clearRect(0,0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    const drawEvery = function(arr,i){
      if(i === arr.length){
        return "";
      }
      context.drawImage(arr[i].img, arr[i].x, arr[i].y,arr[i].width, arr[i].height); 
      drawEvery(arr,i+1);
    };
    drawEvery(points,0);
  };
 
  const updateData = function(){
    const upd = function(arr, i){
      if(i === arr.length){
        return "";
      }
      if(arr[i].x >= canvas.width-arr[i].width){
        arr[i].xDelta = -arr[i].xDelta;
      }else if(arr[i].x<=0){
        arr[i].xDelta = -arr[i].xDelta;
      }
      if(arr[i].y >= canvas.height-arr[i].height){
        arr[i].yDelta = -arr[i].yDelta;
      }else if(arr[i].y<=0){
        arr[i].yDelta = -arr[i].yDelta;
      }
      arr[i].x = arr[i].x + arr[i].xDelta;
      arr[i].y = arr[i].y + arr[i].yDelta;
      upd(arr,i+1);
    };
    upd(points,0);
  };
const loop = function(){
	
	draw();
	updateData();
	requestAnimationFrame(loop);
}; 
loop();

 const drawhero=function(){
  	context.drawImage(hero.img,hero.x,hero.y,hero.width,hero.height)
  };
  const updateDataHero = function(){
 const check = function(ar, i) {
       if(i >= ar.length) {
         return;
       } 
  
      if(ar[i].x+100>=hero.x && ar[i].x<=hero.x+hero.width &&
          ar[i].y+100>=hero.y && ar[i].y<=hero.y+hero.height) {
      
            alert('Adioooooosss!!');
        context.drawImage(adiosImage, 0, 0, canvas.width, canvas.height);
          }
          
      if(ar[i].x+100>=hero.x && ar[i].x<=hero.x+hero.width &&
          ar[i].y+100>=hero.y && ar[i].y<=hero.y) {
        	alert('Adioooooosss!!');

       context.drawImage(adiosImage, 0, 0, canvas.width, canvas.height);
          }
       
       check(ar, i + 1);
     };
     
     check(points, 0);
  };
  const loopHero = function(){
  
  	drawhero();
  	updateDataHero();
  	requestAnimationFrame(loopHero);
  };
loopHero();
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
		const hero= gameData.hero;
        hero.x=hero.x+25;
        if(hero.x>= canvas.width-hero.width){
        	hero.x=0;
        }
    }
        else if (event.keyCode===leftKey){
        	hero.x=hero.x-25;
        	if(hero.x<=0){
        		hero.x=canvas.width - hero.width;
        	}
        }
        else if (event.keyCode===upKey){
              hero.y = hero.y - 25; 
        		if (hero.y<=0){
        			hero.y=canvas.height-hero.y;
        		}
        	}
        	else if (event.keyCode===downKey){
        		if(hero.y>=0 && hero.y<=canvas.height-hero.height){
                 hero.y= hero.y+25;
             }
        }
  	
}, false);
