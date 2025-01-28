import { defineStore } from "pinia";
export const useCardStore=defineStore('CardStore',{
    //state
    state:()=>{
        return{
            items:[],
        }
    }
    
})