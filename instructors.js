const fs = require('fs');
const Intl = require('intl');
const data = require('./data.json');
const { age, date } = require('./utils');

//mostrar dados 
exports.show = function(req,res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id;
  })

  if(!foundInstructor) {
    return res.send("Instructor not found");
  }  

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }
  res.render("instructors/show", { instructor });
}

//post (cadastro do usuário)
exports.post = function(req, res) {
  let {avatar_url, name, birth, gender, services} = req.body;

  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == '') {
      return res.send('Please, fill all fields')
    }
  }

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) {
      return res.send("Write file error");
    }

    return res.redirect("/instructors");
  })

  /* return res.send(req.body); */
}

//editar cadastro do usuário
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function(instructor) {
    return instructor.id == id;
  })

  if(!foundInstructor) {
    return res.send("Instructor not found");
  }
  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  res.render("instructors/edit", { instructor });
}