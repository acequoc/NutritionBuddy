import {db} from "./firebase"; 
import firebase from "firebase";

function SaveToFirebase(list) { 
  var unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
    
    if (user) {
      try {
        db.ref(`${user.uid}`).push(
          list 
        );
      } catch (error) {
          alert(error);
      }
    }
  });

  unsubscribe();
}

function ReadFromFirebase({model}){
  
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      try {
        db.ref(`${user.uid}`).on("value", (snapshot) =>{


          if(snapshot.val()){
            const values = Object.values(snapshot.val());
            const list = Object.entries(snapshot.val());

            const nameKeyMapping = list.map( recipe => {
              return {
                key: recipe[0], 
                name: recipe[1].name
              };
            });
            model.setRecipeList(values);
            model.setRecipeKeys(nameKeyMapping);
            model.setUserID(user.uid);
          }
        });
      } catch (error) {
        alert(error);
      }
    } else {
    }
  });

  // unsubscribe();
};

function RemoveFromDatabase(id){
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      try {

        db.ref(`${user.uid}/` + id).remove();

      } catch (error) {
        alert(error);
      }
    }
  });
}

function UpdateFirebase(id, name, ingredientList){
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      try {
        db.ref(`${user.uid}/` + id)
          .update({
            'name': name,
            'ingredientList': ingredientList
          });
      } catch (error) {
        alert(error);
      }
    }
  });
}



export {SaveToFirebase, ReadFromFirebase, RemoveFromDatabase, UpdateFirebase};