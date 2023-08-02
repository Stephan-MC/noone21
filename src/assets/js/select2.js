

// document.querySelector(".selectrange .pricerngbtn").onclick= function(){

//    var txt =  this.parentElement.querySelector("#lower-value").innerHTML;
//    var txt2 =  this.parentElement.querySelector("#upper-value").innerHTML;
//     var result = txt + "-" + txt2;
//     this.parentElement.parentElement.querySelector("#selectrng").value = result;
// }

// document.querySelector(".selectrange").onclick= function(){

//     this.classList.toggle("active");
// }


// var nonLinearSlider = document.getElementById('nonlinear');

// noUiSlider.create(nonLinearSlider, {
// 	connect: true,
// 	behaviour: 'tap',
// 	start: [ 1, 5000 ],
// 	range: {
// 		min: 1,
// 		max: 5000
// 	}
// });

// var nodes = [
// 	document.getElementById('lower-value'), // 0
// 	document.getElementById('upper-value')  // 1
// ];

// // Display the slider value and how far the handle moved
// // from the left edge of the slider.
// nonLinearSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
// 	nodes[handle].innerHTML = values[handle];  
//   verifyBoxes(values)
// });


// function verifyBoxes(v) {
//   var boxesArr = [].slice.call(document.querySelectorAll(".box")).map(function(item){
//       return item
//   });

//   for (var i =0; i < boxesArr.length; i++) {
//     var box = boxesArr[i]
//     var price = box.querySelector('.price').textContent
//     var priceNumb = parseInt(price)
//     var vMin = v[0]
//     var vMax = v[1]
    
//     if (priceNumb > vMax || priceNumb < vMin  ) {
//         box.classList.add('-close') 
//      } else {
//        box.classList.remove('-close')
//      }
//   }
// }


// var genericExamples = new Choices('[data-trigger]', {
//   });

// var basicexamp = new Choices('#gender', {
//   });
//   var basicexamps = new Choices('#radius', {
//   });

//  var availability = new Choices('#availability', {
//   });

