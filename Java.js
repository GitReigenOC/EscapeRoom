const floors = [
    {
        name: "Floor 1",
        cipher: "4567",
        passcode: "1234"
    },
    {
        name: "Floor 2",
        cipher: "8901",
        passcode: "5678"
    },
    {
        name: "Floor 3",
        cipher: "2345",
        passcode: "9012"
    }
];

const floorCard = document.getElementById("floorCard");
const floorName = document.getElementById("floorName");
const floorClue = document.getElementById("floorClue");
const passcodeForm = document.getElementById("passcodeForm");
const passcodeInput = document.getElementById("passcodeInput");
const feedback = document.getElementById("feedback");

let currentFloor = 0;

function showFloor(index) {
    const floor = floors[index];
    floorName.textContent = floor.name;
    floorClue.textContent =
        `Digit Caesar cipher: each digit was shifted forward by 3, wrapping after 9. Shift each digit back by 3 to find the passcode: ${floor.cipher}`;
    passcodeInput.value = "";
    passcodeInput.disabled = false;
    passcodeForm.querySelector("button").disabled = false;
    feedback.textContent = "";
    passcodeInput.focus();
}

floorCard.addEventListener("animationend", (event) => {
    if (event.target !== floorCard || event.animationName !== "floorFadeOut") {
        return;
    }

    floorCard.classList.remove("breaking");
    currentFloor += 1;

    if (currentFloor < floors.length) {
        showFloor(currentFloor);
        floorCard.classList.add("arriving");
    } else {
        floorName.textContent = "You escaped!";
        floorClue.textContent = "All three floors are solved. Well done!";
        passcodeForm.hidden = true;
        feedback.textContent = "";
        floorCard.classList.add("arriving");
    }
});

floorCard.addEventListener("animationend", (event) => {
    if (event.target === floorCard && event.animationName === "floorFadeIn") {
        floorCard.classList.remove("arriving");
    }
});

passcodeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passcodeInput.value.trim() !== floors[currentFloor].passcode) {
        feedback.textContent = "That passcode is incorrect. Decode the clue and try again.";
        passcodeInput.select();
        return;
    }

    passcodeInput.disabled = true;
    passcodeForm.querySelector("button").disabled = true;
    feedback.textContent = "Correct! The floor is breaking apart...";
    floorCard.classList.add("breaking");
});

showFloor(currentFloor);
