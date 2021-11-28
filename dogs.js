
// //This is the API url
// const DOG_URL = "https://dog.ceo/api/breeds/image/random";

// //The fetch api
// // const promise = fetch(DOG_URL);
// const dogs = document.querySelector(".dog")
// const addDog = document.querySelector(".addDogs")


// function myApi() {
//   const promise = fetch(DOG_URL);
//   promise
//   .then(function(response) {
//     const processingPromise = response.json();
//     return processingPromise;
//   })
//   .then(function(processedResponse) {
//     const img = document.createElement("img")
//     img.src = processedResponse.message;
//     img.alt = "Cute dogs"
//     dogs.appendChild(img);
//     // console.log(processedResponse.message);
//     //console.log(processedResponse.status);
//   });
// }  

// console.log("this will log first");


// addDog.addEventListener("click", myApi);

//Select API to select DOGS based on their breeds
const DOGS_SELECT = "https://dog.ceo/api/breeds/list/all" //This is the breeds API that lists all dogs breed in an object
const sel = document.querySelector(".mySelect") //the select options thing
const breed = document.querySelector(".breed") //The select breed button 
const container = document.querySelector(".img_container") //The dogs images container


//The Fetch function
function dogSelect() {
  const promise = fetch(DOGS_SELECT);
  promise
  .then(
    function(response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
        var a = processedResponse.message; //The processed response has 2 part message and status. We only need Message
        //The returned message is an object and it is turned to an array using Object.keys
        var b = Object.keys(a)
       for (var i = 0; i < b.length; i++) { //We iterated over b and then passed the b[i] result to option innerHTMl and value
   const option = document.createElement("OPTION")
   option.innerHTML = b[i];
   option.value = b[i];
   sel.appendChild(option); //We appended the created option element to the select element
}
  });
}  
breed.addEventListener("click", dogSelect); //Event Listener to display all the dogs breeds on clicking select breed button


// Code to display images on click of breed of choice in the option
function getFullImage(breedName){ //Function takes in breedName as parameter
const breedImages = `https://dog.ceo/api/breed/${breedName}/images`; //The breedImages API without the breedname coz it will be auto added

// Fetch API
fetch(breedImages)
  .then(function(response){
    const breedResponse = response.json();
    return breedResponse;
//The above line of the FETCH API has fetched the API
  })
  .then(function(fullResponse){ //fullResponse shows all the images associated with a particular breed
    console.log(fullResponse)
    showImages(fullResponse);
  })
//The above line of the API determines what to do with the fetched API 
}


// Used to show pick out the image and add it to and image source and add it to the container
function showImages(fullResponse){
  var dogList = fullResponse.message; //The fullResponse.message picks only the message part and leaves out the status part. It is assigned to dogList 
  container.innerHTML = ""; //This is needed to reset the image container to empty so that other selection can happen. If not, the breeds will just be added below the initial breeds
  for (let i = 0; i < dogList.length; i++){ // using forLoop to iterate over dogList and turn it to image source
    const myDogImage = document.createElement("img");
    myDogImage.src = dogList[i];
    container.appendChild(myDogImage) //The images are then added to the container. Refer back to LINE 85. once all this run
  }
  //ForEach that does the same thing like a ForLoop. When this is used, you don't need line 85 
  // dogList.forEach(function(image){
  //   container.innerHTML += `<img src="${image}"></img>`
  // })
  
}
//The event listener that works on the select element. It says when the select element is clicked (this.value) means tell me what is clicked
sel.addEventListener('click', function() {
  
  getFullImage(this.value) //Remember the getFullImage has a breedName as parameter. The breedName will now change based on the option clicked
  // console.log('You selected: ', this.value);
});
