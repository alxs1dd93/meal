document.addEventListener('DOMContentLoaded', () => {
  let searchInput = document.getElementById('search-input');
  const result = document.querySelector('.result');
  const test = document.querySelector('.test');
  const btnSearch = document.querySelector('.btn-search');
  const loader = document.querySelector('.loader');

  // SearchInput
  btnSearch.addEventListener('click', () => {
    loader.classList.add('block');
    const urlSearch = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`;
    fetch(urlSearch)
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        // console.log('test')
        data.meals.forEach((meal) => {
          html += `
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" loading="lazy">
                </div>
                <div class="id-meal" data-id="${meal.idMeal}">${meal.idMeal}</div>
                `;
        });
        result.innerHTML = html;
      })
      .finally(() => {
        loader.classList.remove('block');
      })
      //final
  });

  //Modal

  let openBtn = document.getElementById('open-btn');
  let modalBackground = document.getElementById('modal-background');
  let closeBtn = document.getElementById('close-btn');

  openBtn.addEventListener('click', () => {
    modalBackground.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modalBackground.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
      modalBackground.style.display = 'none'
    }
  });

  // InstructionsFetch
  let id = document.querySelectorAll('.id-meal');
  result.addEventListener('click', (e) => {
    if (e.target.classList.contains('id-meal')) {
      let mealItem = e.target.dataset.id;
      console.log(mealItem);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`)
        .then((response) => response.json())
        .then((data) => {
          modalBackground.style.display = 'block';
          //   console.log(id);
          html = "";
          if (data.meals.length) {
            let instructions = data.meals[0].strInstructions;
            let youtubeInstructions = data.meals[0].strYoutube;

            youfacingCode = new URLSearchParams(youtubeInstructions.split('?')[1]).get('v');
            html += `<div>
                      <h4>Instructions</h4>
                     <p>${instructions}</p>
                     <a class="youtube-link" href="${youtubeInstructions}">View the recipe on YouTube</a>
                     </div>
                     <iframe width="560" height="315" src="https://www.youtube.com/embed/${youfacingCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                     `;

            test.innerHTML = html;
          }
        });
    }
  });
});
