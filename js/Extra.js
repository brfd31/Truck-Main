firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //console.log(user.uid);
    
  var html = `
  <div class="card-panel truck white row" >
      <div class="truck-details">
          <div class="truck-title">
          <b> ${user.uid}</b>

          </div>
      </div>
  </div>
          `;
          
//html += html2;
truck.innerHTML += html;
}})