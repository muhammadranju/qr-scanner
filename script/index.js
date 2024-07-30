const scanner = new Html5QrcodeScanner("reader", {
  // Scanner will be initialized in DOM inside element with id of 'reader'
  qrbox: {
    width: 250,
    height: 250,
  }, // Sets dimensions of scanning box (set relative to reader element width)
  fps: 20, // Frames per second to attempt a scan
});

scanner.render(success, error);
// Starts scanner

function copyText(result) {
  navigator.clipboard.writeText(result);
  alert("Copied to clipboard", result);
}

function success(result) {
  let newResult =
    result.length === 60
      ? result.toString().slice(0, 60).concat("/...")
      : result;
  console.log(newResult);
  document.getElementById("result").innerHTML = /*html*/ `
  <div class="card">
        <h2>Success!</h2>
        <p class="anchorResult">
      <a  href="${result}" target="_blank">${result}</a>
      </p>

        <button class="btn-copy" onclick="copyText('${result}')">Copy</button>
        <a href="/"><button class="btn">Back</button></a> 
  </div>
        `;
  // Prints result as a link inside result element

  scanner.clear();
  // Clears scanning instance

  document.getElementById("reader").remove();
  // Removes reader element from DOM since no longer needed
}

function error(err) {
  console.error(err);
  // Prints any errors to the console
}
