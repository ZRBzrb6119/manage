const defaultState = {
  mykey: 1
}
// eslint-disable-next-line
export default (state=defaultState,action)=>{
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case 'addkeyFn':
      newState.mykey++
      break;
    default:
      break;
  }
  return newState;
} 