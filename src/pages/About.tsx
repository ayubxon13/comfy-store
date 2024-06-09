import {Helmet} from "react-helmet"

function About() {
  return (
    <>
      <Helmet>
        <title>About page</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      <div className="flex mt-9 flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl ">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg text-center leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veniam
        odit, officiis eos mollitia alias, doloremque, aspernatur ratione
        asperiores voluptas labore minus dolores reprehenderit corporis quos.
        Assumenda molestias harum dignissimos?
      </p>
    </>
  )
}

export default About
