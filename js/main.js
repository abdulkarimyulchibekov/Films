var elSelect = document.querySelector('.js-select');
const set = new Set();
for (film of films) { 
  set.add(...film.genres);
}
set.delete(undefined)
console.log(set);

for (element of set) {
  const elOption = document.createElement("option");
  elOption.textContent = element;
  elOption.value = element;
  elSelect.appendChild(elOption);
}

const elList = document.querySelector(".js-list")

const time = function(a) {
  return (Math.floor(a / 31536000) + 1970);
}

let domgaChiqarator = (array, node) => {
  array.forEach((film) => {
    let elItem = document.createElement("li");
    elItem.classList.add("item")
    let elSubheader = document.createElement("h3");
    elSubheader.classList.add("subheader")
    let elImg = document.createElement("img");
    let elText = document.createElement("p");
    elText.classList.add ("text");
    let array = film.genres;
    let elSublist = document.createElement("ul")
    elSublist.classList.add("sublist");
    for(gen of array) {
      const elSubitem = document.createElement("li");
      elSubitem.textContent = gen;
      elSublist.appendChild(elSubitem);
    }
    let elTime = document.createElement("p");
    elTime.textContent = `year of production: ${time(film.release_date)}`
    elTime.classList.add("desc");
  
    elText.textContent = film.overview;
    elImg.src = film.poster;
    elSubheader.textContent = film.title;
  
    elItem.appendChild(elImg);
    elItem.appendChild(elSubheader);
    elItem.appendChild(elText);
    elItem.appendChild(elTime);
    elItem.appendChild(elSublist);
    elList.appendChild(elItem);
  })
}

domgaChiqarator(films, elList);

elSelect.addEventListener('change', function () {
	let selVal = elSelect.value;
	result = [];
	elList.innerHTML = '';
	films.forEach((poc) => {
		if (poc.genres.includes(selVal)) {
			result.push(poc);
		}
	});
	domgaChiqarator(result, elList)
});
