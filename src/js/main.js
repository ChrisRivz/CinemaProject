

const APIKey = '441d495ebe8791b161d79de1fae46029'
const URL_PopularMovies = 'https://api.themoviedb.org/3/movie/popular?api_key='
const URL_TopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key='
const URL_UPComing = 'https://api.themoviedb.org/3/movie/upcoming?api_key='


const pathImgServer = "https://image.tmdb.org/t/p/original"

var vue = new Vue({
    
    el: '#app',
    data: {

      ArrayPopularMovies: [],
      ArrayTopRatedMovies:[],
      ArrayUpcomingMovies:[],     
      image: '',
      countDown: 0,
      date: moment(60*.1*1000),
      ArrayDataMovie:{},
      DetailShow: false
         

    },
    mounted(){

        this.Firstdata()

    },
    methods:{

      Firstdata(){

        this.GetPopularMovies()
        this.GetTopRatedMovies()
        this.GetUpComingMovies()

      },
      GetPopularMovies(){

        const path = URL_PopularMovies+APIKey;
        axios.get(path)
        .then(response =>{

          this.ArrayPopularMovies = response.data.results
          console.log(this.ArrayPopularMovies)

          this.image = pathImgServer + this.ArrayPopularMovies[0].poster_path       
          this.Chronometer()
        })
        .catch(error =>{

          console.log(error)

        });


      },
      GetTopRatedMovies(){

        const path = URL_TopRated+APIKey;
        axios.get(path)
        .then(response => {

          this.ArrayTopRatedMovies = response.data.results
          console.log(this.ArrayTopRatedMovies)

        })
        .catch(error =>{

          console.log(error)

        })

      },
      GetUpComingMovies(){

        const path = URL_UPComing+APIKey;
        axios.get(path)
        .then(response => {

          this.ArrayUpcomingMovies = response.data.results
          console.log(this.ArrayTopRatedMovies)

        })
        .catch(error =>{

          console.log(error)

        })

      },
      Chronometer(){

        var interval, count = 0
        const array_length = (this.ArrayPopularMovies).length

        clearInterval(interval)
        interval = setInterval(()=>{
          
          
          this.date = moment(this.date.subtract(1,'seconds'))
          this.countDown = this.date.format('mm:ss')        
          if(this.countDown == '00:00')
          {
            count++
            count = (count >= array_length) ? 0 : count++ 
            this.date = moment(60*.1*1000)
            setInterval(interval)
            this.image = pathImgServer + this.ArrayPopularMovies[count].poster_path
          }
          

        },1000)

      },
      SelectedMovie(data){

        console.log(data);
        console.log('Aqui')
        
        this.ArrayDataMovie = {

          InitialInfo: {
            id: data.id,
            overview: data.overview,
            poster_path: pathImgServer + data.poster_path,
            release_date: data.release_date,
            title: data.title
          }

        }


        this.DetailShow = true;
        console.log(this.ArrayDataMovie)

      }


    }


  })