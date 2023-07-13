<script setup>
  const search= ref("abdanan")
  const input= ref("")
  const background = ref("");
  // const { data: city, error }= useFetch(
  //   ()=> `https://api.openweathermap.org/data/2.5/weather?q=${ search.value }&units=metric&appid=0787a30c939d0b25b4e5e1243fea9209`
  // )

  const { data: city, error }= useAsyncData("city",async()=> {
    const res= await $fetch( `https://api.openweathermap.org/data/2.5/weather?q=${ search.value }&units=metric&appid=0787a30c939d0b25b4e5e1243fea9209`)
    const temp = res.main.temp;

     if (temp <= -10) {
        background.value =
          "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > -10 && temp <= 0) {
        background.value =
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > 0 && temp <= 30) {
        background.value =
          "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
      } else {
        background.value =
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
      }

    return res;
  },{
    watch:[
      search
    ]
  })

  const searchCity= ()=> {
    const dataSearch= input.value.trim().split(" ").join("+");
    search.value= dataSearch;
    input.value="";
  }
</script>

<template>
  <div>
    <div class="h-screen relative overflow-hidden">
      <img :src="background" alt="">
      <div class="absolute w-full h-full top-0 overlay">
        <div class="absolute w-full h-full top-0 p-48">
          
          <div class="flex justify-between">
            <!-- City and Date -->
            <div class="city-data">
              <h1 class="text-7xl text-white">{{ city.name }}</h1>
              <p class="font-extralight text-2xl mt-2 text-white">Sunday Dec 9th</p>
              <img 
              :src="`https://openweathermap.org/img/wn/${ city.weather[0].icon}@4x.png`" 
              class="w-56 icon" alt="">
            </div>  

            <!-- Degree -->
            <div class="degree">
              <p class="text-9xl text-white font-extralight">{{ city.main.temp}}°</p>
            </div>  
          </div>

          <!-- Search City -->
          <div class="mt-20">
            <input 
            v-model="input"
            type="text" 
            class="w-1/2 h-10 p-2" 
            placeholder="Search a city"
            >
            <button 
            @click="searchCity"
            class="bg-sky-400 w-20 text-white h-10">
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
.icon {
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style>
