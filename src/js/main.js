

const APIKey = '441d495ebe8791b161d79de1fae46029'
const URL_PopularMovies = 'https://api.themoviedb.org/3/movie/popular?api_key='
const URL_TopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key='
const URL_UPComing = 'https://api.themoviedb.org/3/movie/upcoming?api_key='
const URL_movie = 'https://api.themoviedb.org/3/movie/'


const pathImgServer = "https://image.tmdb.org/t/p/original"

var vue = new Vue({
    
    el: '#app',
    data: {

      ArrayPopularMovies: [],
      ArrayTopRatedMovies:[],
      ArrayUpcomingMovies:[],  
      
      CloneListPopulasMovies: [],
      CloneListTopRatedMovies: [],
      ClonteListUpComingMovies: [],

      image: '',
      countDown: 0,
      date: moment(60*.1*1000),
      ArrayDataMovie:{},
      DetailShow: false,
      Movie: {

        id: 0
      },
      Search: '',
      ListMoviesSearch: []
         

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
          this.CloneListPopulasMovies = response.data.results

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
          this.CloneListTopRatedMovies = response.data.results

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
          this.ClonteListUpComingMovies = response.data.results

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
      },
      returnAllMovies(){


        this.DetailShow = false;
        this.Search = '';
        this.ArrayPopularMovies = this.CloneListPopulasMovies
        this.ArrayTopRatedMovies = this.CloneListTopRatedMovies
        this.ArrayUpcomingMovies = this.ClonteListUpComingMovies

      },
      searchMovie(){
        
        this.ArrayPopularMovies = this.CloneListPopulasMovies
        const resultPopular = this.ArrayPopularMovies.filter(item => item.original_title.includes(this.Search))
        this.ArrayPopularMovies = resultPopular;

        this.ArrayTopRatedMovies = this.CloneListTopRatedMovies
        const resultTopRated = this.ArrayTopRatedMovies.filter(item => item.original_title.includes(this.Search))
        this.ArrayTopRatedMovies = resultTopRated

        this.ArrayUpcomingMovies = this.ClonteListUpComingMovies
        const resultUpComing = this.ArrayUpcomingMovies.filter(item => item.original_title.includes(this.Search))
        this.ArrayUpcomingMovies = resultUpComing
        


      }


    }


  })