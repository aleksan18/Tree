const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (() => {
    ac.grant("VIEWER")
    .readAny('items')
    .createOwn('profile')
    ac.grant("USER")
    .extend('VIEWER')
    .readOwn("profile")
    .updateOwn("profile")
    .createOwn("order")
    .readOwn("order")
    .readOwn('cart')
    .updateOwn('cart')
    .deleteOwn('cart')
    .createOwn('cart')


  ac.grant("ADMIN")
    .extend('USER')
    .deleteAny('order')
    .deleteAny('item')
    .createAny("item")
    .createAny('order')
    .updateAny('order')
    .updateAny("item")

  return ac;
})();
