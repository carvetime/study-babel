class Person {
  constructor(name){
      this.name = name
  }

  sing(){
      console.log(this.name + 'is singing')
  }
}

const demofunc5 = res => {
  console.log("func 5")
}

var p = new Person("xiao wang")
p.sing()