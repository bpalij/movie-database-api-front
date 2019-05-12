// using arrow functions because they do not have their own 'this' context
//  and therefore do not require binding in react component
// it does not work, so not used
// import * imports an object
// it seems like import {} imports the same object, but destructures it
// currently do not know how to workaround without moving the logic to component and binding

export const handleValue = stateField => (event) => {
  // const returned = (event) => {
  const setStateObject = {};
  setStateObject[stateField] = event.target.value;
  this.setState(setStateObject);
  // };
  // return returned;
};

export const handleSwitch = stateField => () => {
  // const returned = () => {
  const setStateObject = {};
  setStateObject[stateField] = !this.state[stateField];
  this.setState(setStateObject);
  // };
  // return returned;
};
