const fs = require('fs');
const data = require('./data.json');
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