// enable offline data

db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

   // real-time listener
   
   if (truck !== null) {
   //let trucklist = ['11', '12', '21', '31', '51'];
   //trucklist.forEach(function(item, index, array) {
        db.collection('Main').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    renderMainList(change.doc.data(), change.doc.id);  //removed ,item
                }
                if(change.type === 'removed'){
                    removeMainList(change.doc.id);
                }
            });
        });
        

    //});
  };

  //Check if truck11main is loaded
  const page = document.querySelector('.truckmain');
  if(page !== null) {
  const pageid = page.getAttribute('page-id');
  const pagecollection = pageid + "main";
  //if (truckmain !== null) {
      console.log("Truck 11 Main Loaded")
      db.collection("Main").doc(pageid).collection(pagecollection).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added') {
            renderTruckMain(change.doc.data(), change.doc.id);
          }
          if(change.type === 'removed'){
            removeTruckMain(change.doc.id);
          }
        });
      });
  };


  //const maindiv = document.querySelector('.truck');

  const truckContainer = document.querySelector('.truck');
  if(truckContainer !== null) {
    truckContainer.addEventListener('click', evt => {
      if (evt.target.getAttribute('truck-id') == null) {
        if (evt.target.parentNode.getAttribute('truck-id') == null) {
          if(evt.target.parentNode.parentNode.getAttribute('truck-id') == null) {
            if(evt.target.parentNode.parentNode.parentNode.getAttribute('truck-id') == null) {

            } else {
                var tid = evt.target.parentNode.parentNode.parentNode.getAttribute('truck-id');
                document.location.href="/pages/" + tid + ".html";
            }
          } else {
            var tid = evt.target.parentNode.parentNode.getAttribute('truck-id');
            document.location.href="/pages/" + tid + ".html";
          }
        } else {
          var tid = evt.target.parentNode.getAttribute('truck-id');
          document.location.href="/pages/" + tid + ".html";
        }
      } else {
        var tid = evt.target.getAttribute('truck-id');
        document.location.href="/pages/" + tid + ".html";
      }
        
    })
    
  }


  const form = document.querySelector('form');
  if (form !== null) {
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const truckmain = {
    note: form.note.value,
    od: form.milage.value,
    date: Date.now()
  };
  const workingtruck = form.getAttribute('truck-id');
  const workingmain = workingtruck + "main";
  //var dbdoc = db.collectionGroup('11').doca\();
  db.collection('Main').doc(workingtruck).collection(workingmain).add(truckmain)
    .catch(err => console.log(err));

  form.note.value = '';
  form.milage.value = '';
});
  }

  