import {useProductStore} from './ProductStore'
import {useCartStore} from './ProductStore'

import {ref, reactive} from "vue";
const productStore=useProductStore();
const cartStore=useCartStore();
const history=reactive([])
history.push(JSON.stringify(cartStore.$state));
cartStore.$subscribe((mutation,state)=>{
 history.push(JSON.stringify(state));
})
