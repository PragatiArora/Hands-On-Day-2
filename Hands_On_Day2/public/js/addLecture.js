var app=new Vue({
    el:'#app',
    data:{
        name:'',
        lecture:[],
        batch:[],
        subject:[],
        teacher:[],
        batchId:'',
        subjectId:'',
        teacherId:''
    },
    created() {
        this.showLecture(),
        this.getBatch(),
        this.getSubject(),
        this.getTeacher()
    },
    methods:{

        async getBatch()
        {
            try{
                let response=await axios.get('/api/batch');
                this.batch=response.data;
            }catch(error)
            {
                console.log("Ërror Found")
            }
        },

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

        async getTeacher()
        {
            try{
                let response=await axios.get('/api/teacher');
                this.teacher=response.data;
            }catch(error)
            {
                console.log("Ërror Found")
            }
        },

    async showLecture()
    {
        try{
            let response=await axios.get('/api/lecture');
            this.lecture=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addLecture: async function () {
        try{
            let response = await axios.post('/api/lecture', {
            name: this.name,
            batchId:this.batchId,
            subjectId:this.subjectId,
            teacherId:this.teacherId, 
            })
        }
       catch(error)
       {
            console.log("Error in adding Lecture")
       }
       this.showLecture()
    }
}
})
