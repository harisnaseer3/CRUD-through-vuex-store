import Vue from 'vue'
import Vuex from 'vuex'
import allProduct from '../mock/product.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      product: [],
      editedIndex: -1,
    },

    getters:{
        Product: state => state.product,
        editedIndex: state => state.editedIndex,  
    },

    actions:{
        getProduct ({ commit }) {
            commit("getProductData")
        },
        addItem({ commit }, save) {
            debugger; // eslint-disable-line no-debugger
            commit ("addItemToTable", save)
        },
        removeItemConfirm({commit}, id){
            debugger; // eslint-disable-line no-debugger
            commit ("removeItemConfirm", id)
        },
        updateItem({commit}, editedItem) {
            debugger; // eslint-disable-line no-debugger
            commit ("updateItem", editedItem)
        }   
    },

    mutations:{
        getProductData(state) {
            state.product = allProduct;
        },
        addItemToTable(state, item) {
            console.log(state.product.indexOf(item))
            debugger; // eslint-disable-line no-debugger
            state.product.push({...item})
           
        },
        removeItemConfirm(state, id){
        state.product = state.product.filter((Product) => Product.id !== id)
        },
        updateItem(state, params) {
            debugger; // eslint-disable-line no-debugger
            Object.assign(state.product[params.editedItem], params.editedIndex)
            debugger; // eslint-disable-line no-debugger
        }
    }
})