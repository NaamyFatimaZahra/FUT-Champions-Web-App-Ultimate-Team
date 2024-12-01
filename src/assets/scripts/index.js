const list_main_players = document.getElementById("list_main_players");
const list_reserve_players = document.getElementById("list_reserve_players");
const container_groupe_player = document.getElementById(
  "container_groupe_player"
);
const content_pop_up = document.getElementById("content_pop_up");
const sqaud_info = document.getElementById("sqaud_info");
let allPlayers = [];
let formations = [];
let principalePlayers = [];
let reservePlayers=[];
let filterOutputArr = [];
let count = 0;
//fetch data
fetch("/DataBase/players.json")
  .then((response) => response.json())
  .then((data) => {
    allPlayers = data.players;
    formations = data.formations; 
    displayPlayersEmptyElement(formations);
    displayReserveMembers();
  })
  .catch((error) => {
    console.log(error);
  });

//  Element
function playerListElement(img, name) {
  return `
  <div class="w-[8rem] h-[100%]  bg-[white] rounded-xl flex justify-center items-center overflow-hidden">
<img class="w-[3rem]" src="${img}"/>
<p class="text-black">${name}</p>
  </div>

  `;
}
function choosePopUpElement(id, position) {
  return `
           
            <p>Which player do you want to add?</p>
            <div class="flex gap-5 flex-wrap">
              <button
                id="addPlayerBtn"
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                New
              </button>
              <button
                onclick="showExistingPlayer('${id}','${position}')"
                id="selectPlayerBtn"
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                Exist
              </button>
            </div>`;
}

function playerCardEmptyElemet(
  id,
  position,
  column,
  row,
  justifySelf,
  alignSelf
) {
  console.log(id,position);
  
  const EmptyCard = document.createElement("div");
  EmptyCard.setAttribute("class", `relative w-[5rem] md:w-[7rem] h-fit `);
  EmptyCard.style.gridColumn = column;
  EmptyCard.style.gridRow = row;
  EmptyCard.style.justifySelf = justifySelf;
  EmptyCard.style.alignSelf = alignSelf;
  EmptyCard.setAttribute(
    "onclick",
    `fillInPopUpTochooseTypeOfAddingPlayer('${id}','${position}')`
  );
  EmptyCard.setAttribute("id", `${id}`);
  EmptyCard.innerHTML = `
                <img src="../assets/img/card.png" class="" alt="" />
          <div
            class="text-white absolute top-0 flex justify-center items-center cursor-pointer w-[100%] h-[100%]"
          >
            <i class="fa-solid fa-plus text-[1.6rem]"></i>
          </div>
          <div  
          id=""       
            class="absolute shadow-xl  bg-[#555] text-white rounded-[50%] w-[3rem] text-center px-2 py-2 left-[50%]  translate-x-[-50%]"
          >
            <p>${position}</p>
          </div>
          `;
  return EmptyCard;
}
function playerCardFinalElement(
  place,
  id,
  position,
  logo,
  img,
  name,
  flag,
  pace,
  shooting,
  passing,
  dribbling,
  defending,
  physical
) {
  const finalCard = document.createElement("div");
  finalCard.setAttribute(
    "class",
    "relative group w-fit h-fit bg-no-repeat overfow-hidden"
  );
  finalCard.innerHTML = ` 
         <div class="absolute top-0   h-[100%] w-[100%] right-0 z-10 hidden group-hover:flex justify-center items-center">
         <button
         onclick="addNewPlayer(${id},${place},'${position}')"
         class="bg-[#70182ee6] capitalize rounded-md px-6 py-2">add</button>
         </div>
          <img src="../assets/img/bg-card.png" class="group-hover:brightness-[35%]" alt="" />
          <div
            class="text-white group-hover:brightness-[20%] w-[67%] md:h-[15rem] absolute top-[50%] left-[43%] md:left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div
              class="flex items-center text-[black] justify-center pt-6 pl-[1.3rem]"
            >
              <div class="">
                <p class="">${position}</p>

                <img class="w-6 " src="${logo}" alt="" />
              </div>
              <img
                src="${img}"
                alt=""
              />
            </div>
            <!-- infos -->
            <div class="flex justify-center items-center">
              <p class="text-center text-black text-[10px]">${name}</p>
              <img class="w-4 h-4" src="${flag}" alt="" />
            </div>
            <div
              class="flex flex-wrap justify-center pt-[14px] w-[6rem] m-auto gap-x-3 text-[0.6rem]"
            >
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">pac:</p>
                <p>${pace}</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">sho:</p>
                <p>${shooting}</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">pas:</p>
                <p>${passing}</p>
              </div>

              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">dri:</p>
                <p>${dribbling}</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">def:</p>
                <p>${defending}</p>
              </div>
              <div class="text-[#513608a0] flex gap-1 font-semibold">
                <p class="uppercase">phy:</p>
                <p>${physical}</p>
              </div>
              
            </div>
          </div>
       `;
  return finalCard.outerHTML;
}
function hoverChangeElement(id,place,position){
  const hoverElement = document.createElement("div")
  hoverElement.setAttribute("class","absolute top-0 h-[100%] w-[100%] left-[81%] z-10 hidden group-hover:flex flex-col")
     hoverElement.innerHTML = ` <button
        onclick="deletePlayer(${id},'${place}','${position}')"
        class="text-[white] bg-[#70182ee6] rounded-[50%] w-[2rem] h-[2rem] "
      >
        <i class="fa-solid fa-trash"></i>
      </button>
      <button
        onclick="modifiedPlayer(${id},${place})"
        class="text-[white] bg-[#70182ee6] rounded-[50%] w-[2rem] h-[2rem]"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </button>`;
  return hoverElement;
  
}
function deletePlayer(id,place,position){
 
  
  const deletedElement=document.getElementById(place);
    let extractedNumbers = place.match(/\d+/g);
   
  Object.values(formations)[0].forEach((Element) => {
    
   
    
  if (Element.id === extractedNumbers[0]) {
    
    
    if (place.startsWith("card")) {
      deletedElement.replaceWith(
        playerCardEmptyElemet(
          `card${extractedNumbers}`,
          Element.position,
          Element.column,
          Element.row,
          Element.justify,
          Element.align
        )
      );
    } else if (place.startsWith("empty")) {
       let emptyElement = playerCardEmptyElemet(place);
       emptyElement.lastElementChild.remove();
       deletedElement.replaceWith(emptyElement);
    }
  }
  
   
 });
  
}

