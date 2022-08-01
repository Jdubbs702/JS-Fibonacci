//fibonacci function
function fib(n) {
  if (n < 3) return 1;
  let prev = 1;
  let curr = 1;
  for (let i = 2; i < n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}

//clear on input click
input = document.getElementById("input");
input.addEventListener("click", () => {
  input.value = "";
  document.getElementById("solutionContainer").innerHTML = "";
  document.getElementById("solutionContainer").className = "";
  document.getElementById("resultsSpinner").className = "";
  document.getElementById("errorMessage").className = "invisible";
});

//get request
function getFibFromServer(numInInput) {
  let fibUrl = `http://localhost:5050/fibonacci/${numInInput}`;
  console.log(fibUrl);
  fetch(fibUrl)
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          insertDataIntoHtml(data); //Fibo solution
          createList();
        });
      } else {
        res.text().then((err) => {
          insertErrorIntoHtml(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//button click
document.getElementById("button").addEventListener("click", () => {
  console.log("Button Has Been Clicked");

  //get input value
  let formElement = document.getElementById("fibForm");
  let inputElementVal = formElement.querySelector("input[name=inputVal]").value;
  let checkboxVal = document.getElementById("saveCheckBox");
  //greater than 50 error
  if (inputElementVal > 50) {
    solutionContainer.className = "";
    document.getElementById("resultsSpinner").className = "";
    document.getElementById("errorMessage").className =
      "visible p-0 alert alert-danger alert-box";
  } else if (checkboxVal.checked == true) {
    document.getElementById("solutionContainer").className =
      "col spinner-border m-2";
    document.getElementById("resultsSpinner").className =
      "col final-spin spinner-border m-2";
    //call get request function
    getFibFromServer(inputElementVal);
  } else {
    document.getElementById("solutionContainer").className =
      "col spinner-border m-2";
    fib(inputElementVal);
    solutionContainer.innerHTML = fib(document.querySelector("input").value);
    document.getElementById("solutionContainer").className = "col solution";
  }
});

//insert data into document
function insertDataIntoHtml(fibNum) {
  solutionContainer = document.getElementById("solutionContainer");
  solutionContainer.className = "col solution";
  solutionContainer.innerHTML = `${fibNum.result}`;
}
function insertErrorIntoHtml(error) {
  document.getElementById("resultsSpinner").className = "";
  solutionContainer = document.getElementById("solutionContainer");
  solutionContainer.className = "col error";
  solutionContainer.innerHTML = `Server Error: ${error}`;
}
function insertListIntoHtml(list, parentElement) {
  list.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  const newList = document.createElement("ul");
  newList.classList.add("p-0");

  for (let item of list) {
    const listItem = document.createElement("li");
    listItem.classList.add("line");
    let itemDate = new Date(item.createdDate);
    itemDate.set;
    listItem.innerHTML = `The Fibonacci of ${item.number} is ${
      item.result
    }. Calculated at: ${itemDate.toString()}`;
    newList.appendChild(listItem);
  }
  document.getElementById(parentElement).appendChild(newList);
}
const createList = function resultsFunction() {
  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      insertListIntoHtml(data.results, "resultsList");
      document.getElementById("resultsSpinner").className = "";
    });
};

// window onload function
window.onload = document.getElementById("resultsSpinner").className =
  "col spinner-border m-2";
createList();
