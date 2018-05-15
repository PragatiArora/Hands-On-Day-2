var app=new Vue({
    el:'#app',
    data:{
        name:'',
        courseId:'',
        course:[],
        subject:[],
    },
    created() {
        this.getCourse(),
        this.showSubject()
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
    async showSubject()
    {
        try{
            let response=await axios.get('/api/subject');
            this.subject=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addSubject: async function () {
        try{
            let response = await axios.post('/api/subject', {
            name: this.name,
            courseId:this.courseId
            })
        }
       catch(error)
       {
            console.log("Error in adding Subject")
       }
       this.showSubject()
    }
}
})
