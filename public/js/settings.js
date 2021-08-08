// initializes everything for "settings" page:
(() => {

  // Load settings, or initalize default settings if there is nothing to load:
  let settings = window.localStorage.settings !== undefined
    ? JSON.parse(window.localStorage.settings)
    : {
      "text_color":"#FFFFFF",
      "bg_color":"#000000",
      "font_type":"sans-serif",
      "font_size":"16px"
    }

  // Elements:
  let exampleText = document.querySelector("#example_text");
  let textColor = document.querySelector("#text_color");
  let bgColor = document.querySelector("#bg_color");
  let fontType = document.querySelector("#font_type");
  let fontSize = document.querySelector("#font_size");
  let backButton = document.querySelector("#back_button");

  // Set values of elements with values from settings:
  textColor.value = settings.text_color;
  bgColor.value = settings.bg_color;
  fontType.value = settings.font_type;
  fontSize.value = parseInt(settings.font_size);

  /**
   *
   *  Event Listeners
   *
   */

  // Set text color:
  textColor.addEventListener("change", function (evt) {
    updateSettings("text_color", this.value);
    applySettings(exampleText);
  })

  // Set background color:
  bgColor.addEventListener("change", function (evt) {
    updateSettings("bg_color", this.value);
    applySettings(exampleText);
  })

  // Set font type:
  fontType.addEventListener("change", function (evt) {
    updateSettings("font_type", this.value);
    applySettings(exampleText);
  })

  // Set font size:
  fontSize.addEventListener("change", function (evt) {
    updateSettings("font_size", `${this.value}px`);
    applySettings(exampleText);
  });href="/index.html"window.localStorage.settings = JSON.stringify(settings);

  // Save settings and redirect back to main page:
  backButton.addEventListener("click", function (evt) {
    window.localStorage.settings = JSON.stringify(settings);
    window.location = "/index.html";
  });

  /**
   *
   *  Support Functions
   *
   */

  // :: NODE -> VOID
  // Applies style settings to NODE:
  function applySettings(node) {
    node.style.color = settings.text_color;
    node.style.backgroundColor = settings.bg_color;
    node.style.fontFamily = settings.font_type;
    node.style.fontSize = settings.font_size;
  }

  // :: STRING, STRING -> VOID
  // Updates value to property in settings and saves the results to local storage:
  function updateSettings(prop, value) {
    settings[prop] = value;
    window.localStorage.settings = JSON.stringify(settings);
  }

  // Apply settings to example text on page load:
  applySettings(exampleText);

})();
