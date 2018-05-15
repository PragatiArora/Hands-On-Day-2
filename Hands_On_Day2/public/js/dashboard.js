var app = new Vue({
    el: "#app",
     data: {
       batches: []
     },
     created() {
       this.getUpcomingBatches(); 
     },
   
     methods: {
       async getUpcomingBatches() {
         try {
           let response = await axios.get('/api/batch/upcoming');
           this.batches = response.data;
           console.log(this.batches)
         } catch (error) {
           alert("There is some error ,try again later");
         }
       }
     }
    
   });
   
 