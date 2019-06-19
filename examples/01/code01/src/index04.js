class Person {
    constructor(name){
        this.name = name
    }

    sing(){
        console.log(this.name + 'is singing')
    }
}

const demofunc4 = res => {
    console.log("func 4")
  }

var p = new Person("xiao wang")
p.sing()
