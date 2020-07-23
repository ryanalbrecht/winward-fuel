// import something here

// "async" is optional;

const VueInputMask = require('vue-inputmask').default

export default async ( boot ) => {
  boot.Vue.use(VueInputMask);
}
