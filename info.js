const itemList =[];
const tagList = [];
const tagNames = [];

function getStored() {
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
  }
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

function generate() {
  var choices = [];

  //find all items with 1 or more selected tag and add it to 'choices'
  for(var i = 0; i<tagList.length; i++) {;
    if(tagList[i].checked) {
      for(var q = 0; q<itemList.length; q++) {
        if (itemList[q].includes(tagNames[i])) {
            choices.push(itemList[i][0]);
          }
        }
      }
    }
  }

  let randNum = Math.floor(Math.random() * choices.length);
  console.log(choices);
}
