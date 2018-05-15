var app=new Vue({
    el:'#app',
    data:{
        name:'',
        student:[],
        id:'',
        enrolledBatches:[],
        batches:[]

    },
    created() {
       this.showStudent()
    },
    methods:{
    async showStudent()
    {
        try{
            let response=await axios.get('/api/student');
            this.student=response.data;
        }catch(error)
        {
            console.log("Ërror Found")
        }
    },
    addStudent: async function () {
        try{
            let response = await axios.post('/api/student', {
            name: this.name,
            })
        }
       catch(error)
       {
            console.log("Error in adding Student")
       }
       this.showStudent();
    },

    stuDetail() {
        this.id = event.target.id
        this.name = event.target.name
        let studentId = this.id
        axios.get("/api/student/"+studentId+"/batches")
            .then( response => {
                this.enrolledBatches = response.data
                console.log("Enrolled "+this.enrolledBatches)
            })
            .catch(error => {
                console.log(error);
            })
    },

}
})
