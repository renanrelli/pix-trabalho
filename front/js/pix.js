let senderSelect = document.getElementById("sender");
let receivedSelect = document.getElementById("received");
let inputValue = document.getElementById("value");

async function getUsers() {
  let response = await fetch(`http://localhost:3000/pixusuarios`);
  let users = await response.json();
  return users;
}

async function setUsers() {
  let users = await getUsers();
  setSelect(users, senderSelect);
  setSelect(users, receivedSelect);
}

function setSelect(users, select) {
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  select.appendChild(selectOption);

  for (let user of users) {
    let option = document.createElement("option");
    option.value = user.id;
    option.innerText = user.name;

    select.appendChild(option);
  }
}

setUsers();

async function submitPix() {
  let senderId = senderSelect.value;
  let recipientId = receivedSelect.value;
  let value = inputValue.value;

  let payload = {
    senderId,
    recipientId,
    value,
  };

  let pix = await fetch("http://localhost:3000/realizarpix", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (pix.ok) {
    alert("PIX realizado com sucesso!");
    window.location.href = "";
  }
}
