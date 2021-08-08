// Initalizes everything for "index.hml":
(() => {

  // Elements:
  let textArea = document.querySelector("textarea");
  let menu = document.querySelector("#menu");
  let copyBtn = document.querySelector("#menu_copy");
  let clearBtn = document.querySelector("#menu_clear");
  let settingsBtn = document.querySelector("#menu_settings");

  /**
   *
   *  Event Listeners
   *
   */

  // Loads text and applies setting if stored, otherwise initializes default settings:
  window.onload = function () {
    if (window.localStorage.text) {
      textArea.value = window.localStorage.text;
    } else {
      window.localStorage.text = "";
      window.localStorage.settings = JSON.stringify({
        "text_color":"#FFFFFF",
        "bg_color":"#000000",
        "font_type":"sans-serif",
        "font_size":"16px"
      });
    }
    applySettings(window.localStorage.settings, textArea);
    textArea.focus();
  }

  // Prevents deleting and modifying text:
  textArea.addEventListener("keydown", function (evt) {
    this.selectionStart = this.value.length;
    switch (evt.which) {
      case 8:
      case 37:
      case 38:
      case 39:
      case 40:
        evt.preventDefault();
      break;
      case 27:
        this.blur();
        this.focus();
      default:
        window.localStorage.setItem("text", this.value);
    }
  });

  // Disabled mouse events on textArea:
  textArea.addEventListener("mousedown", function (evt) {
    evt.preventDefault();
    textArea.selectionStart = textArea.value.length;
  })

  // Handles copy text:
  copyBtn.addEventListener("mousedown", function (evt) {
    textArea.select();
    document.execCommand("copy");
    textArea.classList.add("fade-in-text");
  });

  // Handles clearing everyting:
  clearBtn.addEventListener("mousedown", function (evt) {
    let confirmPrompt = confirm("Yo, are you sure? Because once it's gone, it be gone. Forever...");
    if (confirmPrompt) {
      window.localStorage.removeItem("text");
      textArea.classList.add("clear-text");
      setTimeout(function () {
        textArea.value = "";
        textArea.classList.remove("clear-text");
      }, 500);
    }
  });

  // Opens settings menu:
  settingsBtn.addEventListener("mousedown", function (evt) {
    window.location = "/settings/";
  })

  // Replaces default context menu with custom one:
  document.addEventListener("contextmenu", function (evt) {
    evt.preventDefault();
    menu.style.left = `${evt.clientX}px`;
    menu.style.top = `${evt.clientY}px`;
    menu.style.display = "block";
    return false;
  });

  // Dismisses custom context menu and updates cursor anytime you click anywhere:
  document.addEventListener("mousedown", function (evt) {
    menu.style.display = "none";
    setTimeout(function () {
      textArea.classList.remove("fade-in-text");
      textArea.focus();
      textArea.selectionStart = textArea.value.length;
    }, 250);
  });

  /**
   *
   *  Support Functions
   *
   */

  // :: STRING, NODE -> VOID
  // Applies settings to page:
  function applySettings(str, node) {
    let settings = JSON.parse(str);
    node.style.color = settings.text_color;
    node.style.backgroundColor = settings.bg_color;
    node.style.fontFamily = settings.font_type;
    node.style.fontSize = settings.font_size;
  }

})();
