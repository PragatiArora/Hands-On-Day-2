var app=new Vue({
    el:'#app',
    data:{
        name:'',
       course:[],
    },
    created() {
        this.showCourse()
    },
    methods:{
    async showCourse()
    {
        try{
            let response=await axios.get('/api/course');
            this.course=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addCourse: async function () {
        try{
            let response = await axios.post('/api/course', {
            name: this.name,
            })
        }
       catch(error)
       {
            console.log("Error in adding Course")
       }
       this.showCourse()
    }
}
})
