

var elementDetails;
function change(details){
    document.getElementById("add").disabled = false;
    document.getElementById('color').innerHTML =  details;
    document.getElementById('color1').innerHTML =  details;
    elementDetails = details;
    setPrice();
}
var price;
var discountPrice;
function setPrice(){

  switch(elementDetails){
    case "Red":
      price=14.99;
      break;
    case "Purple":
      price=15.99;
      break;
    case "Black":
      price=17.99;
      break;
    case "White":
        price=19.99;
        break;
    case "Orange":
        price=12.99;
        break;
    case "Yellow":
        price=18.99;
        break;
    case "Blue":
        price=11.99;
        break;
    case "Navy":
        price=9.99;
        break;
    case "Lightbrown":
        price=21.99;
        break;
    case "Lightblue":
        price=7.99;
        break;
    case "Lightgreen":
        price=13.99;
        break;
    case "Pink":
        price=15.99;
        break;
    case "Green":
        price=22.99;
        break;
    case "Grey":
        price=24.99;
        break;
    case "Brown":
        price=5.99;
        break;
    case "Aqua":
        price=23.99;
        break;
    case "Lightgrey":
        price=20.99;
        break;
    default:
      price=14.99;
  }
  document.getElementById("originalPrice").innerHTML=price;
  document.getElementById("price").innerHTML=(price*.75).toFixed(2);;
  
}

function populate(){
  var i=0;
  var node = document.getElementById(elementDetails);
  while (i<count){
    document.getElementById("detail").appendChild(node.cloneNode(true));
    i++;
  }
}



/**JS on Modal */
var count = 0;
function countUp(){
  count++;
  document.getElementById('count').innerHTML =  count;
  document.getElementById('countOnModal').innerHTML =  count;
}

function countDown()
{
  document.getElementById('count').innerHTML =  count;
  document.getElementById('countOnModal').innerHTML =  count;
  if (count>0){
    count--;
  }
}

function checkOut(){
  if (count!=0){
    var text = "Checkout Now";
    document.getElementById("add").innerHTML = text;
  }
  
}

function reset(){
  count=0;
  document.getElementById('count').innerHTML 
                =  count;
  document.getElementById('countOnModal').innerHTML 
                =  count;
}

function addItem2Table(){
  var table = document.getElementById("table");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}

  if(count==0){
    $(document).ready(function(){
      $("#add").click(function(){
        $("#myModal").modal();
      });
    });
  }else{
    $(document).ready(function(){
      $("#add").click(function(){
        $("#checkoutModal").modal();
      });
    });
  

  
}
