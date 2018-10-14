export default function(state=null,action){

  //答应出action对象，不再是promise，这是因为redux-promise middleware
  console.log('Action recieve',action);
  return state;
}
