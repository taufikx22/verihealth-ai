import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header/Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 lg:px-40 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">health_metrics</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">VeriHealth AI</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">Solutions</Link>
              <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">Compliance</Link>
              <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">Network</Link>
              <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-white transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide transition-opacity hover:opacity-90">
                <span className="truncate">Go to Dashboard</span>
              </Link>
              <div className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" title="Doctor profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBP34pAFl5HqIRTXPQ9buRq7kODOxMU3KP1RAqpudnjHFOF9hgMIgyDncWlaxuPQHLzCsRDj8kuagS2oNhuDaZJT0TjEwUe061R6645rt6te1QPMziyYzQoTc8JfF-XcAjaQnuvWVikiPrsONRaVTzKN_4EXG62wJBgF88YUKVBqNxYF9EzhJcKiU7j4PKhCd2FG4KtTxF6zMePtKpNhmzS_LPo3BxBHJHmQQc34G0tfH8uULGyhbG-_t7RSl4pTbjWvE--kf2tLak")' }}>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="px-6 md:px-10 lg:px-40 py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto flex-1">
              {/* Announcement Banner */}
              <div className="flex py-3 pr-4">
                <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/40 pl-4 pr-5">
                  <span className="material-symbols-outlined text-primary dark:text-slate-200 text-sm">verified_user</span>
                  <p className="text-primary dark:text-slate-200 text-sm font-semibold leading-normal">New: HIPAA-Compliant AI Core is now live</p>
                </div>
              </div>

              {/* Hero Section */}
              <div className="@container">
                <div className="flex flex-col gap-8 py-10 @[864px]:flex-row @[864px]:items-center">
                  <div className="flex flex-col gap-6 flex-1 @[864px]:justify-center">
                    <div className="flex flex-col gap-4 text-left">
                      <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-5xl @[864px]:text-6xl">
                        AI-Powered Healthcare Credentialing at Scale
                      </h1>
                      <h2 className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed @[480px]:text-lg max-w-[600px]">
                        Streamline your provider verification process with autonomous AI agents. Cross-reference NPI registries and extract license data from PDFs instantly.
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/dashboard" className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold tracking-wide transition-all hover:shadow-lg hover:opacity-90">
                        <span className="truncate">Get Started</span>
                      </Link>
                      <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white text-base font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="truncate">Watch Demo</span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex-1">
                    <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl">
                      <div className="absolute inset-0 bg-cover bg-center" title="Modern healthcare digital dashboard with analytics" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDSfa1Go_Yds7cuCfICdrkYeuHHfueWdoOJtUsFXKIH5gUprfQVR8ofts5UDMdH4uC9f9AQWJETBh05Cz4MRgXT1_WwGNz2zg3_yAsm7ABYL1esTRejM9I4JpHA2HZu2BO-WtB9xwHRk4EhkpXBcVPIFVvGkd_LrFNL1hJ-fQERB-FQWpnpc17-KG-ZvzATAwhL27C-WHrFpFFzrf1CBxAaDs5-s3TuJ7FoTEXokAhXudxeTTeEZQ9KKj5Vv1Qe7eEsHuCe9VUmqk")' }}>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="flex flex-col gap-10 py-16 @container">
                <div className="flex flex-col gap-4">
                  <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight @[480px]:text-4xl tracking-tight max-w-[720px]">
                    Enterprise-Grade Verification
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-normal max-w-[720px]">
                    Our autonomous agents handle the heavy lifting of provider data management, ensuring 99.9% accuracy.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Feature Card 1 */}
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all hover:border-primary/50">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-3xl">database</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold">NPI Cross-Referencing</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Real-time synchronization with national provider registries and state licensing boards.
                      </p>
                    </div>
                  </div>
                  {/* Feature Card 2 */}
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all hover:border-primary/50">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-3xl">description</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold">PDF Data Extraction</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Advanced OCR and AI instantly extract data from medical licenses, diplomas, and certifications.
                      </p>
                    </div>
                  </div>
                  {/* Feature Card 3 */}
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all hover:border-primary/50">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold">Autonomous Compliance</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Continuous monitoring for HIPAA, NCQA, and URAC regulatory alignment without manual intervention.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="my-16 @container">
                <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-primary px-8 py-16 text-center text-white">
                  <div className="flex flex-col gap-4 max-w-[800px]">
                    <h2 className="text-3xl font-black leading-tight @[480px]:text-5xl">
                      Ready to automate your credentialing?
                    </h2>
                    <p className="text-primary-100 text-lg font-normal opacity-90">
                      Join the leading health networks using VeriHealth AI to reduce processing time by 85%.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 w-full">
                    <Link href="/dashboard" className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-white text-primary text-lg font-bold transition-transform hover:scale-105">
                      <span className="truncate">Get Started Today</span>
                    </Link>
                    <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 border-2 border-white/30 bg-white/10 text-white text-lg font-bold transition-all hover:bg-white/20">
                      <span className="truncate">Talk to Sales</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark px-6 md:px-10 lg:px-40 py-12">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded bg-primary text-white">
                  <span className="material-symbols-outlined text-xl">health_metrics</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold">VeriHealth AI</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Building the future of healthcare infrastructure with secure, autonomous AI solutions for the modern medical network.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Product</h4>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Features</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">API Docs</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Security</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Company</h4>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">About Us</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Compliance</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Legal</h4>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">HIPAA Terms</Link>
                <Link href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">GDPR</Link>
              </div>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
            <p>© 2024 VeriHealth AI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
