class Person {
    constructor(name){
        this.name = name
    }

    sing(){
        console.log(this.name + 'is singing')
    }
}

var p = new Person("xiao wang")
p.sing()
