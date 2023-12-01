export const metadata = {
  title: 'Privacy Policy - Ugo',
  description: '...',
};
export default function Page() {
    return (
      <div className="container mx-auto py-20">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Privacy Policy</h1>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">1. Data Collection</h2>
        <p className="my-5">We collect and store information you provide when creating an account, such as your name and email address. Additionally, we may collect usage data, including search queries and interactions with the App.</p>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">2. Use of Data</h2>
        <p className="my-5">We use the collected data to improve the App's functionality, provide a personalized user experience, and optimize content recommendations. Your data will not be sold or shared with third parties for marketing purposes.</p>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">3. Cookies and Tracking</h2>
        <p className="my-5">The App may use cookies and similar tracking technologies to enhance user experience and gather analytics. You can adjust your browser settings to control cookies.</p>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">4. Third-Party Services</h2>
        <p className="my-5">The App may interact with third-party APIs to retrieve content. Your usage of third-party services is subject to their respective terms and privacy policies.</p>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">5. Security</h2>
        <p className="my-5">We implement reasonable security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">6. Updates to Privacy Policy</h2>
        <p className="my-5">We may update this Privacy Policy to reflect changes in our practices. Continued use of the App after such changes constitutes your consent to the updated policy.</p>
      </div>
    )
  }