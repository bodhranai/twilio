<template>
  <div>
    <input  size="10" type="text"  v-model="recipient"> 
  <input  size="100" type="text"   v-model="body">
    <button @click="callCloudFunction">Send</button>
    <div v-if="response">{{ response }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  computed :{
    recipient:{
      get(){
        return this.$store.state.recipient
      },
      set(newValue){
        this.$store.dispatch('setRecipient',newValue)
      }
    },
    body:{
      get(){
        return this.$store.state.body
      },
      set(newValue){
        this.$store.dispatch('setBody',newValue)
      }
    }
  },

  setup() {
    const response = ref(null);
    const store = useStore();
    const callCloudFunction = async () => {
      try {
       
        const result = await store.dispatch('callGoogleCloudFunction');
        response.value = result.data; 
      } catch (error) {
        console.error('Error calling Google Cloud Function:', error);
      }
    };

    return { response, callCloudFunction };
  }
};
</script>
