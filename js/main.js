const app = Vue.createApp({
    data() {
        return {
            title: "Movies Plus",
            movieData: {},
            movieTitle: "Titanic",
            author: "Mike"
        }
    },
    mounted() {
        //this.getMovie();
    },
    computed: {
        async getMovie() {
            if(this.movieTitle != '') {
                const search = this.movieTitle.toLowerCase().replaceAll(" ", "+");

                const data = await fetch(
                    `http://www.omdbapi.com/?apikey=5e3a35b1&t=${search}`
                );
                
                const jsonData = await data.json();

                this.movieData = jsonData;
                
                console.log(jsonData);
            }
        }
    }
});