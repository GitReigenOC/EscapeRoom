const floors = [
    {
        name: "Ward 01",
        cipher: "4567",
        passcode: "1234"
    },
    {
        name: "Ward 02",
        cipher: "8901",
        passcode: "5678"
    },
    {
        name: "Ward 03",
        cipher: "2345",
        passcode: "9012"
    },
    {
        name: "Ward 04",
        cipher: "6789",
        passcode: "3456"
    },
    {
        name: "Ward 05",
        cipher: "8356",
        passcode: "5023"
    },
    {
        name: "Ward 06",
        cipher: "7567",
        passcode: "4234"
    },
    {
        name: "Ward 07",
        cipher: "4571",
        passcode: "1248"
    },
    {
        name: "Ward 08",
        cipher: "2222",
        passcode: "9999"
    },
    {
        name: "Ward 09",
        cipher: "5608",
        passcode: "2375"
    },
    {
        name: "Ward 10",
        cipher: "4343",
        passcode: "1010"
    },
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
        `A note was left beside the ward lock. Its digits were shifted forward by 3, wrapping after 9. Shift each digit back by 3 to find the code: ${floor.cipher}`;
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
        floorClue.textContent = "All ten ward locks are open. You found your way out of St. Agnes.";
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
        feedback.textContent = "The code is incorrect. The ward remains sealed.";
        passcodeInput.select();
        return;
    }

    passcodeInput.disabled = true;
    passcodeForm.querySelector("button").disabled = true;
    feedback.textContent = "The lock clicks open. The ward door gives way...";
    floorCard.classList.add("breaking");
});

showFloor(currentFloor);
