// |=============================================| linkQube Application |==============================|
let siteNameInput = document.getElementById('siteName');
let siteUrlInput = document.getElementById('siteUrl');

let bookmarks = [];

if (localStorage.getItem('bookmarksList') != null)
{
  bookmarks = JSON.parse(localStorage.getItem('bookmarksList'));
  displayBookmarks();
}

if (bookmarks.length == 0)
{
  addBtn.classList.add("add-button-empty")
  searchBox.classList.add("d-none")
  welcome.classList.remove("d-none")
}
else
{
  console.log('page contain bookmarks')
}
/**
 * Checks the 'bookmarks' array and updates UI elements based on its length.
 *
 * If the bookmarks array is empty, modifies UI elements to reflect an empty state.
 * If not empty, restores UI elements to the default state.
 */
function checkArray()
{
  if (bookmarks.length == 0)
  {
    addBtn.classList.add("add-button-empty")
    searchBox.classList.add("d-none")
    welcome.classList.remove("d-none")
  }
  else
  {
    addBtn.classList.remove("add-button-empty")
    searchBox.classList.remove("d-none")
    welcome.classList.add("d-none")
  }
}
/**
 * Adds a new bookmark to the 'bookmarks' array, updates storage, and refreshes the display.
 *
 * Creates a new bookmark object with name and URL from input fields.
 * Adds the new bookmark to the 'bookmarks' array.
 * Updates the localStorage with the modified bookmarks list.
 * Refreshes the displayed bookmarks using displayBookmarks().
 * Clears input data using the clearInputData() function.
 */
function linkQubeMain()
{
    const site = 
    {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    }

    bookmarks.push(site);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarks));
    displayBookmarks();
    clearInputData();
}
/**
 * Displays bookmarks in the 'showBookmarks' element based on the bookmarks array.
 *
 * Iterates through the bookmarks array, generating HTML markup for each bookmark.
 * Updates the content of the 'showBookmarks' element with the generated markup.
 */
function displayBookmarks()
{
  let displayBookmarksData = ``;

  for (let i = 0; i < bookmarks.length; i++)
  {
    displayBookmarksData += 
    `
    <div class="col-lg-4 col-md-6" >
    <div class="card h-100 border-0 custom-shadow-start">
      <div class="card-wrapper p-3">
          <div class="card-data">
            <div class="bookmark-thumbnail card border-0  p-2">
              <img class="" src="https://www.google.com/s2/favicons?domain=${bookmarks[i].url}&sz=256
              " alt="${bookmarks[i].name}">
            </div>
            <div class="bookmark-name my-auto px-1">
              <span class="sec-font fs-5 fw-medium bookmark-title">${bookmarks[i].name}</span>
            </div>
          </div>
          <div class="card-buttons text-center my-auto">
            <a href="//${bookmarks[i].url}" target=”_blank” class="btn custom-btn-style rounded-pill sec-font fw-medium">Visit</a>
            <a class="btn custom-btn-style rounded-pill sec-font fw-medium" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></a>
          </div>
      </div>
    </div>
    </div>
    `
  }

  document.getElementById('showBookmarks').innerHTML = displayBookmarksData;
}
/**
 * Deletes a bookmark at the specified index and updates storage and display.
 *
 * Removes the bookmark at the given index, updates localStorage,
 * refreshes the displayed bookmarks, and checks the array for further actions.
 *
 * @param {number} index - Index of the bookmark to be deleted.
 */
const deleteBookmark = (index) =>
{
  bookmarks.splice(index, 1)
  localStorage.setItem('bookmarksList', JSON.stringify(bookmarks));
  displayBookmarks();
  checkArray();
}
/**
 * Searches bookmarks based on a keyword and updates the display.
 *
 * Iterates through the bookmarks array and includes only those
 * whose name matches the provided keyword (case-insensitive).
 * Updates the HTML content of the 'showBookmarks' element with
 * the matching bookmarks, displaying relevant information.
 *
 * @param {string} keyword - The search keyword for bookmark names.
 */
function search(keyword)
{
  let displayBookmarksData = ``;

  for (let i = 0; i < bookmarks.length; i++)
  {
    if (bookmarks[i].name.toLowerCase().includes(keyword.toLowerCase()))
    {
      displayBookmarksData += 
      `
      <div class="col-lg-4 col-md-6" >
      <div class="card h-100 border-0 custom-shadow-start">
        <div class="card-wrapper p-3">
        <div class="card-data">
              <div class="bookmark-thumbnail card border-0  p-2">
                <img class="" src="https://www.google.com/s2/favicons?domain=${bookmarks[i].url}&sz=256
                " alt="${bookmarks[i].name}">
              </div>
              <div class="bookmark-name my-auto px-1">
                <span class="sec-font fs-5 fw-medium bookmark-title">${bookmarks[i].name}</span>
              </div>
            </div>
            <div class="card-buttons text-center my-auto">
              <a href="//${bookmarks[i].url}" target=”_blank” class="btn custom-btn-style rounded-pill sec-font fw-medium">Visit</a>
              <a href="#" class="btn custom-btn-style rounded-pill sec-font fw-medium" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></a>
            </div>
        </div>
      </div>
      </div>
      `
    }
  }

  document.getElementById('showBookmarks').innerHTML = displayBookmarksData;
}
/**
 * Clears input data and removes validation classes for site name and URL.
 *
 * Resets the values of siteNameInput and siteUrlInput to empty strings.
 * Removes the "is-valid" class from siteName and siteUrl elements.
 */

const clearInputData = () =>
{
  siteNameInput.value = '';
  siteUrlInput.value = '';
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var closeMode = document.getElementById("saveBtn")
/**
 * Eventlistener on input to validate site name.
 */
siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
  closemodal();
});
/**
 * Eventlistener on input to validate site url.
 */
siteUrl.addEventListener("input", function () {
  validate(siteUrl, urlRegex);
  closemodal();
});
/**
 * Validates site name and URL inputs. If valid, calls linkQubeMain() and checkArray().
 * If not valid, marks inputs as invalid, sets modal dismiss attribute, and returns false.
 *
 * @param {HTMLInputElement} input1 - Site name input field.
 * @param {HTMLInputElement} input2 - Site URL input field.
 * @returns {boolean} False if inputs are invalid; proceeds with submission otherwise.
 */
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
/**
 * Ensures that BootStrap Dismiss is set correctly.
 */
function closemodal()
{
  if(siteName.classList.contains("is-valid") &&
     siteUrl.classList.contains("is-valid")
    )
  {
    closeMode.dataset.bsDismiss = "modal";
  }
  else
  {
    closeMode.dataset.bsDismiss = "";
  }
}

/**
 * Checks if the input fields contain valid data and submits the bookmark if they are valid.
 * @param {HTMLInputElement} input1 - The input field for the site name.
 * @param {HTMLInputElement} input2 - The input field for the site URL.
 */
function submitBookmark(input1, input2)
{
  if(input1.classList.contains("is-valid") &&
     input2.classList.contains("is-valid")
    )
  {
    linkQubeMain();
    checkArray();
  }
  else
  {
    input1.classList.add("is-invalid");
    input2.classList.add("is-invalid");
    closeMode.dataset.bsDismiss = "";
    return false;
  }
}