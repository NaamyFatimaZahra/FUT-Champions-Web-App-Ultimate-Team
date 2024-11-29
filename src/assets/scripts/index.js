const list_main_players = document.getElementById("list_main_players");
const list_reserve_players = document.getElementById("list_reserve_players");
const container_groupe_player = document.getElementById(
  "container_groupe_player"
);
const list_players = document.getElementById("list_players");
let allPlayers = [];
let formations = [];
let playerMembers = [];
//fetch data
fetch("../DataBase/players.json")
  .then((response) => response.json())
  .then((data) => {
    allPlayers = data.players;
    console.log(allPlayers);

    formations = data.formations;
    console.log(formations);

    displayPlayersEmptyElement(formations);
    displayReserveMembers();
  })
  .catch((error) => {
    console.log(error);
  });

function playerCardEmptyElemet(
  id,
  position,
  column,
  row,
  justifySelf,
  alignSelf
) {
  const EmptyCard = document.createElement("div");
  EmptyCard.setAttribute("class", `relative w-[7rem] h-fit `);
  EmptyCard.style.gridColumn = column;
  EmptyCard.style.gridRow = row;
  EmptyCard.style.justifySelf = justifySelf;
  EmptyCard.style.alignSelf = alignSelf;
  EmptyCard.setAttribute("onclick", `showPlayerAdd(${id})`);
  EmptyCard.setAttribute("id", `${id}`);
  EmptyCard.innerHTML = `
                <img src="./assets/img/card.png" class="w-[10rem]" alt="" />
          <div
            class="text-white absolute top-0 flex justify-center items-center cursor-pointer w-[100%] h-[100%]"
          >
            <i class="fa-solid fa-plus text-[1.6rem]"></i>
          </div>
          <div  
          id="hey"       
            class="absolute shadow-xl  bg-[#555] text-white rounded-[50%] w-[3rem] text-center px-2 py-2 left-[50%]  translate-x-[-50%]"
          >
            <p>${position}</p>
          </div>
          `;
  return EmptyCard;
}
function playerCardFinalElement() {
  return `
      <div class="relative hidden w-fit bg-no-repeat">
          <img src="./assets/img/bg-card.png" class="" alt="" />
          <div
            class="text-white w-[67%] h-[15rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div
              class="flex items-center text-[black] justify-center pt-6 pl-[1.3rem]"
            >
              <div class="">
                <p class="">33</p>

                <img class="w-6 h-6" src="./assets/img/logo.png" alt="" />
              </div>
              <img
                src="https://cdn.sofifa.net/players/020/801/25_120.png"
                alt=""
              />
            </div>
            <!-- infos -->
            <div class="flex justify-center items-center">
              <p class="text-center text-black">name</p>
              <img class="w-4 h-4" src="./assets/img/logo.png" alt="" />
            </div>
            <div
              class="flex flex-wrap justify-center w-[6rem] m-auto gap-x-3 text-[0.6rem]"
            >
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">pac:</p>
                <p>93</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">sho:</p>
                <p>93</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">pas:</p>
                <p>93</p>
              </div>

              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">dri:</p>
                <p>93</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">def:</p>
                <p>93</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">phy:</p>
                <p>93</p>
              </div>
              <img class="w-6 h-6 mt-4" src="./assets/img/logo.png" alt="" />
            </div>
          </div>
        </div>
    `;
}

function displayPlayersEmptyElement(formations) {
  Object.values(formations)[0].forEach((Element) => {
    list_main_players.appendChild(
      playerCardEmptyElemet(
        `card${Element.id}`,
        Element.position,
        Element.column,
        Element.row,
        Element.justify,
        Element.align
      )
    );
  });
}
function displayReserveMembers() {
  for (let i = 1; i <= 11; i++) {
    let emptyElement = playerCardEmptyElemet(`emptyCard${i}`);
    emptyElement.lastElementChild.remove();
    list_reserve_players.appendChild(emptyElement);
  }
}

function addNewPlayer() {
  console.log("yep");
}
// // afficher les membres qui sont dans le meme groupe
// function displayMembersGroupe(fonction) {
//   list_members.innerHTML = "";
//   allEmployes.filter((el) => {
//     el.fonction === fonction ? memberShowGroup.push(el) : "";
//   });

//   memberShowGroup.forEach((el) => {
//     const list = document.createElement("div");
//     list.setAttribute(
//       "class",
//       "flex gap-[3rem] mb-[1rem] w-[90%] m-auto border-[1px] h-[5rem] px-[1rem] rounded-md  items-center"
//     );
//     list.innerHTML = `
//          <img src="${el.image}" alt="${el.nom}" class=" h-[3rem] w-[3rem]  rounded-[50%]">

//       <div class="w-[80%]">
//         <h2 class="text-xl font-semibold text-gray-800">${el.nom} ${el.prenom}</h2>
//         <p class="text-gray-600">${el.fonction}</p>
//       </div>
//       <button onclick="addMember('${el.id}','${el.fonction}')" class="bg-[#01008A] text-white capitalize rounded-md px-4 py-1">add</button>
//      `;
//     list_members.appendChild(list);
//   });
// }

function showPlayerAdd(position, id) {
  playerMembers = [];
  container_groupe_player.style.display = "flex";
//   displayMembersGroupe(position,id);
}
// function displayMembersPlayers(position,id) {
//   list_players.innerHTML = "";
//   allPlayers.filter((el) => {
//     el.position === position ? playerMembers.push(el) : "";
//   });

//   playerMembers.forEach((el) => {
//     const list = document.createElement("div");
//     list.setAttribute(
//       "class",
//       "flex gap-[3rem] mb-[1rem] w-[90%] m-auto border-[1px] h-[5rem] px-[1rem] rounded-md  items-center"
//     );
//     list.innerHTML = ` 
//          <img src="${el.image}" alt="${el.nom}" class=" h-[3rem] w-[3rem]  rounded-[50%]">
         
//       <div class="w-[80%]">
//         <h2 class="text-xl font-semibold text-gray-800">${el.nom} ${el.prenom}</h2>
//         <p class="text-gray-600">${el.fonction}</p>
//       </div>
//       <button onclick="addMember('${el.id}','${el.position}')" class="bg-[#01008A] text-white capitalize rounded-md px-4 py-1">add</button>
//      `;
//     list_players.appendChild(list);
//   });
// }
// function closeListMembers() {
//   memberShowGroup = [];
//   container_groupe_members.style.display = "none";
//   header.style.position = "";
// }
