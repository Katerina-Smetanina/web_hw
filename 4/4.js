function area_of_triangle(){
    var a,h,answer;
    
    a = document.getElementById('a').value;
    a = parseFloat(a);

    h = document.getElementById('h').value;
    h = parseFloat(h); 
    
    if(a<=0 || h<=0){
        document.getElementById('out').innerHTML = "Erorr,только положительные значения";
    }
    else{
    answer = (a*h)/2;
    document.getElementById('out').innerHTML = answer;
    }
}

function Fib(){
    let a = 0,b = 1;
    let sum = 1;
    for (let i = 2; i < 10; i++) {
        let tmp = a + b;
        a = b;
        b = tmp;
        sum = sum + tmp;  
    }
        document.getElementById('out_sum').innerHTML =sum;

}

function matrix(){
    
    a1 = document.getElementById('a1').value;
    a2 = document.getElementById('a2').value;
    a3 = document.getElementById('a3').value;

    a4 = document.getElementById('a4').value;
    a5 = document.getElementById('a5').value;
    a6 = document.getElementById('a6').value;

    a7 = document.getElementById('a7').value;
    a8 = document.getElementById('a8').value;
    a9 = document.getElementById('a9').value;
    
    a10 = document.getElementById('a10').value;
    a11 = document.getElementById('a11').value;
    a12 = document.getElementById('a12').value;
    
    var mass = [
        [a1, a2, a3],
        [a4, a5, a6],
        [a7, a8, a9],
        [a10,a11,a12]
    ];

    let out_mass='';

    for (let i = 1; i < mass.length; i++) {
       for (let j = 0; j < mass[i].length; j++) {
           mass[i][j]=mass[i][j]-mass[0][j];
           out_mass += mass[i][j] + ' ';  
       }
       out_mass += '<br>'   
    }
       document.getElementById('out_mass').innerHTML= out_mass;
}

/*function getRandomInt(min, max){       //Принимает параметры min и max. Возвращает случайное целое число между min (включительно) и max (не включая max)
    let rand = min - 0.5 + Math.random() * (max - min + 1);    
    // return Math.round(rand);
    
     document.getElementById('out_Rand').innerHTML =rand;
}*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  document.getElementById('out_rand').innerHTML= getRandomInt(8,17);

                               

function getArray(n){                  //Принимает размерность n Возвращает массив со сгенерированными значениями через функцию getRandomI
    
                               
}

function getResultArray(n){

}
