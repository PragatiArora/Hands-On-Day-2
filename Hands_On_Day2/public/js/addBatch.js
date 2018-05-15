var app=new Vue({
    el:'#app',
    data:{
        name:'',
       batch:[],
       course:[],
       courseId:'',
    },
    created() {
        this.getCourse(),
        this.showBatch()
    },
    methods:{
    
        async getCourse()
        {
            try{
                let response=await axios.get('/api/course');
                this.course=response.data;
            }catch(error)
            {
                console.log("Ërror Found")
            }
        },
    async showBatch()
    {
        try{
            let response=await axios.get('/api/batch');
            this.batch=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addBatch: async function () {
        try{
            let response = await axios.post('/api/batch', {
            name: this.name,
            courseId:this.courseId
            })
        }
       catch(error)
       {
            console.log("Error in adding Course")
       }
       this.showBatch()
    }
   
}
})
