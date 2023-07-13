// fatching data
const getDataFromApi = async (limit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  // loading spinner start
  spinnerLoading(true);
  showDataInUi(data.data.tools, limit);
};
// showing data in UI
const showDataInUi = (allData, limit) => {
  if (limit && allData.length > 5) {
    allData = allData.slice(0, 6);
    document.getElementById("showAllSection").classList.remove("d-none");
  }
  const dataContaier = document.getElementById("data-container");
  dataContaier.innerText = "";
  allData.forEach((singledata) => {
    const div = document.createElement("div");
    div.classList.add("col");
    let featuresData = singledata.features;
    // create an ol for showing features
    const ol = document.createElement("ol");
    // foop for appand Li inside Ol
    featuresData.forEach((feature) => {
      const li = document.createElement("li");
      li.innerText = `${feature}`;
      ol.appendChild(li);
    });
    div.innerHTML = `
    <div class="card h-100 p-2">
    <img src="${singledata.image}" height="250px" class="card-img-top " alt="..." />
    <div class="card-body">
    <h5 class="card-title">Features</h5>
    ${ol.outerHTML}
    </div>
    <hr class="w-75 mx-auto my-0">
    
    <div class="p-2 d-flex justify-content-between align-items-center">
    <div>
    <p class="mb-0"><b>${singledata.name}</b> </p>
    <div class="d-flex  justify-content-center align-items-center"><span><lord-icon
    src="https://cdn.lordicon.com/qjuahhae.json"
    trigger="loop"
    colors="primary:#121331"
    style="width:25px;height:25px">
</lord-icon></span>
<span>${singledata.published_in}</span>
</div>
    
    </div>
    <div onclick="getDataForDetailsModal('${singledata.id}')" id="cardDetails" data-bs-toggle="modal" data-bs-target="#cardDetailsModal"><lord-icon
    src="https://cdn.lordicon.com/zmkotitn.json"
    trigger="hover"
    colors="primary:#e83a30"
    style="width:50px;height:30px">
    </lord-icon></div>
    </div>
    </div>
    `;
    dataContaier.appendChild(div);
  });
  // loading spinner stop
  spinnerLoading(false);
};

// loading all data button
document
  .getElementById("showAllSection")
  .addEventListener("click", function () {
    getDataFromApi();
    document.getElementById("showAllSection").classList.add("d-none");
  });

// spinner
const spinnerLoading = (value) => {
  const spinner = document.getElementById("spinner");
  if (value) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
// get Details for modal
const getDataForDetailsModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showDetailsInModal(data.data);
};
// show details in modal Function
const showDetailsInModal = (details) => {
  console.log(details);
  const modalLeftSide = document.getElementById("modalLeftSide");
  const modalRightSIde = document.getElementById("modalRightSide");
  modalRightSIde.innerText = "";
  modalLeftSide.innerText = "";
  // price container
  const Prices = details.pricing;
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("d-flex", "justify-content-between");
  if (Prices !== null) {
    Prices.forEach((price) => {
      // console.log(price);
      const singleprice = document.createElement("div");
      singleprice.setAttribute("id", "text-Color");
      singleprice.classList.add("bg-light", "p-1", "rounded-3");
      // singleprice.style.height = "60px";
      if (price.price === "0" || price.price === "No cost") {
        singleprice.innerHTML = `<p class="fw-bold">${"Free Of Cost"} <br>${
          price.plan
        }</p>`;
      } else {
        singleprice.innerHTML = `<p class="fw-bold text-center">${price.price}<br> ${price.plan}</p>`;
      }
      priceContainer.appendChild(singleprice);
    });
  } else {
    const empty = [1, 2, 3];
    empty.forEach((em) => {
      // console.log(em);
      const singleprice = document.createElement("div");
      let plans = "";
      if (em == 1) {
        plans = "Basic";
      } else if (em == 2) {
        plans = "pro";
      } else {
        plans = "Enterprise";
      }
      singleprice.innerHTML = `<p class="text-center, fw-bold">Free of Cost<br><span>${plans}</span></p>`;
      priceContainer.appendChild(singleprice);
    });
  }
  // Features
  const features = details.features;
  const ulFeatures = document.createElement("ul");
  for (const feature in features) {
    const li = document.createElement("li");
    li.innerText = `${features[feature].feature_name}`;
    ulFeatures.appendChild(li);
  }
  // integrations
  const integrations = details.integrations;
  const ulIntegrations = document.createElement("integrations");
  if (integrations !== null) {
    integrations.forEach((integration) => {
      const li = document.createElement("li");
      li.innerText = `${integration}`;
      ulIntegrations.appendChild(li);
      // console.log(integration);
    });
  } else {
    const p = document.createElement("p");
    p.innerText = `No data Found`;
    ulIntegrations.appendChild(p);
  }

  // overall left side data
  const leftSideContainer = document.createElement("div");
  leftSideContainer.classList.add("py-3");
  leftSideContainer.innerHTML = `
  <h4 class="mb-4 text-center">${details.description}</h4>
  ${priceContainer.outerHTML}
  <div class="d-flex justify-content-between mt-3">
  <div>
    <h3>Features</h3>
  ${ulFeatures.outerHTML}
  </div>
  <div>
    <h3>Integrations</h3>
  ${ulIntegrations.outerHTML}
  </div>
 </div>
  `;
  modalLeftSide.appendChild(leftSideContainer);
  // overall RIght Side Data
  // modalRightSIde
  const rightSideContainer = document.createElement("div");
  // rightSideContainer.classList.add("");
  rightSideContainer.innerHTML = `
  <img src="${details.image_link[0]}"  class="img-fluid p-3 rounded-5" alt="" srcset="" />
  <h3 class="text-center">Hi, how are you doing today?</h3>
  <p class="text-center">I'm doing well, thank you for asking. How can I assist you today?</p>`;
  modalRightSIde.appendChild(rightSideContainer);
};
// function getting date and id
// const collectDateAndId = async () => {
//   const url = `https://openapi.programming-hero.com/api/ai/tools`;
//   const res = await fetch(url);
//   const data = await res.json();
//   const elements = data.data.tools;
//   let dates = [];
//   const id = [];
//   elements.forEach((element) => {
//     const date = element.published_in;
//     if (date.indexOf("/") == 2) {
//       dates.push(parseInt(date.slice(0, 2)));
//     } else {
//       dates.push(parseInt(date.slice(0, 1)));
//     }
//     id.push(element.id);
//   });
//   sortDataByDate(id, dates);
// };
//  function for sorting elements by date
// const sortDataByDate = (id, dates) => {
//   console.log(id, dates);
//   const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
// };
// calling fatching data function
getDataFromApi(6);
