
import '@babel/polyfill';

class Person {
    constructor(name){
        this.name = name
    }
  
    sing(){
        alert(this.name + ' is singing')
    }

    info(){
      var data = Object.assign({age:18},{name:'carvetime'});
      alert(JSON.stringify(data))
    }
  }


  const demofunc6 = res => {
    console.log("func 6")
  }
  
  var p = new Person("xiao wang6")
  p.sing()
  p.info()