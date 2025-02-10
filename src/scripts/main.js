document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');

    burger.addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        burger.classList.toggle('open');
        sidebar.classList.toggle('open');
    }

    const indicators = document.querySelectorAll('.table-body__indicator');

indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => toggleIndicator(indicator));
})

function toggleIndicator(element) {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
        element.innerHTML = 'active';
    } else {
        element.innerHTML = 'inactive';
    }
}
})



const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll(".table-body__row");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const entriesQuantity = document.getElementById("entries-quantity"); 

const paginationLimit = 8;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;


const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
    paginationNumbers.appendChild(pageNumber);
};
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });

    
};

window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });
    nextButton.addEventListener("click", () => {
      setCurrentPage(currentPage + 1);
    });
    
    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  });


  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };

  const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };
  const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };
  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }
    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };


let entries;

fetch("/src/data/main.json")
  .then(response => response.json())
  .then(json => {
    entriesQuantity.innerHTML = "Showing data 1 to 8 of " + json.users.length + " entries";
})
//  256K entries
