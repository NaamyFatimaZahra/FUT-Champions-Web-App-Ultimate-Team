const list_main_players = document.getElementById("list_main_players");
const list_reserve_players = document.getElementById("list_reserve_players");
const container_groupe_player = document.getElementById(
  "container_groupe_player"
);
const content_pop_up = document.getElementById("content_pop_up");
const sqaud_info = document.getElementById("sqaud_info");

let allPlayers = [];
let formations = [];
let filterOutputArr = [];
let formStructure = [];
let reminder;
let position;
let place;
let isValid = false;
let modified = false;
let modifiedPlayerobject;
let formationCheck=0;
//fetch data
fetch("/DataBase/players.json")
  .then((response) => response.json())
  .then((data) => {
    allPlayers = data.players;
    formations = data.formations;
    formStructure = data.form;

    displayPlayersEmptyElement();
    displayReserveMembers();
  })
  .catch((error) => {
    console.log(error);
  });

//  Element

function choosePopUpElement(id, position) {
  return `
           
            <p>Which player do you want to add?</p>
            <div class="flex gap-5 flex-wrap">
              <button
              onclick="${
                id.startsWith("card")
                  ? `displayformAddPlayers('${id}','${position}')`
                  : `formAddPlayerChoicePopUp('${id}','${position}')`
              }"
            
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                New
              </button>
              <button
                onclick="showExistingPlayer('${id}','${position}')"
                
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                Exist
              </button>
            </div>`;
}

function formAddPlayerChoiceElement(id) {
  return `
           
           
            <div class="flex gap-5 flex-wrap">
              <button
              onclick="displayformAddPlayers('${id}','GK')"
                
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                Goal Kipper
              </button>
              <button
                onclick="displayformAddPlayers('${id}','other')"
                
                class="w-fit py-3 px-3 mb-4 bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                Other Player
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
  const EmptyCard = document.createElement("div");
  EmptyCard.setAttribute(
    "class",
    `${position} relative w-[5rem] md:w-[7rem] h-fit `
  );
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
  rating,
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
                 <p>${rating}</p>
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
               <img class="w-6 " src="${logo}" alt="" />
            </div>
          </div>
       `;
  return finalCard.outerHTML;
}
function hoverChangeElement(id, place, position) {
  const hoverElement = document.createElement("div");
  hoverElement.setAttribute(
    "class",
    "absolute top-0 h-[100%] w-[100%] left-[81%] z-10 hidden group-hover:flex flex-col"
  );
  hoverElement.innerHTML = ` <button
        onclick="deletePlayer('${id}','${place}','${position}')"
        class="text-[white] bg-[#70182ee6] rounded-[50%] w-[2rem] h-[2rem] "
      >
        <i class="fa-solid fa-trash"></i>
      </button>
      <button
        onclick="modifiedPlayer(${id},'${place}')"
        class="text-[white] bg-[#70182ee6] rounded-[50%] w-[2rem] h-[2rem]"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </button>`;
  return hoverElement;
}
function inputElement(nameInput) {
  let inputEl = document.createElement("div");
  inputEl.setAttribute("class", "flex flex-col w-[25%] gap-2");
  inputEl.innerHTML = ` 
                  <label for="${nameInput}" class="capitalize text-white"
                    >${nameInput}:</label
                  >
                  <input
                  id="${nameInput}"

                    type="text"
                    class="pl-3 bg-[#7b787892] h-[2.5rem] w-[100%] rounded-md capitalize outline-none"
                  />
                `;
  return inputEl;
}
function form() {
  return `<form action="" id="form"  >
            <!-- name -->
            <div class="flex flex-col gap-2">
              <label for="name" class="capitalize text-white">name:</label>
              <input
              id="name"
                type="text"
                class="pl-3 bg-[#7b787892] h-[2.5rem] w-[100%] rounded-md capitalize outline-none"
              />
            </div>
            <!-- photo -->
            <div class="flex flex-col gap-2">
              <label for="name" class="capitalize text-white"
                >picture url:</label
              >
              <input
                id="photo"
                type="text"
                class="pl-3 bg-[#7b787892] h-[2.5rem] w-[100%] rounded-md capitalize outline-none"
              />
            </div>
            <!-- info -->
            <div id="input_Change_Content"  class="flex flex-wrap gap-[12%]">
               <button
               
               type="submit"
                onclick="formSubmit(event)"
                id="submitBtn"
                class="w-[63%] px-3 h-[2.9rem] mt-[1.5rem] bg-[#70182ebf] uppercase text-white rounded-md hover:bg-[#421212bf]"
              >
                submit
              </button>
            </div>
            
          
               
          </form>`;
}

// fonction

