let pixList = document.getElementById("pix-list");
let usersSelect = document.getElementById("users");
let radioButtons = document.getElementsByName("type");
let radioValue;

function setTable(pixs) {
  for (let pix of pixs) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdSender = document.createElement("td");
    let tdRecipient = document.createElement("td");
    let tdDate = document.createElement("td");
    let tdValue = document.createElement("td");

    let id = pix.id;
    let sender = pix.sender.name;
    let recipient = pix.recipient.name;
    let timeAndDate = pix.createdAt;
    let americanDate = "";
    for (let index = 0; index < 10; index++) {
      americanDate += timeAndDate[index];
    }
    let brazillianDate = americanDate.split("-").reverse().join("/");
    let value = "";
    value += pix.value;
    if (value.includes(".") && value != "null") {
      value = value.replace(".", ",");
    } else if (value !== "null") {
      value = value + ",00";
    }

    tdId.innerText = id;
    tdSender.innerText = sender;
    tdRecipient.innerText = recipient;
    tdDate.innerText = brazillianDate;
    tdValue.innerText = "R$ " + value;

    tr.appendChild(tdId);
    tr.appendChild(tdSender);
    tr.appendChild(tdRecipient);
    tr.appendChild(tdDate);
    tr.appendChild(tdValue);
    pixList.appendChild(tr);
  }
}

async function setList() {
  let resposta = await fetch(`http://localhost:3000/pixrealizados`);
  let pixs = await resposta.json();

  this.setTable(pixs);
}

setList();
setUsers();

async function getUsers() {
  let response = await fetch(`http://localhost:3000/pixusuarios`);
  let users = await response.json();
  return users;
}

async function setUsers() {
  let users = await getUsers();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  usersSelect.appendChild(selectOption);

  for (let user of users) {
    let option = document.createElement("option");
    option.value = user.id;
    option.innerText = user.name;

    usersSelect.appendChild(option);
  }
}

async function submitList() {
  pixList.innerHTML = "";

  radioButtons.forEach((element) => {
    if (element.checked) {
      radioValue = element.value;
    }
  });

  url = `http://localhost:3000/pix/${usersSelect.value}/${radioValue}`;
  let response = await fetch(url);
  let pixs = await response.json();

  this.setTable(pixs);
}
