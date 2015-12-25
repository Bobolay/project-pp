(function () {
    'use strict';

    angular
        .module('app')
        .controller('BasketController',function ($scope) {
        var container = document.getElementById('basket_container');

    container.onclick = function(event) {
      if (!event.target.classList.contains('remove_button')) return;

      event.target.parentNode.hidden = !event.target.parentNode.hidden;
    }
        var d = document,
    itemBox = d.querySelectorAll('.item_box'),
    cartCont = d.getElementById('cart_content');
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
function addToCart(e){
  this.disabled = true;
  var cartData = getCartData() || {},
      parentBox = this.parentNode,
      itemId = this.getAttribute('data-id'),
      itemTitle = parentBox.querySelector('.item_title').innerHTML,
      itemPrice = parentBox.querySelector('.item_price').innerHTML;
  if(cartData.hasOwnProperty(itemId)){
    cartData[itemId][2] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  if(!setCartData(cartData)){
    this.disabled = false;
  }
 return false;
}
for(var i = 0; i < itemBox.length; i++){
  addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
function openCart(e){
  var cartData = getCartData(),
      totalItems = '';
    if(cartData !== null){
    totalItems = '<table class="shopping_list"><tr><th>Назва товару</th><th>Ціна</th><th>К-сть</th></tr><br><div class="pay"><a href="#/login">оплатити замовлення</a></div>';
    for(var items in cartData){
      totalItems += '<tr>';
      for(var i = 0; i < cartData[items].length; i++){
        totalItems += '<td>' + cartData[items][i] + '</td>';
      }
      totalItems += '</tr>';
    }
    totalItems += '<table>';
    cartCont.innerHTML = totalItems;
  } else {
    cartCont.innerHTML = '<span class="basket_is_empty">В кошику пусто</span>';
  }
  return false;
}
addEvent(d.getElementById('checkout'), 'click', openCart);
addEvent(d.getElementById('clear_cart'), 'click', function(e){
  localStorage.removeItem('cart');
  cartCont.innerHTML = '<span class="basket_is_clear">Кошик очищено</span>';
});
});
})();


