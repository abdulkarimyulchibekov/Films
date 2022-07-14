const elList = document.querySelector('.js-list');
const elBookMarkList = document.querySelector(".bookmark-list");
const elSelect = document.querySelector('.js-select');
const localFilms = JSON.parse(window.localStorage.getItem("bookmark"))
const bookmarkList = localFilms || []
const set = new Set();

for (film of films) {
	set.add(...film.genres);
}
set.delete(undefined);

for (element of set) {
	const elOption = document.createElement('option');
	elOption.textContent = element;
	elOption.value = element;
	elSelect.appendChild(elOption);
}


const time = function (a) {
	return Math.floor(a / 31536000) + 1970;
};

let domgaChiqarator = (array, node) => {
	array.forEach((film) => {
		let elItem = document.createElement('li');
		let elSubheader = document.createElement('h3');
		let elImg = document.createElement('img');
		let elBox = document.createElement("div");
		let elBookMarkButton = document.createElement("button");
		let elModalButton = document.createElement("button");

		elItem.classList.add('item');
		elBox.classList.add("box");
		elSubheader.setAttribute("class",'subheader');
		elBookMarkButton.classList.add("bookmark");
		elBookMarkButton.dataset.filmId = film.id;
		elModalButton.classList.add("modal");

		elImg.src = film.poster;
		elSubheader.textContent = film.title;
		elModalButton.textContent = "More...";
		elBookMarkButton.textContent = "Add to bookmark list"

		elItem.appendChild(elImg);
		elItem.appendChild(elSubheader);
		elBox.appendChild(elBookMarkButton);
		elBox.appendChild(elModalButton);
		elItem.appendChild(elBox);
		elList.appendChild(elItem);
	});
};

domgaChiqarator(films, elList);

let result = films;

elSelect.addEventListener('change', function () {
	let selVal = elSelect.value;
	result = [];
	elList.innerHTML = '';
	films.forEach((poc) => {
		if (poc.genres.includes(selVal)) {
			result.push(poc);
		}
	});
	domgaChiqarator(result, elList);
});



let aToZ = document.querySelector('.a_to_z');
let zToA = document.querySelector('.z_to_a');

aToZ.addEventListener('click', function () {
	let newArray = result.sort((a, b) => {
		if (a.title > b.title) return 1;
		return -1;
	});

  console.log(newArray);
  elList.innerHTML = "";
	domgaChiqarator(newArray, elList);
});

zToA.addEventListener('click', function () {
	let newArray = result.sort((a, b) => {
		if (a.title < b.title) return 1;
		return -1;
	});

  console.log(newArray);
  elList.innerHTML = "";
	domgaChiqarator(newArray, elList);
});

const getBookmarkMovies = (array,node) => {
	node.innerHTML = "";
	window.localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
	array.forEach(e => {
		const newLi = document.createElement("li");
		const newButton = document.createElement("button");

		newLi.textContent = e.title;
		newButton.textContent = "Delete";
		newButton.setAttribute("class", "bookmark-delete");
		newButton.dataset.filmId = e.id;

		newLi.appendChild(newButton);
		node.appendChild(newLi);
	})
}

getBookmarkMovies(bookmarkList, elBookMarkList);

elList.addEventListener("click", function(evt) {
	if(evt.target.matches(".bookmark")) {
		const lovelyFilm = evt.target.dataset.filmId;
		const findedFilm = films.find(e => e.id == lovelyFilm);
		if(!bookmarkList.includes(findedFilm)){
			bookmarkList.push(findedFilm);
			getBookmarkMovies(bookmarkList, elBookMarkList);
		}
		
	}
})

elBookMarkList.addEventListener("click", function(evt) {
	if(evt.target.matches(".bookmark-delete")){
		const filmId = evt.target.dataset.filmId;
		const findedFilm = films.findIndex(e => e.id == filmId);
		bookmarkList.splice(findedFilm,1);
		getBookmarkMovies(bookmarkList, elBookMarkList);
	}
})