function displayPlayersEmptyElement() {
 
  list_main_players.innerHTML=''
  Object.values(formations)[formationCheck].forEach((Element) => {
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
function changeFirstFormation(formation){
formationCheck=formation;
displayPlayersEmptyElement();
}
function changeSecondFormation(formation){
formationCheck=formation;
displayPlayersEmptyElement();
}

function displayReserveMembers() {
  for (let i = 1; i <= 11; i++) {
    let emptyElement = playerCardEmptyElemet(`emptyCard${i}`);
    emptyElement.lastElementChild.remove();
    list_reserve_players.appendChild(emptyElement);
  }
}

function addNewPlayer(id, place, position) {
  if (modified) {
    id = modifiedPlayerobject;
    console.log(id);
  }
  const elementPlace = document.getElementById(place);
  elementPlace.removeAttribute("onclick");
  elementPlace.removeAttribute("class");
  elementPlace.setAttribute("class", ` relative w-[6rem] md:w-[10rem] h-fit `);
  let check = allPlayers.find((el) => el.id === id);
  if (check) {
    allPlayers.filter((el) => {
      if (el.id === id) {
        if (el.position === "GK") {
          elementPlace.innerHTML = playerCardFinalElement(
            place,
            el.id,
            el.position,
            el.logo,
            el.photo,
            el.name,
            el.rating,
            el.flag,
            el.diving,
            el.handling,
            el.kicking,
            el.reflexes,
            el.speed,
            el.positioning
          );
        } else {
          elementPlace.innerHTML = playerCardFinalElement(
            place,
            el.id,
            el.position,
            el.logo,
            el.photo,
            el.name,
            el.rating,
            el.flag,
            el.pace,
            el.shooting,
            el.passing,
            el.dribbling,
            el.defending,
            el.physical
          );
        }
      }
    });
  } else {
    if (id.position === "GK") {
      elementPlace.innerHTML = playerCardFinalElement(
        place,
        id.id,
        id.position,
        id.logo,
        id.photo,
        id.name,
        id.rating,
        id.flag,
        id.diving,
        id.handling,
        id.kicking,
        id.reflexes,
        id.speed,
        id.positioning
      );
    } else {
      elementPlace.innerHTML = playerCardFinalElement(
        place,
        id.id,
        id.position,
        id.logo,
        id.photo,
        id.name,
        id.rating,
        id.flag,
        id.pace,
        id.shooting,
        id.passing,
        id.dribbling,
        id.defending,
        id.physical
      );
    }

    allPlayers.push(id);
  }
  const changeHoverElement = elementPlace.children[0].children[0];
  changeHoverElement.replaceWith(hoverChangeElement(id, place, position));
  closeListMembers(container_groupe_player);
}

function fillInPopUpTochooseTypeOfAddingPlayer(id, position) {
  container_groupe_player.style.display = "flex";
  container_groupe_player.children[0].style.height = "40%";
  container_groupe_player.children[0].children[1].style.height = "20%";
  content_pop_up.innerHTML = choosePopUpElement(id, position);
}

function showExistingPlayer(id, position) {
  filterOutput(id, position);
  container_groupe_player.style.display = "flex";
  content_pop_up.innerHTML = "";
  filterOutputArr.forEach((el) => {
    if (el.position === "GK") {
      content_pop_up.innerHTML += playerCardFinalElement(
        `'${id}'`,
        el.id,
        el.position,
        el.logo,
        el.photo,
        el.name,
        el.rating,
        el.flag,
        el.diving,
        el.handling,
        el.kicking,
        el.reflexes,
        el.speed,
        el.positioning
      );
    } else {
      content_pop_up.innerHTML += playerCardFinalElement(
        `'${id}'`,
        el.id,
        el.position,
        el.logo,
        el.photo,
        el.name,
        el.rating,
        el.flag,
        el.pace,
        el.shooting,
        el.passing,
        el.dribbling,
        el.defending,
        el.physical
      );
    }
  });
}
function formAddPlayerChoicePopUp(id, position) {
  container_groupe_player.style.display = "flex";
  container_groupe_player.children[0].style.height = "40%";
  container_groupe_player.children[0].children[1].style.height = "20%";
  content_pop_up.innerHTML = formAddPlayerChoiceElement(id, position);
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
function deletePlayer(id, place, position) {
  const deletedElement = document.getElementById(place);
  let extractedNumbers = place.match(/\d+/g);
  Object.values(formations)[formationCheck].forEach((Element) => {
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
function displayformAddPlayers(id, pos) {
  place = id;
  position = pos;
  content_pop_up.innerHTML = form();
  const input_Change_Content = document.getElementById("input_Change_Content");
  container_groupe_player.style.display = "flex";
  container_groupe_player.children[0].style.height = "70%";
  container_groupe_player.children[0].children[1].style.height = "10%";
  reminder = "other";

  formStructure.filter((item) => {
    if (Object.keys(item)[0] === position) {
      reminder = position;
    }
  });

  if (reminder === "GK") {
    Object.values(formStructure[1]).forEach((ele) => {
      Object.keys(ele).forEach((el) => {
        input_Change_Content.insertBefore(
          inputElement(el),
          input_Change_Content.firstChild
        );
      });
    });
  } else {
    Object.values(formStructure[0]).forEach((ele) => {
      Object.keys(ele).forEach((el) => {
        input_Change_Content.insertBefore(
          inputElement(el),
          input_Change_Content.firstChild
        );
      });
    });
  }
  if (pos) {
    document.getElementById("position").value = pos;
  }

  validateForm();
}

function formSubmit(event) {
  event.preventDefault();

  if (modified) {
    closeListMembers(container_groupe_player);
    addNewPlayer(modifiedPlayerobject, place, position);
  } else {
    const name = document.getElementById("name").value;
    const photo = document.getElementById("photo").value;
    const player = {
      name: name,
      photo: photo,
    };

    if (reminder === "GK") {
      Object.values(formStructure[1]).forEach((ele) => {
        Object.keys(ele).forEach((el) => {
          player[el] = document.getElementById(`${el}`).value;
        });
      });
    } else {
      Object.values(formStructure[0]).forEach((ele) => {
        Object.keys(ele).forEach((el) => {
          player[el] = document.getElementById(`${el}`).value;
        });
      });
    }
    if (isValid) {
      addNewPlayer(player, place, position);
    }
  }
}

function validateForm() {
  document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("input", () => {
      if (el.id === "name" || el.id === "club" || el.id === "nationality") {
        isValid = validateText(el, el.value);
      } else if (el.id === "position") {
        isValid = validatePosition(el, el.value);
      } else if (el.id === "photo") {
        isValid = validatePhoto(el, el.value);
      } else if (
        el.id === "rating" ||
        el.id === "pace" ||
        el.id === "shooting" ||
        el.id === "passing" ||
        el.id === "dribbling" ||
        el.id === "defending" ||
        el.id === "physical" ||
        el.id === "diving" ||
        el.id === "handling" ||
        el.id === "kicking" ||
        el.id === "reflexes" ||
        el.id === "speed" ||
        el.id === "positioning"
      ) {
        isValid = validateNumber(el, el.value);
      }
    });
  });
}

// validate text
function validateText(el, value) {
  const namePattern = /^[a-zA-Z ]{1,20}$/;
  if (!namePattern.test(value) || value.trim() === "") {
    el.style.boxShadow = "1px 1px 8px  #b510107a";
    el.style.border = ".7px solid #b510107a";

    return false;
  } else {
    el.style.boxShadow = "0 0 0 .2rem #28a74533";
    el.style.border = "1px solid #3fef0a";

    return true;
  }
}

// validate position
function validatePosition(el, value) {
  const positionPattern = /^(RW|CDM|ST|LW|CM|LB|CB|GK)/;
  if (!positionPattern.test(value) || value.trim() === "") {
    el.style.boxShadow = "1px 1px 8px  #b510107a";
    el.style.border = ".7px solid #b510107a";
    return false;
  } else {
    el.style.boxShadow = "0 0 0 .2rem #28a74533";
    el.style.border = "1px solid #3fef0a";

    return true;
  }
}

// validate photo
function validatePhoto(el, value) {
  // const namePattern =/^(https?://)?[\w.-]+\.(jpg|jpeg|png|gif|bmp|webp)$/;
  const urlPattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

  if (!urlPattern.test(value) || value.trim() === "") {
    el.style.boxShadow = "1px 1px 8px  #b510107a";
    el.style.border = ".7px solid #b510107a";
    return false;
  } else {
    el.style.boxShadow = "0 0 0 .2rem #28a74533";
    el.style.border = "1px solid #3fef0a";

    return true;
  }
}
// validate number
function validateNumber(el, value) {
  const numberPattern = /^[6-9][0-9]$/; // Basic phone pattern

  if (!numberPattern.test(value) || value.trim() === "") {
    el.style.boxShadow = "1px 1px 8px  #b510107a";
    el.style.border = ".7px solid #b510107a";
    return false;
  } else {
    el.style.boxShadow = "0 0 0 .2rem #28a74533";
    el.style.border = "1px solid #3fef0a";

    return true;
  }
}

function modifiedPlayer(id, places) {
  modifiedPlayerobject = {};
  allPlayers.find((el) => {
    if (el.id === id) {
      content_pop_up.innerHTML = form();
      const input_Change_Content = document.getElementById(
        "input_Change_Content"
      );
      container_groupe_player.style.display = "flex";
      container_groupe_player.children[0].style.height = "70%";
      container_groupe_player.children[0].children[1].style.height = "10%";
      reminder = "other";
      formStructure.filter((item) => {
        if (Object.keys(item)[0] === el.position) {
          reminder = el.position;
        }
      });
      if (reminder === "GK") {
        Object.values(formStructure[1]).forEach((ele) => {
          Object.keys(ele).forEach((el) => {
            input_Change_Content.insertBefore(
              inputElement(el),
              input_Change_Content.firstChild
            );
          });
        });
      } else {
        Object.values(formStructure[0]).forEach((ele) => {
          Object.keys(ele).forEach((el) => {
            input_Change_Content.insertBefore(
              inputElement(el),
              input_Change_Content.firstChild
            );
          });
        });
      }

      validateForm();

      Object.keys(el).forEach((key) => {
        if (document.getElementById(`${key}`) === null) {
        } else {
          document.getElementById(`${key}`).value = el[key];
          
          modifiedPlayerobject[key] = el[key];
          place = places;
          if (key === "position") {
            position = el[key];
          }

          modified = true;
        }
      });
    }
  });
}
