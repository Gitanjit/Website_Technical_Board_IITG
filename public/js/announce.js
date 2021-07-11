
function myFunction1(cat) {
    var temp, i ,a2;
    temp = document.getElementsByClassName("search-in-ann");
    for (i = 0; i < temp.length; i++) {
        if(cat=="important"){
            a2 = temp[i].getElementsByTagName("span")[1].innerHTML;
            a2= a2.trim();
            // console.log(a2)
            if(a2 ==   "true"){
                temp[i].style.display = "";
            }
            else{
                temp[i].style.display = "none";
            }
        }
        if(cat=="all"){
            temp[i].style.display = "";
        }
        
    }
    
}

function myFunction3(cat) {
    var temp, i ,a2;
    temp = document.getElementsByClassName("search");
    for (i = 0; i < temp.length; i++) {
        if(cat=="important"){
            a2 = temp[i].getElementsByTagName("span")[1].innerHTML;
            a2= a2.trim();
            console.log(a2)
            if(a2 ==   "true"){
                temp[i].style.display = "";
            }
            else{
                temp[i].style.display = "none";
            }
        }
        if(cat=="all"){
            temp[i].style.display = "";
        }
        
    }
    
}