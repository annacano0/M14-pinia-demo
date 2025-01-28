import { defineStore } from "pinia";
export const useCardStore=defineStore('CardStore',{
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
        }
    }
    
})