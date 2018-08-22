setTimeout(()=>{
  $('.alert').css({'display':'block'})
  setTimeout(()=>{
    $('.alert').css({'display':'none'})
  },10000);
},3000)
let current=0
// tt3896198
let checkMovie = ()=>{
  $('.checked').click(
    ()=>{
          let data=$('.getMovie').val()
          if(data==''||data==undefined)
            $('.plot').html(`
                <div class="alert alert-danger" role="alert">
                  Please Provide some ${current%2?"ID":"Title"}
                </div>`)
          else
            current%2?searchResult(`i=${data}`):searchResult(`t=${data}`)
        }
  )
}
let search=()=>{
  let searchArray=['Title','IMDB ID']
  $('.search').text(searchArray[current%2])
  $('.search').click(
    function(){
      this.innerHTML=searchArray[++current%2]
    }
  )
}

let makeData=(arg1)=>{
  if(arg1.Response="True"){
    arg1.Title!==undefined?
      $('.movie-name').text(arg1.Title):
      $('.movie-name').text("")
    arg1.Genre!==undefined?
      $('.genre').text(arg1.Genre):
      $('.genre').text("")
    arg1.Actors!==undefined?
      $('.actors').html(`
        <span class="font-weight-normal">Starring :</span> ${arg1.Actors}
      `):
      $('.actors').text("")
    arg1.Plot!==undefined?
    $('.plot').html(`
          <span class="font-weight-normal">Plot :</span> ${arg1.Plot}
      `):$('.plot').html(`
      <div class="alert alert-danger" role="alert">
        No Results Found!
      </div>`)
    arg1.Poster!==undefined?arg1.Poster!=='N/A'?
    $('.poster').html(`
      <img src="${arg1.Poster}" height="400px" class="img">
      `):
      $('.poster').html(`
        <img src="images/not-found.png" height="400px">
      `):
      $('.poster').text("")
    arg1.Ratings!==undefined?
    $('.rating').html(
      arg1.Ratings.map((res)=>{
        return ` ${res.Source} : <span class="font-weight-bold">${res.Value}</span><br>`
      })
    ):
    $('.rating').text("")
  }
}
let searchResult=(arg1)=>{
  $.ajax({
    type:'GET',
    dataType:'json',
    url:'http://www.omdbapi.com/?apikey=b44f1fef&'+arg1,
    success:(data)=>{
      makeData(data)
    },
    error:(data)=>{
    }
  })
}
$(document).ready(
  ()=>{
      search()
      checkMovie()

  }
)
