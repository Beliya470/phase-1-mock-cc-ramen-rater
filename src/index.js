document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "http://localhost:3000/ramens";
    let selectedRamenId;
  
    const detailImg = document.querySelector('.detail-image');
    const detailName = document.querySelector('.name');
    const detailRestaurant = document.querySelector('.restaurant');
    const ratingDisplay = document.querySelector('#rating-display');
    const commentDisplay = document.querySelector('#comment-display');
  
    function fetchAndDisplayRamens() {
      fetch(baseURL)
      .then(response => response.json())
      .then(ramens => {
        for (const ramen of ramens) {
          displayRamenMenu(ramen);
        }
      });
    }
  
    function displayRamenMenu(ramen) {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => displayRamenDetails(ramen));
      ramenMenuDiv.append(img);
    }
  
    function displayRamenDetails(ramen) {
      detailImg.src = ramen.image;
      detailImg.alt = ramen.name;
      detailName.textContent = ramen.name;
      detailRestaurant.textContent = ramen.restaurant;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
      selectedRamenId = ramen.id;
    }
  
    const newRamenForm = document.getElementById("new-ramen");
    newRamenForm.addEventListener("submit", event => {
      event.preventDefault();
      const newRamen = {
        name: newRamenForm.querySelector("#new-name").value,
        restaurant: newRamenForm.querySelector("#new-restaurant").value,
        image: newRamenForm.querySelector("#new-image").value,
        rating: parseFloat(newRamenForm.querySelector("#new-rating").value),
        comment: newRamenForm.querySelector("#new-comment").value
      };
      displayRamenMenu(newRamen);
      newRamenForm.reset();
    });
  
    const editRamenForm = document.getElementById("edit-ramen");
    editRamenForm.addEventListener("submit", event => {
      event.preventDefault();
  
      const updatedRamen = {
        rating: parseFloat(editRamenForm.querySelector("#edit-rating").value),
        comment: editRamenForm.querySelector("#edit-comment").value
      };
  
      fetch(`${baseURL}/${selectedRamenId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRamen),
      })
      .then(response => response.json())
      .then(updatedRamen => {
        ratingDisplay.textContent = updatedRamen.rating;
        commentDisplay.textContent = updatedRamen.comment;
      });
  
      editRamenForm.reset();
    });
  
    fetchAndDisplayRamens();
  });
  