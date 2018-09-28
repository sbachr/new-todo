let app = new Vue({
    el: '#app',
    components: {
                'new-todo': NewTodo,
                'edit-todo' : EditTodo,
    },
    data :{
      isEditing: false,
      owner:'',
      edited : '',
      todos:[],
    },
    created(){
      this.getTodos()
    },
    methods: {
                dateFormat(date){
                  let day = new Date(date).getDate()
                  let month = new Date(date).getMonth()
                  let year = new Date(date).getFullYear()
                  return `${day}/${month}/${year}`
                },
                editTodo(){
                  let id = todo._id

                    let newTag = todo.tag.reduce(function(result,tag){
                      let tags =  result + "#" + tag
                      return tags
                    }, '')
                    axios
                    .put(`http://localhost:3000/task?id=${id}`, {
                        title: todo.title,
                        task:todo.task,
                        tag:newTag,
                        deadline: new Date(todo.deadline),
                        status: todo.status
                    }, {
                      headers:{
                        token: localStorage.getItem("token")
                      }
                    })
                    .then(function(task){
                      window.location.replace('/home.html')
                      console.log("berhasil")
                    })
                    .catch(function(err){
                      console.log(err)
                    })
                },

                newTodo (newTodo) {
                  console.log(newTodo)
                  axios
                  .post("http://localhost:3000/task", newTodo,{
                    headers:{
                      token: localStorage.getItem("token")
                    }
                  })
                  .then(function(res){
                    window.location.replace('/home.html')
                  })
                  .catch(function(err){
                    console.log(err.message)
                  })
                },
                deleteTodo (todo) {
                  let id = todo._id
                  console.log(id)
                  axios
                  .delete(`http://localhost:3000/task?id=${id}`,{
                    headers:{
                      token:localStorage.getItem('token')
                    }
                  })
                  .then(function(err){
                    console.log("successfully delete")
                    window.location.replace('/home.html')
                  })
                  .catch(function(err){
                    console.log(err.message)
                  })
                },
                hideTodo(todo){
                  console.log(todo._id)
                  const todoIndex = this.todos.indexOf(todo)
                  this.todos.splice(todoIndex, 1)
                },
                showTodo(){

                },
                completeTodo (todo) {
                    const todoIndex = this.todos.indexOf(todo)
                    this.todos[todoIndex].status = true
                    let id = todo._id

                    let newTag = todo.tag.reduce(function(result,tag){
                      let tags =  result + "#" + tag
                      return tags
                    }, '')
                    axios
                    .put(`http://localhost:3000/task?id=${id}`, {
                        title: todo.title,
                        task:todo.task,
                        tag:newTag,
                        deadline: new Date(todo.deadline),
                        status: todo.status
                    }, {
                      headers:{
                        token: localStorage.getItem("token")
                      }
                    })
                    .then(function(task){
                      window.location.replace('/home.html')
                      console.log("berhasil")
                    })
                    .catch(function(err){
                      console.log(err)
                    })

                },

                showForm (todo) {
                  this.edited = todo
                  this.isEditing = true
                },
                hideForm () {
                  this.isEditing = false
                  edited = ''
                },
                getTodos(){
                  axios
                  .get('http://localhost:3000/task',{
                    headers:{
                      token: localStorage.getItem("token")
                    }
                  })
                  .then((todos)=>{
                    this.todos = todos.data.task
                    this.owner = 'Hi, ' + todos.data.task[0].userId.name
                  })
                  .catch(function(err){
                    console.log(err.message)
                  })
                },
    },        
})