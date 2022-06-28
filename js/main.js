const elList = document.querySelector(".js-list")

const time = function(a) {
  return (Math.floor(a / 31536000) + 1970);
}

films.forEach((film) => {
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
  elTime.textContent = time(film.release_date);
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