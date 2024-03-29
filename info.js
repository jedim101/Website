const itemList =[];
const tagList = [];
const tagNames = [];
const randItemList = [];

function getStored(page) {
  if(localStorage.allTags){
    var oldTags = JSON.parse(localStorage.allTags);
    for(var i = 0; i<oldTags.length; i++) {
      addTag(oldTags[i]);
    }
  }

  if(localStorage.allItems){
    var oldItems = JSON.parse(localStorage.allItems);
    for(var i = 0; i<oldItems.length; i++) {
      itemList.push(oldItems[i]);
      if(page == "addItem") {
        displayItems(oldItems[i]);
      }
    }
  }

  if(localStorage.randItems) {
    var oldRandItems = JSON.parse(localStorage.randItems);
    for(var i = 0; i<oldRandItems.length; i++) {
      randItemList.push(oldRandItems[i]);
      if(page == "select") {
        displayResults(oldRandItems[i]);
      }
    }
  }
}

function createTag() {
  var addedTag = document.getElementById("tags").value;

  if(addedTag == "") {
    alert("Please add text to your new tag.")
  } else if(document.getElementById(addedTag)) {
    alert("That tag already exists. If you would like to use it, select it from the list.");
  } else {
    addTag(addedTag);
  }

  document.getElementById("tags").value = "";
}

function addTag(newTag) {
  let tagOption = document.createElement("input");
  tagOption.setAttribute("type", "checkbox");
  tagOption.setAttribute("name", "tagOptions");
  tagOption.setAttribute("id", newTag);
  
  let newSpan = document.createElement("span");
  newSpan.setAttribute("class", "option");
  
  let tagLabel = document.createElement("label");
  tagLabel.setAttribute("for", newTag);
  tagLabel.setAttribute("class", "optLabel");
  tagLabel.innerHTML = newTag;
  
  document.getElementById("tagOpts").appendChild(tagLabel);
  tagLabel.appendChild(tagOption);
  tagLabel.appendChild(newSpan);

  tagList.push(document.getElementById(newTag));
  tagNames.push(newTag);
  localStorage.allTags = JSON.stringify(tagNames);
}

function submitItem() {
  let newItem = document.getElementById("item").value;

  if(newItem == "") {
    alert("Please enter the name of the item.")
  } else {
  store(newItem);
  localStorage.allItems = JSON.stringify(itemList);
  }
}

function store(itemName) {
  var toStore = [itemName];

  for (var i=0; i<tagList.length; i++) {

     // And stick the checked ones onto an array...
     if (tagList[i].checked) {
        toStore.push(tagList[i].id);
     }
  }

  if (tagNames.includes(itemName)) {
    alert(itemName + " is the name of a tag. Unfortunately, you cannot give an item the same name as a tag at this time.");
  
  //if the item already exists
  } else if(repeated(itemName) >= 0) {
    //ask to override
    if(confirm(itemName + " already exists. Click OK to override your preexisting tags for " + itemName)) {
      //delete old item
      itemList.splice(repeated(itemName), 1);

      //add new one
      itemList.push(toStore);
    }
  //now check that at least 1 tag is selected
  } else if (toStore.length == 1) {
    alert("Please select at least one tag.")
  } else {
    itemList.push(toStore);
    displayItems(toStore)
  }
}

function displayItems(toDisplay) {
  var item = toDisplay[0];

  var container = document.createElement("div");
  container.setAttribute("id", item + "Container");

  var itemDisplay = document.createElement("p");
  itemDisplay.setAttribute("id", item);
  itemDisplay.setAttribute("class", "itemDisplay");
  itemDisplay.innerText = item;
  container.appendChild(itemDisplay);

  for(var i=1; i<toDisplay.length; i++) {

    let tagDisplay = document.createElement("p");
    tagDisplay.setAttribute("id", item + toDisplay[i]);
    tagDisplay.setAttribute("class", "tagDisplay");
    tagDisplay.innerText = toDisplay[i];
    container.appendChild(tagDisplay);
  }

  document.getElementById("itemShow").appendChild(container);
}

function repeated(checkFor) {
  //loop for # of arrays in itemList
  for(var i=0; i<itemList.length; i++) {

    //check if checkFor is already used in items
    if(itemList[i].includes(checkFor)) {
      return i;
    }
  }
}

var modeAnd = false;

function toggleGenMode() {
  
  //If in And mode
  if(modeAnd) {
    //set to Or mode (modeAnd = false)
    modeAnd = false;
    document.getElementById("genMode").innerText = "Or";
    
  //in Or mode
  } else {
    //put in And mode
    modeAnd = true;
    document.getElementById("genMode").innerText = "And";
  }
}

function generate() {
  var choices = [];
  var selectedTags = [];

  //for each tag
  for(var i = 0; i<tagList.length; i++) {
    //check if selected
    if(tagList[i].checked) {
      //add to selectedTags
      selectedTags.push(tagNames[i]);
    }
  }

  //for each item
  for(var i = 0; i<itemList.length; i++) {
    //for each slected tag
    for(var q = 0; q<selectedTags.length; q++) {

      //if 'And' mode (all selected tags included)
      if(modeAnd) {

      //if item does not has selectedtags[q]
      if(!itemList[i].includes(selectedTags[q])) {
        break;

      //if this is last selected tag
      } else if(q+1 == selectedTags.length) {
        if(!choices.includes(itemList[i][0])) {
          //add item name to choices
          choices.push(itemList[i][0]);
        }
      }

      //'Or' mode (at least one selected tag included)
      } else {
        //item includes selected tag
        if(itemList[i].includes(selectedTags[q])) {
          if(!choices.includes(itemList[i][0])) {
            //add item name to choices
            choices.push(itemList[i][0]);
          };
        }
      }
    }
  }

  if(choices.length == 0) {
    alert("There are no items with the given tag(s).");
  } else {
    let randNum = Math.floor(Math.random() * choices.length);
    let item = choices[randNum];

    displayResults(item);
    randItemList.push(item);
    localStorage.randItems = JSON.stringify(randItemList);
  }
}

function displayResults(toDisplay) {
  let display = document.createElement("p");
  display.innerHTML = toDisplay;

  let newBr = document.createElement("br");

  document.getElementById("results").appendChild(display);
  document.getElementById("results").appendChild(newBr);
}

var geneBlockCount = 0;

function addGenerator() {
  geneBlockCount++;

  let orig = document.querySelector('#generatorBlock0');
  let clone = orig.cloneNode(true);

  clone.id = ("generatorBlock"+geneBlockCount);

  let container = document.getElementById("allGenerates");
  container.append(clone);
}