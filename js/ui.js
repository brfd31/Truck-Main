

const truck = document.querySelector('.truck');
const truckmain = document.querySelector('.truckmain');
var adminid = "xxxx";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        adminid = user.uid;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});

    const signout = document.querySelector('.signout');
    signout.addEventListener('click', evt => {
        firebase.auth().signOut().then(function() {
            window.location.replace('/');
          }).catch(function(error) {
            // An error happened.
            console.log(error);
          });
    });
    
    const update = document.querySelector('.update');
    update.addEventListener('click', evt => {
        window.location.reload(true);
    });  
    
    // const truckmainContainer = document.querySelector('.truck');
    if(truckmain !== null){
    truckmain.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    const pageid = page.getAttribute('page-id');
  const pagecollection = pageid + "main";
    db.collection('Main').doc(pageid).collection(pagecollection).doc(id).delete();
  }

})
    }

});


//check if main page loaded

const renderMainList = (data, id, item) => {
   
    var html = `
        <div class="card-panel truck white row" truck-id="${data.number}">
            <img src="/images/${data.number}.png" alt="truck thumb">
            <div class="truck-details">
                <div class="truck-title"><b>Class:</b> ${data.type}
                `;
    var html2 = ``;

                let pump = data.pump;
                //console.log(pump);
                if ( pump !== 0 ) { 
                    html2 = `<br><b>Pump:</b> ${data.pump} GPM `;
                } 
                const html3 = `    
                </div>
            </div>
        </div>
                `;
                
    html += html2;
    truck.innerHTML += html;
            };
  
  
    const renderTruckMain = (data, id) => {
    var a = new Date(data.date);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

    var html = `
        <div class="card-panel white row mainnote" main-id="${id}" data-id="${id}">
            <div class="maint-details">
                <b>${month} ${date}, ${year}</b> 
                <div class="right">${data.od} KM </div> 
            </div>
            <div> ${data.note}  
                <div class="right" myAdminID = "${id}"></div>
            </div>
        </div>
    `;
    //html += html2;
   // html += html3
    truckmain.innerHTML += html;

    var html2 = ``;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user.uid == adminid) {
                //console.log(user.uid);
                html2 = `<i class="material-icons" data-id="${id}">delete_outline</i>`;
                // let mySel = "div[myAdminID = "id"]";
                let myAdmin = document.querySelector(`div[myAdminID="${id}"]`);
                myAdmin.innerHTML = html2;
            }
        });
};

// remove recipe
    const removeTruckMain = (id) => {
    const remtruckmain = document.querySelector(`.mainnote[data-id=${id}]`);
    remtruckmain.remove();
  };