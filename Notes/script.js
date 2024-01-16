let allNotes = document.querySelector(".notes");
let addNoteBtn = document.getElementById("addNotes");

addNoteBtn.addEventListener("click", addBtn);

shownote();
function shownote() {
  let allLsNotes;
  let notes = localStorage.getItem("notes");

  if (notes === null) {
    allLsNotes = [];
  } else {
    allLsNotes = JSON.parse(notes);
  }

  allLsNotes.forEach((lsnote, index) => {
    let note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("border-radius");
    note.innerHTML = `
            <div class="writeNote">
                <textarea name="title" class="title" placeholder="WRITE TITLE..." >${lsnote.title}</textarea>
                <textarea name="discription" class="discription" placeholder="WRITE DESCRIPTION...">${lsnote.dis}</textarea>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square edit"></i>
                <i class="fa-solid fa-floppy-disk save"></i>
                <i class="fa-solid fa-trash delete"></i>
            </div>
        `;

    allNotes.insertBefore(note, allNotes.lastElementChild);

    note
      .querySelectorAll(".save")
      .forEach((saveBtn) => saveBtn.addEventListener("click", saveNote));
    note.querySelectorAll(".delete").forEach((delBtn) => {
      delBtn.addEventListener("click", () => delNote(index));
    });
  });
}

function addBtn() {
  // Create a new note element
  let note = document.createElement("div");
  note.classList.add("note");
  note.classList.add("border-radius");
  note.innerHTML = `
        <div class="writeNote">
            <textarea name= "title" class="title" placeholder="WRITE TITLE..."></textarea>
            <textarea name="discription" class="discription" placeholder="WRITE DESCRIPTION..."></textarea>
        </div>
        <div class="icons">
            <i class="fa-regular fa-pen-to-square edit"></i>
            <i class="fa-solid fa-floppy-disk save"></i>
            <i class="fa-solid fa-trash delete"></i>
        </div>
    `;

  // Insert the new note before the last child of allNotes
  allNotes.insertBefore(note, allNotes.lastElementChild);

  // Attach event listener for saving when the save icon is clicked
  note.querySelectorAll(".save").forEach((saveBtn) =>
    saveBtn.addEventListener("click", function () {
      // Call the saveNote function with the correct index
      saveNote();
    })
  );

  // Attach event listener for deleting when the delete icon is clicked
  note.querySelectorAll(".delete").forEach((delBtn) => {
    delBtn.addEventListener("click", function () {
      // Get the index of the clicked delete button relative to its siblings
      let index = Array.from(
        delBtn.parentElement.parentElement.parentElement.children
      ).indexOf(delBtn.parentElement.parentElement);
      // Call the delNote function with the correct index
      delNote(index);
    });
  });
}

function saveNote() {
  console.log("save");
  let allTitles = document.querySelectorAll(".title");
  let allDis = document.querySelectorAll(".discription");

  let allLsNotes = Array.from(allTitles).map((title, index) => {
    let nTitle = title.value;
    let nDis = allDis[index].value;

    return {
      title: nTitle,
      dis: nDis,
    };
  });

  localStorage.setItem("notes", JSON.stringify(allLsNotes));
}

function delNote(index) {
  console.log("Delete button clicked with index:", index);

  // Remove the note from the DOM
  let allNotes = document.querySelectorAll(".note");
  if (index >= 0 && index < allNotes.length) {
    allNotes[index].remove();
  } else {
    console.error("Invalid index for deletion");
    return;
  }

  // Remove the note from localStorage
  let allLsNotes = JSON.parse(localStorage.getItem("notes")) || [];
  if (index >= 0 && index < allLsNotes.length) {
    allLsNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(allLsNotes));
  } else {
    console.error("Invalid index for localStorage deletion");
  }
}

document.getElementById("searchInput").addEventListener("input", liveSearch);

function liveSearch() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let allNotes = document.querySelectorAll(".note");

  allNotes.forEach((note) => {
    let title = note.querySelector(".title").value.toLowerCase();
    let description = note.querySelector(".discription").value.toLowerCase();

    if (title.includes(searchInput) || description.includes(searchInput)) {
      note.style.display = "block"; // Show the note if it matches the search
    } else {
      note.style.display = "none"; // Hide the note if it doesn't match the search
    }
  });
}

document.getElementById("allNotes").addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element is an "Edit" or "Save" button
  if (clickedElement.classList.contains("edit")) {
    // Edit button clicked
    enableEditing(clickedElement.closest(".note"));
  } else if (clickedElement.classList.contains("save")) {
    // Save button clicked
    saveNote(clickedElement.closest(".note"));
    disableEditing(clickedElement.closest(".note"));
  }
});

function enableEditing(note) {
  // Enable editing for the title and description textareas
  note.querySelector(".title").removeAttribute("readonly");
  note.querySelector(".discription").removeAttribute("readonly");
}

function disableEditing(note) {
  // Disable editing for the title and description textareas
  note.querySelector(".title").setAttribute("readonly", true);
  note.querySelector(".discription").setAttribute("readonly", true);
}
