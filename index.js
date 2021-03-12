const url = "./Assets/restaurant.json";

const atraparJson = fetch(url).then((res) => res.json());

const json = async () => {
  const x = await atraparJson;
  return x;
};

json().then((json) => {
  const handleClick = (evt) => {
    console.log(evt.path[0].textContent);
    const categoria = evt.path[0].textContent;

    for (let i = 0; i < json.length; i++) {
      if (json[i].name == "Burguers") {
        
        const divBurguers = document.getElementById("burguers");
        const nombreCategoria = document.createElement("h2");
        nombreCategoria.textContent= json[i].name;
        divBurguers.appendChild(nombreCategoria);
      }

      
    }
    
  };

  const burguers = document.getElementById("burguers");
  burguers.addEventListener("click", handleClick);

  const tacos = document.getElementById("tacos");
  tacos.addEventListener("click", handleClick);

  const salads = document.getElementById("salads");
  salads.addEventListener("click", handleClick);

  const desserts = document.getElementById("desserts");
  desserts.addEventListener("click", handleClick);

  const drinks = document.getElementById("drinks");
  drinks.addEventListener("click", handleClick);
});
