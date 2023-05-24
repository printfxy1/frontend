const form = document.getElementById("form_sentence");

if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    // const sentence = formData.get("sentence");

    let sentence = formData.get("sentence")

    if (sentence.length <=8) {
        alertMessage("error", "Please input atleast 8 characters!");
      return;
    }

    try {
      const response = await window.axios.openAI(sentence);

      document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
    } catch (error) {
      console.error("Error:", error);
      // Handle or display the error message appropriately
    }
  };
}

function alertMessage(status, sentence){
  window.Toastify.showToast({
    text: sentence,
    duration: 5000,
    stopOnFocus: true, 
    style: {
      textAlign : "center",
      background: status == "error" ? "red": "green",
      color : "white",
      padding : "5px",
      marginTop : "2px",
    }
  }); 
}