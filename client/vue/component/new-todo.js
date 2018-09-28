const NewTodo = {
    data () {
        return {
          titleText: '',
          taskText: '',
          tagText:'',
          deadline:'',
          isCreating: false
        }
      },
      template:`
                <div class="content is-centered">
                  <img src="https://png.icons8.com/nolan/96/000000/plus-2-math.png" v-on:click="openForm" v-show="!isCreating">
                <div class="new-form box" v-show="isCreating">
                    <div class="field">
                      <label class="label">Title</label>
                    <div class="control">
                        <input v-model="titleText" class="input" type="text" />
                    </div>
                    </div>
                      <div class="field">
                        <label class="label">Task</label>
                        <div class="control">
                            <input v-model="taskText" class="input" type="text" />
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Tag</label>
                        <div class="control">
                            <input v-model="tagText" class="input" type="tags" placeholder="#tag"/>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Deadline</label>
                        <div class="control">
                            <input v-model="deadline" class="input" type="date" />
                        </div>
                      </div>
                    <div class="create-options">
                      <a class="button" id="createButton" v-on:click="sendForm()">Create</a>
                      <a class="button" id="cancelButton" v-on:click="closeForm">Cancel</a>
                    </div>
                </div>
                </div>
      `,
      methods: {
        openForm () {
          this.isCreating = true
        },
        closeForm () {
          this.isCreating = false
        },
        sendForm () {
          if (this.titleText.length > 0 && this.taskText.length > 0) {
            const title = this.titleText
            const task = this.taskText
            const tag = "#"+this.tagText
            const deadline = this.deadline
            this.$emit('new-todo', {
              title,
              task,
              tag,
              deadline,
            })
            this.titleText= '',
            this.taskText= '',
            this.tagText='',
            this.deadline='',
            isCreating= false
          }
        }
      }
}