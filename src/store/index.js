// store/index.js

import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    recipient:'',
    body: 'Ahoy from VueX, GCP and Twilio',
    messageSid: ''
  },
  mutations: {
    
    setRecipient(state,newValue){
      state.recipient = newValue
    },
    setBody(state,newValue){
      state.body = newValue
    },
    callGoogleCloudFunction(state, messageSid){
      state.messageSid = messageSid
    }
  },
  actions: {
    async callGoogleCloudFunction({commit}) {
      try {

        const response = await axios.post('https://us-west2-refined-engine-189402.cloudfunctions.net/twilio',  
        {
          'recipient': this.state.recipient,
           'body' : this.state.body
         });
         commit('callGoogleCloudFunction', response.data)
        return response.data;
      } catch (error) {
        throw new Error('Error calling Google Cloud Function');
      }
    },
    setRecipient({commit},newValue){
      commit('setRecipient',newValue)
    },
    
    setBody({commit},newValue){
      commit('setBody',newValue)
    }
  },
  modules: {
    // You can modularize your store if needed
  }
});
