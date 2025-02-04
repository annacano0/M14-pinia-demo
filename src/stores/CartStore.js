import { defineStore } from "pinia";
import {groupBy} from "lodash"
export const useCartStore=defineStore('CartStore',{
    //state
    state:()=>{
        return{
            items:[],
        }
    },
    actions:{
        addItems(count,item){
            count=parseInt(count);
            for(let index=0;index<count;index++){
                this.items.push(item)
            }
        },
        clearItem(itemName){
            const newArray = this.items.filter((item)=> item.name != itemName)
            this.items= newArray
        },
        setItemCount(item, count){
            this.items.push(item)
        }
    },
    getters:{
        count:(state)=>state.items.length,
        isEmpty:(state)=>state.count===0,
        grouped:state=>groupBy(state.items,item=>item.name),
        groupCount:(state)=>state.grouped[name].length,
        groupPrice: (state) => {
            return state.items.reduce((total, item) => total + (item.price || 0), 0);
        }
    }

})