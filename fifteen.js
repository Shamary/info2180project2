

/*The transition of the tiles was the extra feature added*/


window.onload = function()
{
    var sButton=document.getElementById("shufflebutton");
    
    var blocks= document.getElementById("puzzlearea").getElementsByTagName("div");
    
    var pos_x= 0;
    var pos_y=0;
    
    var empty_tile={
      
      sx:300,
      sy:300
    };
    
    setup_board(blocks,pos_x,pos_y,empty_tile,sButton);
}

var getNeighbour = function(blocks,empty_tile) //get all the neighbours of the empty tile
{
    var n=new Array();//array of tiles
    var pos=0;
    
    for(var i=0;i<blocks.length;i++)
    {
        if(parseInt(blocks[i].style.top)==empty_tile.sy
            &&Math.abs(parseInt(blocks[i].style.left)-empty_tile.sx)==100 
            ||(parseInt(blocks[i].style.left)==empty_tile.sx 
            &&Math.abs(parseInt(blocks[i].style.top)-empty_tile.sy)==100))
            {
                n[pos]=blocks[i];
                pos++;
            }
    }
    
    return n;
}

var swap=function(empty_tile,block)
{
    var temp_x=empty_tile.sx,temp_y=empty_tile.sy;
    
    empty_tile.sx=parseInt(block.style.left);
    empty_tile.sy=parseInt(block.style.top);
    
    
    
    //block.style.left=temp_x+"px";
    //block.style.top=temp_y+"px";
    
    var timer;
    
    if(parseInt(block.style.top)!=temp_y)/////vertical shift
    {
        timer= setInterval(function(){moveTile(block,true,temp_x,temp_y,timer);},1); 
    }
    else if(parseInt(block.style.left)!=temp_x)//////horizontal shift
    {
        timer= setInterval(function(){moveTile(block,false,temp_x,temp_y,timer);},1); 
    }
   
    //return [x,y];
}

var moveTile=function(block,vertical,x,y,timer)
{
    if(vertical)
    {
        if(parseInt(block.style.top)<y)////shift down
        {
            block.style.top= (parseInt(block.style.top)+1) +"px" 
        }
        else if(parseInt(block.style.top)>y)//////shift up
        {
            block.style.top= (parseInt(block.style.top)-1) +"px" 
        }
    }
    else
    {
        if(parseInt(block.style.left)<x)/////shift left
        {
            block.style.left= (parseInt(block.style.left)+1) +"px" 
        }
        else if(parseInt(block.style.left)>x)///////shift right
        {
            block.style.left= (parseInt(block.style.left)-1) +"px" 
        }
    }
    
    if(parseInt(block.style.top)==y&&parseInt(block.style.left)==x)
    {
        clearInterval(timer);///stop timer
    }
}


var set_correct= function(blocks)/////////correct image layout
{
    blocks[0].style.backgroundPosition="10px 50PX";
    blocks[1].style.backgroundPosition="-90px 50PX";
    blocks[2].style.backgroundPosition="-214px 50PX";
    blocks[3].style.backgroundPosition="-311px 51PX";
    ////////row 2
    blocks[4].style.backgroundPosition="10px -49PX";
    blocks[5].style.backgroundPosition="-91px -49PX";
    blocks[6].style.backgroundPosition="-215px -50PX";
    blocks[7].style.backgroundPosition="-311px -49PX";
    ////////row 3
    blocks[8].style.backgroundPosition="10px -145PX";
    blocks[9].style.backgroundPosition="-92px -147PX";
    blocks[10].style.backgroundPosition="-217px -145PX";
    blocks[11].style.backgroundPosition="-311px -147PX";
    ///row 4
    blocks[12].style.backgroundPosition="10px -244PX";
    blocks[13].style.backgroundPosition="-96px -244PX";
    blocks[14].style.backgroundPosition="-217px -244PX";
}


var setup_board= function(blocks,pos_x,pos_y,empty_tile,sButton)////Initial board setup
{
    for(var i=0; i<blocks.length;i++)
    {
       
        blocks[i].addClassName("puzzlepiece");
        
        blocks[i].style.backgroundRepeat="no-repeat";//////no repeat images in background
        
        ///////////position the tiles////////////
        blocks[i].style.left=(pos_x+"px");
        blocks[i].style.top=(pos_y+"px");
        pos_x+=100;
        
        
        if(pos_x>=400)/////check if end of row
        {
            pos_x=0;/////restart x pos
            pos_y+=100;///////next row below
        }
        
    
        ///////////////////click and hover events////////////
        
        blocks[i].onmouseover = function()
        {
            ////////check if tile is next to space. up down left or right
            if(Math.abs(parseInt(this.style.left)-empty_tile.sx)==100 && 
            parseInt(this.style.top)==empty_tile.sy || (parseInt(this.style.left)==empty_tile.sx 
            && Math.abs(parseInt(this.style.top)-empty_tile.sy)==100))
            {
                //alert("added");
                this.addClassName("movablepiece");
            }
        };
        
        blocks[i].onmousedown= function()
        {
            //alert(sx+""+sy);
            
            if(this.className=="puzzlepiece movablepiece")
            {
                var pos;
                
                if(Math.abs(parseInt(this.style.left)-empty_tile.sx)==100 
                    && parseInt(this.style.top)==empty_tile.sy)
                {
                    pos=swap(empty_tile,this);
                }
                else if(Math.abs(parseInt(this.style.top)-empty_tile.sy)==100 
                    && parseInt(this.style.left)==empty_tile.sx)
                {
                    pos=swap(empty_tile,this);
                }
            }
        };
        
        blocks[i].onmouseout = function()
        {
            this.className="puzzlepiece";/////reset tile to original state
        };
    }
    
    sButton.onmousedown=function() //////shuffle button
        {
            var nlist=new Array();///////neighbour array
            var r=0,temp_x=0,temp_y=0;
            
            for(var p=0;p<300;p++)
            {
                nlist=getNeighbour(blocks,empty_tile);
                
                r=Math.round(Math.random()*(nlist.length-1));//get random index from neighbour array
                
                //alert(r);
                
                temp_x=empty_tile.sx;
                temp_y=empty_tile.sy;
                
                empty_tile.sx=parseInt(nlist[r].style.left);
                empty_tile.sy=parseInt(nlist[r].style.top);
                
                nlist[r].style.left=temp_x+"px";
                nlist[r].style.top=temp_y+"px";
            }
        };
    
    set_correct(blocks);
}