function goSomewhere(x){
location = x;
}
function expandcodename(){
document.getElementById('expand').innerHTML = `<h2>Enter Project Name</h2>
  <input type="text" id="searcher" style="width:25%;text-align:center;">
    <br>
    <br>
    <button onclick="searchcodename()">Search</button>`;
}
function runcode(x,y,z,konghe){
  var justchecking = konghe.data().language.toLowerCase().replace(/\s+/g, '');
  if(justchecking == x || justchecking == y){
    var button = document.createElement("button");
    button.innerHTML = "Run Code";
    var runcode = document.getElementById("runcode");
    runcode.appendChild(button);
    button.addEventListener ("click", function() {
     window.open('https://www.onlinegdb.com/online_'+z+'_compiler', '_blank')});
  }
}
function runcodejs(x,y,konghe){
  var justchecking = konghe.data().language.toLowerCase().replace(/\s+/g, '');
  if(justchecking == x || justchecking == y){
    var button = document.createElement("button");
    button.innerHTML = "Run Code";
    var runcode = document.getElementById("runcode");
    runcode.appendChild(button);
    button.addEventListener ("click", function() {
     window.open('https://jsconsole.com/', '_blank')});
  }
}
function expandcode(){
  document.getElementById('expand').innerHTML = `<h2>Enter Access Code</h2>
  <input type="text" id="searcher" style="width:25%;text-align:center;">
    <br>
    <br>
    <button onclick="searchcode()">Search</button>`;
}
function expand(){
  document.getElementById('expand').innerHTML = `<h2>How Do You Want To Search?</h2>
  <button onclick="expandcode()" style="margin-right:5px;">Search Through Code</button><button onclick="expandcodename()">Search Through Project Name</button>`;
}
function searchcode(){
var lookfor = document.getElementById('searcher').value;
location = "showwork.html?id="+lookfor;
}
function searchcodename(){
var lookfor = document.getElementById('searcher').value;
location = "showworkcodename.html?id="+lookfor;
}
function submit(){
  var codename = document.getElementById("codename").value;
  var accountname = document.getElementById("accountname").value;
  var language = document.getElementById("language").value;
  var code = document.getElementById("code").value;
  var everything = {
    codename: codename,
    accountname: accountname,
    language: language,
    code: code,
    likes: 0,
    dislikes: 0,
    comments: []
  }
  db.collection('projects')
  .add(everything)
  .then(function (snapshot){
    db.collection('projects')
    .where("code","==",code)
    .where("codename","==",codename)
    .where("accountname","==",accountname)
    .where("language","==",language)
    .get()
    .then(function (snapshot){
      document.getElementById("shower").innerHTML = "Share "+snapshot.docs[0].id+" to friends or the forums in AoPS and tell them about this website, or you can send https://aops-code-sharer.cyclopsdude.repl.co/showwork.html?id="+snapshot.docs[0].id;
    })
  })
  }
  function startOffer(){
  var x = new URL(location.href).toString();
  if(x.includes("https://aops-code-sharer.github.io/main/")){
  }else{
    document.write("This is a copy of my website. Here's the link: https://aops-code-sharer.github.io/main/index.html");
  }
  }
  function realsearch(){
    startOffer()
    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    while(id.includes(" ")){
      id = id.replace(" ","");
    }
    db.collection('projects')
    .doc(id)
    .get()
    .then(function (snapshot){
      if(snapshot.empty){
        document.getElementById("codename").innerHTML = "This Project Doesn't exist";
      }else{
        document.getElementById("codename").innerHTML = snapshot.data().codename;
        document.getElementById("accountname").innerHTML = "Author: "+snapshot.data().accountname;
        document.getElementById("ratings").innerHTML = "Likes: "+snapshot.data().likes + " Dislikes: "+snapshot.data().dislikes;
        document.getElementById("language").innerHTML = "Written In: "+snapshot.data().language;
        document.getElementById("code").innerText = snapshot.data().code;
        var i = (snapshot.data().comments.length)-1;
        while(i >= 0){
          var pre = document.createElement('pre');
          pre.className = "precomment"
          pre.innerText = snapshot.data().comments[i]
          pre.style['fontSize'] = "17px";
          var hr = document.createElement('hr');
          var br = document.createElement('br');
          var commentsection =  document.getElementById('commentsection');
          
          commentsection.appendChild(pre);
          commentsection.appendChild(hr);
          commentsection.appendChild(br);
          i -= 1
        }
        runcodejs('js','javascript',snapshot)
        runcode('python','py','python',snapshot)
        runcode('c','c','c',snapshot)
        runcode('c#','c#','c#',snapshot)
        runcode('c++','c++','c++',snapshot)
        runcode('ruby','ruby','ruby',snapshot)
        runcode('swift','swift','swift',snapshot)
        if(localStorage.getItem("liked"+snapshot.id)){
          document.getElementById('likes').style['background-color'] = "#cceeff"
        }
        if(localStorage.getItem("disliked"+snapshot.id)){
          document.getElementById('dislikes').style['background-color'] = "#cceeff"
        }
      }
    })
  }
  function realsearchcodename(){
    startOffer()
    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    db.collection('projects')
    .where("codename","==",id)
    .get()
    .then(function (snapshot){
      if(snapshot.empty){
        document.getElementById("codename").innerHTML = "This Project Doesn't exist";
      }else{
        window.location = "showwork.html?id="+snapshot.docs[0].id;
      }
    })
  }
  function like(){
    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    while(id.includes(" ")){
      id = id.replace(" ","");
    }
    db.collection('projects')
    .doc(id)
    .get()
    .then(function (snapshot){
    if(!(localStorage.getItem("liked"+snapshot.id)) && !(localStorage.getItem("disliked"+snapshot.id))){
      db.collection('projects')
      .doc(id)
      .update({
        likes: snapshot.data().likes + 1
      })
      .then(function (snapshot){
        document.getElementById('likes').style['background-color'] = "#cceeff";
        document.getElementById('ratings').innerText = "Likes: "+snapshot.data().likes+" Disklikes: "+snapshot.data().dislikes;
      })
      localStorage.setItem("liked"+snapshot.id,1)
    }else if(localStorage.getItem("liked"+snapshot.id)){
      db.collection('projects')
      .doc(id)
      .update({
        likes: snapshot.data().likes - 1
      })
      .then(function (snapshot){
        document.getElementById('likes').style['background-color'] = "#ffffff"
        document.getElementById('ratings').innerHTML = "Likes: "+snapshot.data().likes+" Disklikes: "+snapshot.data().dislikes;
      })
      localStorage.removeItem("liked"+snapshot.id)
    }
    })
  }
  function dislike(){
    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    while(id.includes(" ")){
      id = id.replace(" ","");
    }
    db.collection('projects')
    .doc(id)
    .get()
    .then(function (snapshot){
    if(!(localStorage.getItem("disliked"+snapshot.id)) && !(localStorage.getItem("liked"+snapshot.id))){
      db.collection('projects')
      .doc(id)
      .update({
        dislikes: snapshot.data().dislikes + 1
      })
      .then(function (snapshot){
        document.getElementById('dislikes').style['background-color'] = "#cceeff";
        document.getElementById('ratings').innerHTML = "Likes: "+snapshot.data().likes+" Disklikes: "+snapshot.data().dislikes;
      })
      localStorage.setItem("disliked"+snapshot.id,1)
    }else if(localStorage.getItem("disliked"+snapshot.id)){
      db.collection('projects')
      .doc(id)
      .update({
        dislikes: snapshot.data().dislikes - 1
      })
      .then(function (snapshot){
        document.getElementById('dislikes').style['background-color'] = "#ffffff"
        document.getElementById('ratings').innerHTML = "Likes: "+snapshot.data().likes+" Disklikes: "+snapshot.data().dislikes;
      })
      localStorage.removeItem("disliked"+snapshot.id)
    }
    })
  }
  function ratings(){
    startOffer()
    db.collection('projects')
    .get()
    .then(function (snapshot){
      var greatest = 0;
      var id;
      var i = 0;
      console.log(snapshot.docs.length)
      while(i < snapshot.docs.length){
        var likes = snapshot.docs[i].data().likes
        var dislikes = snapshot.docs[i].data().dislikes
        var addedup = likes+dislikes;
        var percentage = Math.round(likes/addedup)
        if(addedup*percentage > greatest){
          id = snapshot.docs[i].id
          greatest = addedup*percentage;
          console.log(id)
          console.log(greatest)
        }
        i ++
      }
      console.log(id)
      db.collection('projects')
      .doc(id)
      .get()
      .then(function (snapshot){
        document.getElementById('showgreatestproject').innerText = snapshot.data().codename
        document.getElementById('showgreatestproject').setAttribute('href','showwork.html?id='+snapshot.id);
        document.getElementById('showgreatestratings').innerText = "Likes: "+snapshot.data().likes+" Dislikes: "+snapshot.data().dislikes
      })
    })
  }
  function matrix(){
    document.getElementById('changefont').innerHTML = "Is Old School feeling old yet? Switch back to <em style=\"cursor:pointer;\" onclick=\"normaltextarea()\">Normal!</em>";
    document.getElementById('code').className = "matrix";
  }
  function normaltextarea(){
    document.getElementById('changefont').innerHTML = "<h4 id=\"changefont\">Feeling Old School? Try the <em style=\"cursor:pointer;\" onclick=\"matrix()\" >Matrix</em> Theme!</h4>"
    document.getElementById('code').className = "";
  }
  function gallery(){
    startOffer()
    db.collection('projects')
    .get()
    .then(function (snapshot){
      var i = 0;
      while(i < snapshot.docs.length){
        var div = document.createElement('div');
        div.style['cursor'] = 'pointer';
        div.style['border'] = 'solid black';
        div.style['borderWidth'] = '5px';
        div.style['borderRadius'] = '10px';
        div.style['maxWidth'] = '50%';
        div.style['padding'] = '10px';
        div.setAttribute("onclick","goSomewhere(\"showworkcodename.html?id="+snapshot.docs[i].data().codename+"\")");
        var title = document.createElement('h2');
        title.textContent = snapshot.docs[i].data().codename;
        div.appendChild(title);
        var author = document.createElement('h3');
        author.textContent = "Written By: "+snapshot.docs[i].data().accountname;
        div.appendChild(author);
        var ratings = document.createElement('h4');
        ratings.textContent = "Likes: "+snapshot.docs[i].data().likes+" Dislikes: "+snapshot.docs[i].data().dislikes;
        div.appendChild(ratings);
        var parentdiv = document.getElementById('displayprojects');
        var br = document.createElement('br');
        parentdiv.appendChild(div);
        parentdiv.appendChild(br);
        i++
      }
    })
  }
  function expandcommenttextarea(){
    var expandcode = `<textarea class="commentwriting" maxlength="300" id="commenttextarea"></textarea>
    <br><br>
    <button onclick="publishcomment()">Publish Comment</button>`
    document.getElementById('expandingcomment').innerHTML = expandcode;
  }
  function publishcomment(){
    var url = new URL(location.href);
    var id = url.searchParams.get("id");
    db.collection('projects')
    .doc(id)
    .get()
    .then(function (snapshot){
      var array = snapshot.data().comments;
      console.log(array)
      var addtoarray = document.getElementById('commenttextarea').value
      array.push(addtoarray)
      db.collection('projects')
      .doc(id)
      .update({
        comments: array
      })
      .then(function (snapshot){
        document.getElementById('expandingcomment') .innerHTML = "<h3>Submitted!</h3>"
      })
    })
  }
