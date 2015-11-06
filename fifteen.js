window.onload = function()
{
    //alert("Welcome");
    
    //var box= document.getElementById("overall");
    
    var blocks= document.getElementById("puzzlearea").getElementsByTagName("div");
    
    var pos_x= 100;
    var pos_y=0;
    
    
    setup_board(blocks,pos_x,pos_y);
    
}

var empty_pos= 15;

var is_next_empty= function(blocks,block_pos)
{
    //alert("over");
    /*
    if(block_pos<14&&parseInt(blocks[block_pos].style.right)-parseInt(blocks[block_pos+1].style.left)
    >=98)
    {
        /////shift right
        
    }
    else if(block_pos>0&&parseInt(blocks[block_pos].style.left)-parseInt(blocks[block_pos-1].style.right)
    >=98)
    {
        /////shift left
        
    }
    else if(block_pos<12&&parseInt(blocks[block_pos].style.bottom)-parseInt(blocks[block_pos+4].style.top)
    >=98)
    {
        /////shift down
    }
    else if(block_pos>3&&parseInt(blocks[block_pos].style.top)-parseInt(blocks[block_pos-4].style.bottom)
    >=98)
    {
        //////shift up
        
    }
    else if(block_pos==14&&empty_pos==15)
    {
        alert("called");
        blocks[block_pos].addClassName("movablepiece");
    }*/
}

var set_hover=function(blocks,block_pos)
{
    is_next_empty(blocks,block_pos);
}

var set_correct= function(blocks)
{
    blocks[0].style.backgroundPosition="0px 50PX";
    blocks[1].style.backgroundPosition="-100px 50PX";
    blocks[2].style.backgroundPosition="-225px 50PX";
    blocks[3].style.backgroundPosition="-321px 50PX";
    ////////row 2
    blocks[4].style.backgroundPosition="0px -49PX";
    blocks[5].style.backgroundPosition="-101px -49PX";
    blocks[6].style.backgroundPosition="-225px -50PX";
    blocks[7].style.backgroundPosition="-321px -49PX";
    ////////row 3
    blocks[8].style.backgroundPosition="0px -145PX";
    blocks[9].style.backgroundPosition="-102px -147PX";
    blocks[10].style.backgroundPosition="-225px -147PX";
    blocks[11].style.backgroundPosition="-321px -147PX";
    ///row 4
    blocks[12].style.backgroundPosition="0px -244PX";
    blocks[13].style.backgroundPosition="-104px -244PX";
    blocks[14].style.backgroundPosition="-194px -244PX";
}


var setup_board= function(blocks,pos_x,pos_y)////Initial board setup
{
    for(var i=0; i<blocks.length;i++)
    {
        blocks[i].addClassName("puzzlepiece");
        
        blocks[i].style.backgroundRepeat="no-repeat";
        
        if(i>0)
        {
            blocks[i].style.left=(pos_x+"px");
            blocks[i].style.top=(pos_y+"px");
            pos_x+=100;
            //pos= getComputedStyle(blocks[i]);
        }
       
        if(pos_x>=400)
        {
            pos_x=0;
            pos_y+=100;
        }
        
        blocks[i].mouseover = set_hover(blocks,i);
    }
    
    set_correct(blocks);
}