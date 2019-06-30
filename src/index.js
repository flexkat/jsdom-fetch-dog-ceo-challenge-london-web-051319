console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {


  const breedDropdown = document.getElementById("breed-dropdown")
  let letter = breedDropdown.value
  const dogBreedsUL = document.querySelector("#dog-breeds");


  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(data => data.json())
  .then(imageArray => addImages(imageArray["message"]))
  
  const imageContainer = document.querySelector("#dog-image-container");

  function addImages(imageArray) {
    for (const image of imageArray) {
      const img = document.createElement("img")
      img.src = image
      imageContainer.appendChild(img);
    }
  }

  function fetchDogBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
    .then(data => data.json())
    .then(breedsObject => breedsObject.message);
  }

  function filterDogBreed(event) {
    dogBreedsUL.innerHTML = "";
    letter = event.target.value
    console.log(letter)
    showSortedDogs(letter)
  }

  function createDogLI(breed) {
    const li = document.createElement("li")
    li.innerText = breed
    li.id = breed
    clickChangesColor(li)
    dogBreedsUL.appendChild(li)
  }

  function clickChangesColor(element) {
    element.addEventListener("click", (e) => {
      element.style.color = "red"
    })
  }

  function showSortedDogs(letter) {
    fetchDogBreeds()
    .then(dogBreeds => {
      for(const breed in dogBreeds) {
        if(breed[0] === letter) {
          createDogLI(breed)
        }
      }
    })
  }

  breedDropdown.addEventListener("change", filterDogBreed)


  fetchDogBreeds();
})