// fonction

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

function addNewPlayer(id, place,position) {
  const elementPlace = document.getElementById(place);
  elementPlace.removeAttribute("onclick");
  elementPlace.removeAttribute("class");
  elementPlace.setAttribute("class", "relative w-[6rem] md:w-[10rem] h-fit ");
  closeListMembers(container_groupe_player);
  allPlayers.filter((el) => {
    if (el.id === id) {
      elementPlace.innerHTML = playerCardFinalElement(
        place,
        el.id,
        el.position,
        el.logo,
        el.photo,
        el.name,
        el.flag,
        el.pace,
        el.shooting,
        el.passing,
        el.dribbling,
        el.defending,
        el.physical
      );
      principalePlayers.push(el);
    }
  });
  const changeHoverElement=elementPlace.children[0].children[0];
 changeHoverElement.replaceWith(hoverChangeElement(id,place,position))
  
  
}

function fillInPopUpTochooseTypeOfAddingPlayer(id, position) {
  container_groupe_player.style.display = "flex";
  content_pop_up.innerHTML = choosePopUpElement(id, position);
}

function showExistingPlayer(id, position) {
  filterOutput(id, position);
  container_groupe_player.style.display = "flex";
  content_pop_up.innerHTML = "";
  filterOutputArr.forEach((el) => {
    content_pop_up.innerHTML += playerCardFinalElement(
      `'${id}'`,
      el.id,
      el.position,
      el.logo,
      el.photo,
      el.name,
      el.flag,
      el.pace,
      el.shooting,
      el.passing,
      el.dribbling,
      el.defending,
      el.physical
    );
  });
}

function filterOutput(id, position) {
  filterOutputArr = [];
  allPlayers.filter((el) => {
    if (position === el.position) {
      filterOutputArr.push(el);
    } else if (position === "undefined") {
      filterOutputArr.push(el);
    }
  });
}

function closeListMembers(popUp) {
  popUp.style.display = "none";
}
function showSquadInfo() {
  sqaud_info.style.display = "flex";
}
