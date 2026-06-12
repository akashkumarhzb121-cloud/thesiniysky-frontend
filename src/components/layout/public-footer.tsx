import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">TheSiniySky</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium SaaS platform for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={'/' + item.toLowerCase()} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 dark:text-white">Services</h4>
            <ul className="space-y-2">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions'].map(item => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-400">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 dark:text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">contact@thesiniysky.com</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</li>
              <li className="text-sm text-gray-600 dark:text-gray-400">New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2026 TheSiniySky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
