import { Helmet } from 'react-helmet-async'

export const About = () => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      <Helmet>
        <title>About - JagoIndia</title>
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <section className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">About JagoIndia</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">JagoIndia is a modern publication covering news, analysis, and stories that matter to Indian readers. We aim to provide thoughtful, well-researched content with an emphasis on clarity and practical insight.</p>
            <p className="text-gray-700 dark:text-gray-300">Our writers are experienced journalists, researchers, and subject matter experts. We value accuracy, transparency, and reader trust above all.</p>
            <div className="mt-4">
              <a href="/contact" className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Work with us</a>
            </div>
          </section>

          <aside className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow p-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Our Values</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Fact-first:</strong> We verify claims and link to sources.</li>
              <li><strong>Reader-focused:</strong> Practical, accessible explanations.</li>
              <li><strong>Independent:</strong> No commercial influence over editorial choices.</li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Newsletter</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Sign up for weekly briefings and highlights.</p>
              <form className="mt-3 flex items-center gap-2" onSubmit={(e)=>e.preventDefault()}>
                <input type="email" className="px-3 py-2 border rounded bg-white dark:bg-slate-700 text-sm text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 flex-1" placeholder="your@email.com" />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Subscribe</button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default About
