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
  
  document.getElementById("tagOpts").appendChild(tagLabel);
  tagLabel.appendChild(tagOption);
  tagLabel.appendChild(newSpan);
  tagLabel.innerHTML = newTag;

  let newBreak = document.createElement("br");
  document.getElementById("tagOpts").appendChild(newBreak);

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

  //if the item already exists
  if(repeated(itemName) >= 0) {
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
  for(var q=0; q<itemList.length; q++) {

    //check if checkFor is already used
    if(itemList[q].includes(checkFor)) {
      return q;
    }
  }
}
