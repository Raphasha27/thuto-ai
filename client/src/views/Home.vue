<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[85vh]">
      <div class="absolute top-0 w-full h-full bg-slate-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      
      <div class="container relative mx-auto">
        <div class="items-center flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div class="inline-block p-4 rounded-full bg-slate-800 mb-6 ring-2 ring-sky-500/50 animate-bounce">
              <span class="text-3xl">🦁🇿🇦</span>
            </div>
            <h1 class="text-white font-black text-5xl sm:text-7xl leading-tight mb-6">
              Master Your Matric <span class="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">With AI</span>
            </h1>
            <p class="mt-4 text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Thuto AI creates personalized learning paths for South African students. 
              Review Math & Science with an intelligent tutor that speaks your language.
            </p>
            <div class="flex justify-center gap-4">
              <router-link to="/dashboard" class="bg-indigo-600 text-white active:bg-indigo-700 font-bold uppercase text-base px-8 py-4 rounded shadow-lg hover:shadow-indigo-500/30 outline-none focus:outline-none ease-linear transition-all duration-150">
                Start Learning
              </router-link>
              <router-link to="/subjects" class="bg-sky-500 hover:bg-sky-600 text-white font-bold uppercase text-base px-8 py-4 rounded shadow-lg hover:shadow-sky-500/30 outline-none focus:outline-none ease-linear transition-all duration-150">
                Explore Subjects
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <section class="pb-20 bg-slate-800/50 -mt-24 pt-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
            <div class="relative flex flex-col min-w-0 break-words bg-slate-700 w-full mb-8 shadow-lg rounded-lg border border-slate-600 hover:border-sky-500 transition-colors">
              <div class="px-4 py-5 flex-auto">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-sky-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h6 class="text-xl font-semibold">AI Tutor</h6>
                <p class="mt-2 mb-4 text-slate-400">
                  Responds to your questions in English, Zulu, or Xhosa. Explains concepts until you understand.
                </p>
              </div>
            </div>
          </div>

          <div class="w-full md:w-4/12 px-4 text-center">
            <div class="relative flex flex-col min-w-0 break-words bg-slate-700 w-full mb-8 shadow-lg rounded-lg border border-slate-600 hover:border-indigo-500 transition-colors">
              <div class="px-4 py-5 flex-auto">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h6 class="text-xl font-semibold">CAPS Aligned</h6>
                <p class="mt-2 mb-4 text-slate-400">
                  Every quiz and lesson is mapped to the official South African curriculum for Grades 8-12.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-6 w-full md:w-4/12 px-4 text-center">
            <div class="relative flex flex-col min-w-0 break-words bg-slate-700 w-full mb-8 shadow-lg rounded-lg border border-slate-600 hover:border-emerald-500 transition-colors">
              <div class="px-4 py-5 flex-auto">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <h6 class="text-xl font-semibold">Provincial Leagues</h6>
                <p class="mt-2 mb-4 text-slate-400">
                  Represent your province on the leaderboard. Compete with students from across the country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
