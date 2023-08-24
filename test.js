
// function productFib(prod){
//     console.log(prod);

//     let fib = [0,1];
//     for(let i = 0; i < 50; i++){
//         fib.push(fib[i]+fib[i+1]);
//         if(fib[i] * fib[i+1] === prod){
//             //console.log([fib[i],fib[i+1],'true']);
//             //break;
//             return [fib[i],fib[i+1],'true'];
//         }
//         else if(fib[i] * fib[i+1] > prod){
//             //console.log([fib[i],fib[i+1],'false']);
//             //break;
//             return [fib[i],fib[i+1],'false'];
//         }
//     }
//     //console.log(fib);

// }
// //productFib(5895)

// var number = function(busStops){
//     console.log(busStops);
//     let start = 0;
//     let stop = 0;
//     for (let index = 0; index < busStops.length; index++) {
//         start  += busStops[index][0];
//         stop   +=  busStops[index][1];
//     }
//    // console.log(start-stop);
//     return start-stop;
//    }

// // spread operator
// arrr = [...temp];

// //   console.log('arrr',arrr);

// const sum = a => a == 2 ;


// let r = sum(2); // arguments
// console.log('sum is',r); 
//      number([[10,0],[3,5],[5,8]]);
// let studentList = [
//     {
//       id: 1,
//       firstName: "Sanjay",
//       lastName: "Kumar",
//       email: "sanjay.kumar@example.com",
//       phone: "7012345678",
//       address: "567, Green Street, Jaipur",
//       date: "2023-07-30",
//     },
//     {
//       id: 2,
//       firstName: "Neha",
//       lastName: "Shah",
//       email: "neha.shah@example.com",
//       phone: "7123456789",
//       address: "901, Red Avenue, Ahmedabad",
//       date: "2023-07-30",
//     },
//     {
//       id: 3,
//       firstName: "Vikram",
//       lastName: "Gupta",
//       email: "vikram.gupta@example.com",
//       phone: "9012345678",
//       address: "321, Lake View, Chennai",
//       date: "2023-07-30",
//     },
//   ];
//    console.log(studentList.length-1)

//    studentList = studentList.filter(function(itam){
//     //console.log(itam);
//     return itam.id !== 2;
//    })

//    console.log(studentList);



//let arrr = [1,2,5,6,45,76,3,56,5];
// //   console.log('arrr',arrr);
//   let temp = [];
//   for (let index = 0; index < arrr.length; index++) {
//     if(arrr[index] > 10 ){
//         temp.push(arrr[index]);
//     }
//   }

// arrr.forEach(function (item){
//     console.log('----->>>',item);
//         if(item > 10) {
//             temp.push(item);
//         }
// })

// arrr = arrr.filter(function (item) {
//         console.log(item);
//         return item > 10;
//  })

//   console.log('----->>>11',arrr);


//findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
//findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55

// function findUniq(arr) {
//   console.log('----->>>11',arr);
//   let uniq = arr[0];
//   let i = 0;
//   if (arr[0] !== arr[arr.length-1] && arr[0] !== arr[arr.length-2]) {
//     //console.log(arr[0]);
//     return arr[0];

//   }
//   for ( ; i < arr.length; i++) {

//           if (uniq !== arr[i]) {
//             uniq = arr[i];
//             //console.log(uniq);
//             //break;
//             return uniq;
// //           }    
// //   }

// // }

// //findUniq([ 3, 1, 1,  1, 1 ]) ;

// // function squareSum(numbers){
// //   console.log(numbers);
// //   let squre = 0;
// //   for (let i = 0 ; i < numbers.length; i++) {
// //    squre += numbers[i]*numbers[i];
// //   }
// //   //console.log(squre);
// //   return squre;

// // }

// //squareSum([1,2]);


// function digPow(n, p) {
//   console.log(n, p);
//   let sum = 1;
//   let store = 0;
//   //let arr = [];
//   let arr = n.toString().split('');
//   console.log(arr);
//   for (let i = 0; i < arr.length; i++) {
//     sum = 1;
//     for (let j = 0; j < p + i; j++) {
//       sum *= arr[i];
//     }
//     store += sum;

//   }
//   console.log('summm', store);

//   if (store < n) {
//     console.log('-1');
//     //return -1;
//   }
//   for (let i = 0; i < n*p; i++) {

//     if (store / i === n) {
//       console.log('return',i);
//       //return i;
//     }
//   }
//   console.log('last -1');
//   //return -1;
// }

// digPow(10383, 6);


// function strCount(str, letter){ 
//   let str1 = str.toLowerCase(); 
//   console.log(str1, letter);
//   let count = 0 ;
//   for (let index = 0; index < str1.length; index++) {
//     if(str1[index] === letter)
//     {
//        count++;
//     }

//   }
//   console.log(count);

// }

//strCount('heeEllo','e');


// function rowSumOddNumbers(n) {
//   //console.log(n);

//   let element = 1;
//   let result = 0;
//   for (let i = 1; i <= n ; i ++){ // 3
//     for (let j = 1; j <= i ; j++){ // 2 
//        console.log("element",element);
//       if(i === n) {
//         result += element;
//       }
//        element += 2;
//     }
//   }

//   return result;
//   //console.log(result);
// }
//rowSumOddNumbers(3);



// function countPositivesSumNegatives(input) {
//   console.log('input',input);
//   let count = 0;
//   let sum = 0;


//   if (!input || !input.length) {
//      console.log('null []');
//     return [];
//    }

//   for (let index = 0; index < input.length; index++) {
//     if (input[index] > 0) {
//       count ++;
//     }
//     else if (input[index] < 0) {
//       sum += input[index];
//     } 
//   }
//   console.log([count,sum]);
//   //return [count,sum];

// }
// countPositivesSumNegatives([])



//  let arr = ['Hello', 'Goodbye', 'Hello Again' ];
// let odd = 0;
// let new_arr = arr[0]+' ';
// for (let i = 1; i < arr.length; i++) {
//   if (i % 2 === 0) {
//     new_arr += arr[i]+' ';

//   }

// }
// let narr = new_arr.trimEnd();
// console.log([narr]);


// let arr = ['Hello', 'Goodbye', 'Hello Again' ];

// arr = arr.filter(function(arr) {

//   if (itam % 2 === 0) {
//          arr[itam];

//        }
//        return arr;
// })
// console.log(arr);

     
// 

     
let array = [1,3,4,6,3];
let sum = 0;


if(array.length === 0 || array.length === 1|| array === 0){
  //console.log('even[]');
  return 'even';
}

for (let i = 0; i < array.length; i++) {
  sum += array[i]; 
   //console.log('sum',sum);
}
  
 if (sum%2 === 0) {
  //console.log('even');
   return "even";
 }

 else if (sum%2 !== 0) {
  //console.log('odd');
   return "odd";
 }