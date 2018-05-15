var app=new Vue({
    el:'#app',
    data:{
        name:'',
        subjectId:'',
        subject:[],
        teacher:[],
    },
    created() {
        this.getSubject(),
        this.showTeacher()
    },
    methods:{

    async getSubject()
    {
        try{
            let response=await axios.get('/api/subject');
            this.subject=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    async showTeacher()
    {
        try{
            let response=await axios.get('/api/teacher');
            this.teacher=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addTeacher: async function () {
        try{
            let response = await axios.post('/api/teacher', {
            name: this.name,
            subjectId:this.subjectId
            })
        }
       catch(error)
       {
            console.log("Error in adding Teacher")
       }
       this.showTeacher()
    }
}
})
