const list_position_players = document.getElementById("list_position_players");
let allPlayers = [];
let formations = [];
//fetch data
fetch("../DataBase/players.json")
  .then((response) => response.json())
  .then((data) => {
    allPlayers = data.players;
    formations = data.formations;
    displayPlayersEmptyElement(formations);
  })
  .catch((error) => {
    console.log(error);
  });

function playerCardEmptyElemet(id, position,column,row) {
  const EmptyCard = document.createElement("div");
  EmptyCard.setAttribute("class", `relative w-[6rem]`);
  EmptyCard.style.gridColumn=column;
  EmptyCard.style.gridRow=row;
  EmptyCard.setAttribute("id", `card${id}`);
  EmptyCard.innerHTML = `
                <img src="./assets/img/card.png" class="w-[10rem]" alt="" />
          <div
            class="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <i class="fa-solid fa-plus text-[1.6rem]"></i>
          </div>
          <div
            class="absolute shadow-xl  bg-[#555] text-white rounded-[50%] w-[3rem] text-center px-2 py-2 left-[50%]  translate-x-[-50%]"
          >
            <p>${position}</p>
          </div>
          `;
  return EmptyCard;
}
function displayPlayersEmptyElement(formations) {
  Object.values(formations)[0].forEach((Element) => {
    console.log(Element);

    list_position_players.appendChild(
      playerCardEmptyElemet( Element.id, Element.position,Element.column,Element.row)
    );
  });
}

function addNewPlayer() {
  console.log("yep");
}
// afficher les membres qui sont dans le meme groupe
function displayMembersGroupe(fonction) {
  list_members.innerHTML = "";
  allEmployes.filter((el) => {
    el.fonction === fonction ? memberShowGroup.push(el) : "";
  });

  memberShowGroup.forEach((el) => {
    const list = document.createElement("div");
    list.setAttribute(
      "class",
      "flex gap-[3rem] mb-[1rem] w-[90%] m-auto border-[1px] h-[5rem] px-[1rem] rounded-md  items-center"
    );
    list.innerHTML = ` 
         <img src="${el.image}" alt="${el.nom}" class=" h-[3rem] w-[3rem]  rounded-[50%]">
         
      <div class="w-[80%]">
        <h2 class="text-xl font-semibold text-gray-800">${el.nom} ${el.prenom}</h2>
        <p class="text-gray-600">${el.fonction}</p>
      </div>
      <button onclick="addMember('${el.id}','${el.fonction}')" class="bg-[#01008A] text-white capitalize rounded-md px-4 py-1">add</button>
     `;
    list_members.appendChild(list);
  });
}
