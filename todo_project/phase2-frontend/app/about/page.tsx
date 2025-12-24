export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About TaskFlow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering you to achieve more, one task at a time
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-8 animate-fade-in-up border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            At TaskFlow, we believe that staying organized shouldn't be complicated. Our mission is to provide a
            beautiful, intuitive platform that helps individuals and teams manage their tasks efficiently, boost
            productivity, and achieve their goals with ease.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-8 animate-fade-in-up border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            TaskFlow was born from a simple observation: most todo apps are either too complex or too basic. We set
            out to create the perfect balance—a tool that's powerful enough for professionals yet simple enough for
            anyone to use.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Built with modern web technologies and a focus on user experience, TaskFlow combines elegant design with
            powerful functionality to help you stay on top of your tasks without getting in your way.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl animate-fade-in-up border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mr-3 mt-1">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Simplicity</h3>
                <p className="text-gray-600 dark:text-gray-300">Clean, intuitive design that gets out of your way</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center mr-3 mt-1">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Speed</h3>
                <p className="text-gray-600 dark:text-gray-300">Lightning-fast performance for seamless productivity</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 dark:bg-pink-900/40 rounded-lg flex items-center justify-center mr-3 mt-1">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Security</h3>
                <p className="text-gray-600 dark:text-gray-300">Your data is encrypted and protected at all times</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center mr-3 mt-1">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User-First</h3>
                <p className="text-gray-600 dark:text-gray-300">Built based on real user feedback and needs</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have transformed their productivity
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Started Free
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
